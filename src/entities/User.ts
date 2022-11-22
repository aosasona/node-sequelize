import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Note} from "./Note";

export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column("string")
  firstName: string

  @Column("string")
  lastName: string

  @Column("string")
  email: string

  @Column("string")
  password: string

  @Column("datetime")
  createdAt: Date

  @Column("datetime")
  updatedAt: Date

  @Column("datetime")
  deletedAt: Date

  @OneToMany(type => Note, note => note.user)
  notes: Note[]
}