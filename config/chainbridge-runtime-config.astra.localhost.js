const astraTokenName = "Astra Network";
const astraTokenSymbol = "USDT";
const astraTokenDecimals = 18;

window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    ga: {
      trackingId: "G-EVYKNM010Y",
      appName: "chainbridge-ui",
    },
    chains: [
      {
        chainId: 0,
        networkId: 31337,
        name: "Local host 1",
        decimals: 18,
        bridgeAddress: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        erc20HandlerAddress: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
        rpcUrl: "http://localhost:8545",
        type: "Ethereum",
        nativeTokenSymbol: "ASTEA",
        defaultGasPrice: 800,
        gasPriceSuggestionEnabled: true,
        defaultGasPriceIncreaseInPercents: 20,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            name: "MOCK",
            symbol: "MOCK",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
          {
            address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            name: "WMOCK",
            symbol: "WMOCK",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
            isNativeWrappedToken: true,
          },
        ],
        transferFallback: [
          {
            chainId: 1,
            delayMs: 4 * 60 * 1000,
            blockTimeMs: 6000,
            pollingMinIntervalMs: 15000,
            pollingMaxIntervalMs: 30000,
          },
        ],
      },
      {
        chainId: 1,
        networkId: 31338,
        name: "Astra Testnet",
        decimals: 18,
        bridgeAddress: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        erc20HandlerAddress: "0x9A676e781A523b5d0C0e43731313A708CB607508",
        rpcUrl: "http://localhost:8545",
        type: "Ethereum",
        nativeTokenSymbol: "ASTRA",
        availableAsHomeNetwork: true,
        defaultGasPrice: 1000,
        tokens: [],
        transferFallback: [
          {
            chainId: 1,
            delayMs: 4 * 60 * 1000,
            blockTimeMs: 4000,
            pollingMinIntervalMs: 15000,
            pollingMaxIntervalMs: 30000,
          },
        ],
      },
    ],
  },
};
