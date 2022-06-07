import { ApiPromise, WsProvider } from "@polkadot/api";
import { decodeAddress } from "@polkadot/util-crypto";
import BigNumber from "bignumber.js";
import {
  chainbridgeConfig,
  SubstrateBridgeConfig,
  getСhainConfig,
} from "../../../chainbridgeConfig";

const base = new BigNumber(10);

export enum VoteStatus {
  INITIATED = "Initiated",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export type GetBridgeProsalVotesRes = {
  votes_for: string[];
  votes_against: string[];
  status: VoteStatus;
  expiry: string;
};

export const createApi = async (rpcUrl: string, rpcFallbackUrls?: string[]) => {
  let urls = [rpcUrl];
  if (rpcFallbackUrls) {
    urls = urls.concat(rpcFallbackUrls);
  }
  const provider = new WsProvider(urls);
  const subChainConfig = chainbridgeConfig.chains.find(
    (c) => c.rpcUrl === rpcUrl
  ) as SubstrateBridgeConfig;
  const types = (await import(`./${subChainConfig.typesFileName}`)) as any;
  return ApiPromise.create({ provider, types });
};

export const submitDeposit = (
  api: ApiPromise,
  amount: number,
  recipient: string,
  srcChainId: number,
  dstChainId: number
) => {
  const subChainConfig = getСhainConfig(srcChainId) as SubstrateBridgeConfig;

  return api.tx[subChainConfig.transferPalletName][
    subChainConfig.transferFunctionName
  ](
    new BigNumber(amount)
      .multipliedBy(base.pow(new BigNumber(subChainConfig.decimals)))
      .toString(10),
    recipient,
    dstChainId
  );
};

export const getBridgeProposalVotes = async (
  api: ApiPromise,
  srcChainId: number,
  destinationChainId: number,
  recipient: string,
  depositNonce: number,
  decimalAmount: number
): Promise<GetBridgeProsalVotesRes | undefined> => {
  const destinationChainConfig = getСhainConfig(destinationChainId);
  const decimals = new BigNumber(destinationChainConfig.decimals);

  const call = api.registry.createType("Call", {
    args: [
      decodeAddress(recipient),
      await decimalToBalance(api, decimalAmount, decimals),
    ],
    callIndex: api.tx.erc20.transfer.callIndex,
  });

  const result = await api.query.chainBridge.votes(srcChainId, [
    depositNonce,
    call,
  ]);
  return result.toHuman() as GetBridgeProsalVotesRes;
};

export const decimalToBalance = async (
  api: ApiPromise,
  decimalAmount: number,
  decimals: BigNumber
) => {
  const amount = new BigNumber(decimalAmount);
  const balance = amount.multipliedBy(base.pow(decimals));
  return api.registry.createType("Balance", balance.toString());
};
