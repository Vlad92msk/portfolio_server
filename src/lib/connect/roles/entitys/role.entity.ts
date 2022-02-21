import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entitys/user.entity'

@ObjectType()
@Entity('Roles')
export class Role {
  @Field({ description: 'id' })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название роли' })
  @Column({ name: 'value' })
  value: string

  @Field({ description: 'Описание роли' })
  @Column({ name: 'description' })
  description: string

  @Field(() => [User])
  @ManyToMany(() => User, ({ roles }) => roles)
  users: User[]
}
