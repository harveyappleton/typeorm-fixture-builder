import {
  Entity,
  ManyToMany,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Group } from "./group";
import { Profile } from "./profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(
    () => Group,
    group => group.users
  )
  groups: Group[];

  @OneToOne(
    () => Profile,
    profile => profile.user
  )
  @JoinColumn()
  profile: Profile;
}
