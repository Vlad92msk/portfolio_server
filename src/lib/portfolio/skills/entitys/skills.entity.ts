import { Entity, Column, PrimaryColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { Specialty } from '../interfaces/specialty'
import { IconName } from '@models/icon.model'

@ObjectType()
@Entity('Skills')
export class Skill {
  @Field()
  @PrimaryColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название' })
  @Column({ name: 'name' })
  name: IconName

  @Field({ description: 'Позиция на сетке' })
  @Column({ name: 'position' })
  position: number

  @Field({ description: 'Специальность (Frontend/Backend/Other)' })
  @Column({ name: 'specialty' })
  specialty: Specialty
}
