import { User } from "@/types";

/**
 * This array simulates a database consisting of a list of users.
 * After signing up with your auth solution (e.g. GitHub, Auth0)
 * place your user info in an object, with the email address you used
 * as the id.
 * The groupIds are the names of the groups the user is part of.
 * Group info is in /data/groups.ts
 */
export const users: Omit<User, "color">[] = [
  /*
  {
    id: "[YOUR EMAIL ADDRESS]",
    name: "[YOUR DISPLAY NAME]",
    avatar: "https://liveblocks.io/avatars/avatar-0.png",
    groupIds: ["product", "engineering", "design"],
  },
  */
  {
    id: "enjoyweaver@gmail.com",
    name: "Michael Weaver",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: [
      "board_member",
      "audit_committee",
      "michaels_notes",
      "historical_agendas",
    ],
  },
  {
    id: "larosenwny@yahoo.com",
    name: "Matt La Rose",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: [
      "board_member",
      "audit_committee",
      "matts_notes ",
      "historical_agendas",
    ],
  },
  {
    id: "zack@xogosgaming.com",
    name: "Zack Edwards",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["board_member", "zacks_notes", "historical_agendas"],
  },
  {
    id: "braden@kennyhertzperry.com",
    name: "Braden Perry",
    avatar: "https://liveblocks.io/avatars/avatar-5.png",
    groupIds: ["board_member", "bradens_notes", "historical_agendas"],
  },
  {
    id: "terrencegatsby@gmail.com",
    name: "Terrance Gatsby",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: [
      "board_member",
      "compliance_&_regulations_committee",
      "terrences_notes",
      "historical_agendas",
    ],
  },
  {
    id: "terrence@terrencegatsby.com",
    name: "Terrance Gatsby",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: [
      "board_member",
      "compliance_&_regulations_committee",
      "terrences_notes",
      "historical_agendas",
    ],
  },
  {
    id: "kevin@darienadvisors.io",
    name: "Kevin Stursberg",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["board_member", "kevins_notes", "historical_agendas"],
  },
  {
    id: "tbd",
    name: "McKayla",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: [
      "board_member",
      "education_committee",
      "mckaylas_notes",
      "historical_agendas",
    ],
  },
  {
    id: "tbd",
    name: "tbd",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["advisory_board"],
  },
  {
    id: "",
    name: "tbd",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["advisory_board"],
  },
];
