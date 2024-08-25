export const StorageABI = [
  {
    name: "ProposalCreated",
    inputs: [
      {
        name: "proposal_id",
        type: "uint256",
        indexed: true,
      },
      {
        name: "creator",
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
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "ProposalExecuted",
    inputs: [
      {
        name: "proposal_id",
        type: "uint256",
        indexed: true,
      },
      {
        name: "executor",
        type: "address",
        indexed: true,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "MultisigWalletUpdated",
    inputs: [
      {
        name: "index",
        type: "uint256",
        indexed: true,
      },
      {
        name: "new_address",
        type: "address",
        indexed: true,
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
        name: "_iServ_address",
        type: "address",
      },
      {
        name: "_required_confirmations",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_multisig_wallet",
    inputs: [
      {
        name: "_index",
        type: "uint256",
      },
      {
        name: "_new_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "create_proposal",
    inputs: [
      {
        name: "_recipient",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "confirm_proposal",
    inputs: [
      {
        name: "_proposal_id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "receive",
    inputs: [],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_proposal",
    inputs: [
      {
        name: "_proposal_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "is_confirmed",
    inputs: [
      {
        name: "_proposal_id",
        type: "uint256",
      },
      {
        name: "_wallet",
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
    name: "iServ_token",
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
    name: "multisig_wallets",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
    ],
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
    name: "required_confirmations",
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
    name: "proposals",
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
            name: "recipient",
            type: "address",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "executed",
            type: "bool",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "proposal_count",
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
    name: "confirmations",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
      {
        name: "arg1",
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
