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
    groupIds: ["board member", "audit committee", "michaels notes"],
  },
  {
    id: "larosenwny@yahoo.com",
    name: "Matt La Rose",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["board member", "audit committee", "matts notes "],
  },
  {
    id: "zack@xogosgaming.com",
    name: "Zack Edwards",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["board member", "zacks notes"],
  },
  {
    id: "braden@kennyhertzperry.com",
    name: "Braden Perry",
    avatar: "https://liveblocks.io/avatars/avatar-5.png",
    groupIds: ["board member", "bradens notes"],
  },
  {
    id: "terrencegatsby@gmail.com",
    name: "Terrance Gatsby",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: [
      "board member",
      "compliance & regulations committee",
      "terrences notes",
    ],
  },
  {
    id: "kevin@darienadvisors.io",
    name: "Kevin Stursberg",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["board member", "kevins notes"],
  },
  {
    id: "tbd",
    name: "McKayla",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["board member", "education committee", "mckaylas notes"],
  },
  {
    id: "tbd",
    name: "tbd",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["advisory board"],
  },
  {
    id: "tbd",
    name: "tbd",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["advisory board"],
  },
];
