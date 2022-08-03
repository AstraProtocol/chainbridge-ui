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
        networkId: 97,
        lzNetworkId: 10002,
        name: "bsc-testnet",
        decimals: 18,
        bridgeAddress: "0x3E01dB71d5f19ec8C9f2227B47E3E84FA90C9486",
        erc20HandlerAddress: "0x5e5543598CbCf7E06C2063AB529C2b4d10bEC06d",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        type: "Ethereum",
        nativeTokenSymbol: "BNB",
        defaultGasPrice: 800,
        gasPriceSuggestionEnabled: true,
        defaultGasPriceIncreaseInPercents: 20,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
            name: "BUSD",
            symbol: "BUSD",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
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
        networkId: 43113,
        lzNetworkId: 10006,
        name: "Fuji",
        decimals: 18,
        bridgeAddress: "0x0c291584ffd0Dc4cACb334385eD342413B1213dE",
        erc20HandlerAddress: "0xAa83Ade6a57DA1FEe0737237Ab9E23d76daf2B5f",
        rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
        type: "Ethereum",
        nativeTokenSymbol: "AVA",
        availableAsHomeNetwork: true,
        defaultGasPrice: 1000,
        tokens: [
          {
            address: "0xe9675C144b3393fD2E2D50061c558e37EE9D8A18",
            name: "asBUSD",
            symbol: "asBUSD",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
        ],
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
