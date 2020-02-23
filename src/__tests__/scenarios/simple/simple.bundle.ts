import { Group } from "../../entities/group";
import { User } from "../../entities/user";
import { fixture } from "../../../fixture";

export const group1 = fixture(Group, { name: "Group 1" });

export const user1 = fixture(User, {
  firstName: "User",
  lastName: "1",
  groups: [group1]
});

export const user2 = fixture(User, {
  firstName: "User",
  lastName: "2"
});

export const group2 = fixture(Group, { name: "Group 2", users: [user2] });
