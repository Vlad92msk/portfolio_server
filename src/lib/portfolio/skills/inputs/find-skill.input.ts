import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsString } from 'class-validator'
import { Specialty } from '../interfaces/specialty'
import { enumMessage } from '@utils/enumeration'
import { IconName } from '@models/icon.model'

@InputType({ description: 'Найти навык' })
export class FindSkillInput {
  @Field({ name: 'Название умения' })
  @IsString()
  name?: IconName

  @Field({ name: 'Специальность' })
  @IsEnum(Specialty, { message: enumMessage(Specialty) })
  specialty?: Specialty
}
