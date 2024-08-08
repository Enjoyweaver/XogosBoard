export const TrackerABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      {
        name: "_iServ_token_address",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "approve_contract",
    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "transfer_tokens",
    inputs: [
      {
        name: "customerID",
        type: "uint256",
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
        name: "valueAtTime",
        type: "uint256",
      },
      {
        name: "department",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_transaction",
    inputs: [
      {
        name: "customerID",
        type: "uint256",
      },
      {
        name: "index",
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
            name: "transfer_time",
            type: "uint256",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "valueAtTime",
            type: "uint256",
          },
          {
            name: "department",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_all_transactions",
    inputs: [
      {
        name: "customerID",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[5][1000]",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_student_info",
    inputs: [
      {
        name: "user_id",
        type: "uint256",
      },
      {
        name: "game_id",
        type: "uint256",
      },
      {
        name: "contractor_id",
        type: "uint256",
      },
      {
        name: "parentA_id",
        type: "uint256",
      },
      {
        name: "parentB_id",
        type: "uint256",
      },
      {
        name: "teacher_id",
        type: "uint256",
      },
      {
        name: "time_of_earning_iPlay",
        type: "uint256",
      },
      {
        name: "where_iPlay_earned",
        type: "uint256",
      },
      {
        name: "time_of_conversion",
        type: "uint256",
      },
      {
        name: "time_of_tuition_submission",
        type: "uint256",
      },
      {
        name: "time_of_first_game",
        type: "uint256",
      },
      {
        name: "time_of_last_game",
        type: "uint256",
      },
      {
        name: "highschool_graduate",
        type: "bool",
      },
      {
        name: "highschool_graduation_date",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_game_info",
    inputs: [
      {
        name: "game_id",
        type: "uint256",
      },
      {
        name: "developer_id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_developer_info",
    inputs: [
      {
        name: "developer_id",
        type: "uint256",
      },
      {
        name: "game_number_developed",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_university_info",
    inputs: [
      {
        name: "universityA_id",
        type: "uint256",
      },
      {
        name: "universityB_id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_parent_info",
    inputs: [
      {
        name: "user_id",
        type: "uint256",
      },
      {
        name: "parentA_id",
        type: "uint256",
      },
      {
        name: "parentB_id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "update_minted_info",
    inputs: [
      {
        name: "tokens",
        type: "uint256",
      },
      {
        name: "days",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_student_info",
    inputs: [
      {
        name: "user_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "user_id",
            type: "uint256",
          },
          {
            name: "game_id",
            type: "uint256",
          },
          {
            name: "contractor_id",
            type: "uint256",
          },
          {
            name: "parentA_id",
            type: "uint256",
          },
          {
            name: "parentB_id",
            type: "uint256",
          },
          {
            name: "teacher_id",
            type: "uint256",
          },
          {
            name: "time_of_earning_iPlay",
            type: "uint256",
          },
          {
            name: "where_iPlay_earned",
            type: "uint256",
          },
          {
            name: "time_of_conversion",
            type: "uint256",
          },
          {
            name: "time_of_tuition_submission",
            type: "uint256",
          },
          {
            name: "time_of_first_game",
            type: "uint256",
          },
          {
            name: "time_of_last_game",
            type: "uint256",
          },
          {
            name: "highschool_graduate",
            type: "bool",
          },
          {
            name: "highschool_graduation_date",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_game_info",
    inputs: [
      {
        name: "game_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "game_id",
            type: "uint256",
          },
          {
            name: "developer_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_developer_info",
    inputs: [
      {
        name: "developer_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "developer_id",
            type: "uint256",
          },
          {
            name: "game_number_developed",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_university_info",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "universityA_id",
            type: "uint256",
          },
          {
            name: "universityB_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_parent_info",
    inputs: [
      {
        name: "user_id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "parentA_id",
            type: "uint256",
          },
          {
            name: "parentB_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "transfer_records",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
      {
        name: "arg1",
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
            name: "transfer_time",
            type: "uint256",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "valueAtTime",
            type: "uint256",
          },
          {
            name: "department",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "transaction_count",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
    ],
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
    name: "student_info",
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
            name: "user_id",
            type: "uint256",
          },
          {
            name: "game_id",
            type: "uint256",
          },
          {
            name: "contractor_id",
            type: "uint256",
          },
          {
            name: "parentA_id",
            type: "uint256",
          },
          {
            name: "parentB_id",
            type: "uint256",
          },
          {
            name: "teacher_id",
            type: "uint256",
          },
          {
            name: "time_of_earning_iPlay",
            type: "uint256",
          },
          {
            name: "where_iPlay_earned",
            type: "uint256",
          },
          {
            name: "time_of_conversion",
            type: "uint256",
          },
          {
            name: "time_of_tuition_submission",
            type: "uint256",
          },
          {
            name: "time_of_first_game",
            type: "uint256",
          },
          {
            name: "time_of_last_game",
            type: "uint256",
          },
          {
            name: "highschool_graduate",
            type: "bool",
          },
          {
            name: "highschool_graduation_date",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "game_info",
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
            name: "game_id",
            type: "uint256",
          },
          {
            name: "developer_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "developer_info",
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
            name: "developer_id",
            type: "uint256",
          },
          {
            name: "game_number_developed",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "university_info",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "universityA_id",
            type: "uint256",
          },
          {
            name: "universityB_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "parent_info",
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
            name: "parentA_id",
            type: "uint256",
          },
          {
            name: "parentB_id",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "minted_tokens",
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
    name: "minted_days",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;
