import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNumber, IsEnum } from 'class-validator'
import { RoleEnum } from '@lib/connect/roles/interfaces/role'
import { enumMessage } from '@utils/enumeration'

@InputType()
export class FindRoleInput {
  @IsNumber()
  @Field({ nullable: true })
  id?: number

  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  @Field({ nullable: true })
  value?: RoleEnum

  @IsString({ message: 'Значение должно быть строкой' })
  @Field({ nullable: true })
  description?: string
}
