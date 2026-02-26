import { User } from "next-auth";

export type ProfileResponse = {
  user: User["user"];
};

