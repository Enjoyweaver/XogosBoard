export const AdminABI = [
  {
    name: "OTCTrade",
    inputs: [
      {
        name: "trade_id",
        type: "uint256",
        indexed: true,
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
      },
      {
        name: "usd_received",
        type: "uint256",
        indexed: false,
      },
      {
        name: "trade_timestamp",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      {
        name: "_iServ_contract_address",
        type: "address",
      },
      {
        name: "_tracker_contract_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "setiServContract",
    inputs: [
      {
        name: "_iServ_contract_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "setTrackerContract",
    inputs: [
      {
        name: "_tracker_contract_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "mint_tokens",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
      },
      {
        name: "_to",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "otc_trade",
    inputs: [
      {
        name: "_recipient",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      },
      {
        name: "_usd_received",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "add_to_whitelist",
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "remove_from_whitelist",
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_otc_trade",
    inputs: [
      {
        name: "_trade_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "sender",
            type: "address",
          },
          {
            name: "recipient",
            type: "address",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "usd_received",
            type: "uint256",
          },
          {
            name: "trade_timestamp",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_otc_trade_count",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "is_whitelisted",
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "iServContract",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "trackerContract",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "lastMintTime",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "dailyMinted",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "otc_trade_count",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "otc_trades",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "sender",
            type: "address",
          },
          {
            name: "recipient",
            type: "address",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "usd_received",
            type: "uint256",
          },
          {
            name: "trade_timestamp",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "whitelisted_addresses",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
] as const;
