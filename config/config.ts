"use client";

import { fantom, fantomTestnet, polygon } from "@wagmi/core/chains";
import { configureChains, createConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantom, polygon, fantomTestnet],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "SafeMeme Labs",
        appLogoUrl: "tbd",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "7d2cdf0341b6bef24d9efae208f93467",
        metadata: {
          name: "SafeMeme Labs",
          description: "Safe Meme Economy",
          url: "https://safememe.vercel.app",
          icons: ["tbd"],
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const blockExplorerUrls: { [key: string]: string } = {
  "31": "https://explorer.testnet.rootstock.io/tx/",
  "250": "https://ftmscan.com/tx/",
  "4002": "https://testnet.ftmscan.com/tx/",
  "137": "https://polygonscan.com/tx/",
  "43114": "https://snowtrace.io/tx/",
  "30": "https://explorer.rsk.co/tx/",
  "666666666": "https://degenscan.io/tx/",
  "501": "https://explorer.solana.com/tx/",
  "84532": "https://sepolia-explorer.base.org",
};

export const blockExplorerAddress: { [key: string]: string } = {
  "31": "https://explorer.testnet.rootstock.io/address/",
  "250": "https://ftmscan.com/address/",
  "4002": "https://testnet.ftmscan.com/address/",
  "137": "https://polygonscan.com/address/",
  "43114": "https://snowtrace.io/address/",
  "30": "https://explorer.rsk.co/address/",
  "666666666": "https://degenscan.io/address/",
  "501": "https://explorer.solana.com/address/",
  "84532": "https://sepolia-explorer.base.org/address/",
};

export const blockExplorerToken: { [key: string]: string } = {
  "31": "https://explorer.testnet.rootstock.io/token/",
  "250": "https://ftmscan.com/token/",
  "4002": "https://testnet.ftmscan.com/token/",
  "137": "https://polygonscan.com/token/",
  "43114": "https://snowtrace.io/token/",
  "30": "https://explorer.rsk.co/token/",
  "666666666": "https://degenscan.io/token/",
  "501": "https://explorer.solana.com/token/",
  "84532": "https://sepolia-explorer.base.org/token/",
};

export const blockExplorers: { [key: string]: string } = {
  "31": "https://explorer.testnet.rootstock.io/",
  "250": "https://ftmscan.com/",
  "4002": "https://testnet.ftmscan.com/",
  "137": "https://polygonscan.com/",
  "43114": "https://snowtrace.io/",
  "30": "https://explorer.rsk.co/",
  "666666666": "https://degenscan.io/",
  "501": "https://explorer.solana.com/",
  "84532": "https://sepolia.base.org",
};

export const chainIdToCovalentChainId: { [key: string]: string } = {
  250: "fantom-mainnet",
  4002: "fantom-testnet",
  31: "rsk-testnet",
  137: "matic-mainnet",
  43114: "avalanche-mainnet",
  30: "rsk-mainnet",
  501: "solana-mainnet",
};

export const NativeTokens: {
  [key: string]: { address: string; symbol: string }[];
} = {
  "4002": [
    { address: "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D", symbol: "FTM" },
  ],
  "250": [
    { address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870", symbol: "FTM" },
  ],
  "137": [
    { address: "0x0000000000000000000000000000000000001010", symbol: "MATIC" },
  ],
  "43114": [
    {
      address: "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      symbol: "AVAX",
    },
  ],
  "30": [
    { address: "0x542fDA317318eBF1d3DEAf76E0b632741A7e677d", symbol: "RBTC" },
  ],
  "31": [
    { address: "0x542fDA317318eBF1d3DEAf76E0b632741A7e677d", symbol: "tRBTC" },
  ],
  "1337": [
    { address: "0x0000000000000000000000000000000000000000", symbol: "BTC" },
  ],
  "1": [
    { address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870", symbol: "FTM" },
  ],
};

export const priceFeedAddresses: {
  [key: string]: { [token: string]: string };
} = {
  "4002": {
    "FTM/USD": "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D",
    "wBTC/USD": "0x65E8d79f3e8e36fE48eC31A2ae935e92F5bBF529",
    "ETH/USD": "0xB8C458C957a6e6ca7Cc53eD95bEA548c52AFaA24",
  },
  "250": {
    "FTM/USD": "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc",
    "wFTM/USD": "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc",
    "wBTC/USD": "0x9Da678cE7f28aAeC8A578A1e414219049509a552",
    "ETH/USD": "0x11DdD3d147E5b83D01cee7070027092397d63658",
  },
  "666666666": {
    "BTC/USD": "0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F",
    "ETH/USD": "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    "DEGEN/USD": "0xE62BcE5D7CB9d16AB8b4D622538bc0A50A5799c2",
    "SOL/USD": "0x975043adBb80fc32276CbF9Bbcfd4A601a12462D",
    "USDC/USD": "0x7e860098F58bBFC8648a4311b374B1D669a2bc6B",
  },
  "137": {
    "MATIC/USD": "0xab594600376ec9fd91f8e885dadf0ce036862de0",
    "wBTC/USD": "0xde31f8bfbd8c84b5360cfacca3539b938dd78ae6",
    "ETH/USD": "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
  "43114": {
    "AVAX/USD": "0x0a77230d17318075983913bc2145db16c7366156",
    "wBTC/USD": "0x2779d32d5166baaa2a39b69a1b7a8080bcdc26ff",
    "ETH/USD": "0x86d67c3d38d2bce8da5a2d8e032e2001fa8ec7ea",
  },
  "1337": {
    "BTC/USD": "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43", // Sepolia testnet price feed for BTC
  },
};

export const rpcUrls: { [key: string]: string } = {
  "4002": "https://rpc.testnet.fantom.network/",
  "250": "https://rpc.ankr.com/fantom/",
  "137": "https://polygon-rpc.com/",
  "43114": "https://api.avax.network/ext/bc/C/rpc",
  "30": "https://public-node.rsk.co",
  "31": "https://public-node.testnet.rsk.co",
  "1337": "https://rpc.ankr.com/eth_sepolia",
};

export const iServ: {
  [key: string]: string;
} = {
  "4002": "0x427831F2F81Aa76BD551dA4D2B8f795945698A28",
};

export const storage: {
  [key: string]: string;
} = {
  "4002": "0x8cfeb8Eacdfe56C5C3B529e5EBf9F76399d8Ca49",
};

export const iPlay: {
  [key: string]: string;
} = {
  "4002": "0x8cfeb8Eacdfe56C5C3B529e5EBf9F76399d8Ca49",
  // "64165": "0xe5355DB1838d2e56786cC7E66FF9a122F2bb3d1d",
};

export const tracker: {
  [key: string]: string;
} = {
  "4002": "0xfb1d9999a2361fA1F3C0c6CA021d6e964408b79C",
  //"64165": "0x0643e30ABfa871c5a22c602Cb2071c2B1230e0d9",
};

export const secondaryAddress: {
  [key: string]: string;
} = {
  "4002": "0x2D53cd2d78F3827C4E37323505fcaF2A7bFD507a",
  // "64165": "0x8401eb679FBCc6522B6489C1a5E119532918f88a",
};
