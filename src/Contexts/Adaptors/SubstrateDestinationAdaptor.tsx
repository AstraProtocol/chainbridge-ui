import React, { useCallback, useEffect, useState } from "react";
import { DestinationBridgeContext } from "../DestinationBridgeContext";
import { useNetworkManager } from "../NetworkManagerContext";
import {
  createApi,
  getBridgeProposalVotes,
  VoteStatus,
} from "./SubstrateApis/ChainBridgeAPI";
import { IDestinationBridgeProviderProps } from "./interfaces";

import { ApiPromise } from "@polkadot/api";
import { UnsubscribePromise } from "@polkadot/api/types";
import {
  SubstrateBridgeConfig,
  getСhainTransferFallbackConfig,
} from "../../chainbridgeConfig";
import { Fallback } from "../../Utils/Fallback";

export const SubstrateDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    homeChainConfig,
    destinationChainConfig,
    setDepositVotes,
    depositVotes,
    tokensDispatch,
    transactionStatus,
    setTransactionStatus,
    depositAmount,
    depositRecipient,
    setFallback,
    fallback,
    address,
    analytics,
  } = useNetworkManager();

  const [api, setApi] = useState<ApiPromise | undefined>();

  const [initiaising, setInitialising] = useState(false);
  useEffect(() => {
    // Once the chain ID has been set in the network context, the destination configuration will be automatically
    // set thus triggering this
    if (!destinationChainConfig || initiaising || api) return;
    setInitialising(true);
    createApi(
      destinationChainConfig.rpcUrl,
      destinationChainConfig.rpcFallbackUrls
    )
      .then((api) => {
        setApi(api);
        setInitialising(false);
      })
      .catch(console.error);
  }, [destinationChainConfig, api, initiaising, transactionStatus]);

  const [listenerActive, setListenerActive] = useState<
    UnsubscribePromise | undefined
  >(undefined);

  useEffect(() => {
    if (api && !listenerActive && depositNonce) {
      // Wire up event listeners
      // Subscribe to system events via storage
      const unsubscribe = api.query.system.events((events) => {
        console.log("----- Received " + events.length + " event(s): -----");
        // loop through the Vec<EventRecord>
        events.forEach((record) => {
          // extract the phase, event and the event types
          const { event, phase } = record;
          const types = event.typeDef;
          // show what we are busy with
          console.log(
            event.section +
              ":" +
              event.method +
              "::" +
              "phase=" +
              phase.toString()
          );
          console.log(event.meta.documentation.toString());
          // loop through each of the parameters, displaying the type and data
          event.data.forEach((data, index) => {
            console.log(types[index].type + ";" + data.toString());
          });

          if (
            event.section ===
              (destinationChainConfig as SubstrateBridgeConfig)
                .chainbridgePalletName &&
            event.method === "VoteFor"
          ) {
            setDepositVotes(depositVotes + 1);
            tokensDispatch({
              type: "addMessage",
              payload: {
                address: "Substrate Relayer",
                signed: "Confirmed",
                order: parseFloat(`1.${depositVotes + 1}`),
              },
            });
          }

          if (
            event.section ===
              (destinationChainConfig as SubstrateBridgeConfig)
                .chainbridgePalletName &&
            depositVotes === 1 &&
            event.method === "ProposalApproved"
          ) {
            setDepositVotes(depositVotes + 1);
            setTransactionStatus("Transfer Completed");
            fallback?.stop();
            analytics.trackTransferCompletedEvent({
              address: address as string,
              recipient: depositRecipient as string,
              nonce: parseInt(depositNonce),
              amount: depositAmount as number,
            });
          }
        });
      });
      setListenerActive(unsubscribe);
    } else if (listenerActive && !depositNonce) {
      const unsubscribeCall = async () => {
        setListenerActive(undefined);
      };
      unsubscribeCall();
    }
  }, [
    api,
    depositNonce,
    depositVotes,
    destinationChainConfig,
    listenerActive,
    setDepositVotes,
    setTransactionStatus,
    tokensDispatch,
    fallback,
  ]);

  const initFallbackMechanism = useCallback(async (): Promise<void> => {
    const srcChainId = homeChainConfig?.chainId as number;
    const destinationChainId = destinationChainConfig?.chainId as number;
    const {
      delayMs,
      pollingMinIntervalMs,
      pollingMaxIntervalMs,
      blockTimeMs,
    } = getСhainTransferFallbackConfig(srcChainId, destinationChainId);
    const pollingIntervalMs = Math.min(
      Math.max(pollingMinIntervalMs, 3 * blockTimeMs),
      pollingMaxIntervalMs
    );
    const fallback = new Fallback(delayMs, pollingIntervalMs, async () => {
      const res = await getBridgeProposalVotes(
        api as ApiPromise,
        srcChainId,
        destinationChainId,
        depositRecipient as string,
        parseInt(depositNonce as string),
        depositAmount as number
      );
      console.log("Proposal votes status", res?.status);
      switch (res?.status) {
        case VoteStatus.APPROVED:
          console.log("Transfer completed in fallback mechanism");
          setTransactionStatus("Transfer Completed");
          fallback.stop();
          analytics.trackTransferCompletedFromFallbackEvent({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
          });
          return false;
        case VoteStatus.REJECTED:
          console.log("Transfer aborted in fallback mechanism");
          setTransactionStatus("Transfer Aborted");
          fallback.stop();
          analytics.trackTransferAbortedFromFallbackEvent({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
          });
          return false;
        default:
          return true;
      }
    });
    fallback.start();
    setFallback(fallback);
  }, [
    api,
    homeChainConfig,
    destinationChainConfig,
    depositRecipient,
    depositNonce,
    depositAmount,
    fallback,
  ]);

  useEffect(() => {
    console.log({ transactionStatus });
  }, [transactionStatus]);

  useEffect(() => {
    const canInitFallback =
      process.env.REACT_APP_TRANSFER_FALLBACK_ENABLED === "true" &&
      transactionStatus === "In Transit" &&
      api &&
      !fallback?.started();
    if (canInitFallback) initFallbackMechanism();
  }, [transactionStatus, api, fallback]);

  return (
    <DestinationBridgeContext.Provider
      value={{
        disconnect: async () => {
          await api?.disconnect();
        },
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};
