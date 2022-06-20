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
        networkId: 80001,
        name: "Polygon - Mumbai",
        decimals: 18,
        bridgeAddress: "0x55099CCB1226387056C013dd2BB6fb4Cb20CB769",
        erc20HandlerAddress: "0x1B7ea47C7c9f061065D37152D3F85B30831eec99",
        rpcUrl: "https://matic-mumbai.chainstacklabs.com",
        type: "Ethereum",
        nativeTokenSymbol: "MATIC",
        defaultGasPrice: 800,
        gasPriceSuggestionEnabled: true,
        defaultGasPriceIncreaseInPercents: 10,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0x8aeE18D1fbC7d4D7BFcbF617E9bfa4b2079d5232",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
          {
            address: "0x864A2F57E0cAFD07E612a1aB02f429707EfE3dBC",
            name: "Astra USDT",
            symbol: "aUSDT",
            imageUri: "USDTIcon",
            decimals: 6,
            resourceId:
                "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce01",
          }
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
        networkId: 11112,
        name: "Astra Testnet",
        decimals: 18,
        bridgeAddress: "0x24482346ed6Ec116cFeFB07558654790f6a90598",
        erc20HandlerAddress: "0x374035D0e05ceeF4CaB5CEb4E9bAF0787924EB00",
        rpcUrl: "https://evm.astranaut.network/",
        type: "Ethereum",
        nativeTokenSymbol: "ASTRA",
        availableAsHomeNetwork: true,
        defaultGasPrice: 1000,
        tokens: [
          {
            address: "0x1E080e14CA5768B579F09Ea221AD731d9045641f",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
          {
            address: "0xf8B0c22089C5EE643A5bA475656Ca32Daf48eEcb",
            name: "USDT test",
            symbol: "USDT",
            imageUri: "USDTIcon",
            decimals: 6,
            resourceId:
                "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce01",
          }
        ],
        transferFallback: [
          {
            chainId: 0,
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
