import { Inject, Injectable } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { Repository } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'

import { PostgreConstants } from '@db/db.constants'
import { User } from '@lib/connect/users/entitys/user.entity'
import { Role } from '@lib/connect/roles/entitys/role.entity'
import { StatusEnum } from '@lib/connect/users/interfaces/status'
import { tokenErrors } from '@lib/connect/tokens/errors'
import { TokenInput } from './inputs/create-token.input'
import { Token } from './entitys/token.entity'

config()


@Injectable()
export class TokenService {
  constructor(
    @Inject(PostgreConstants.CONNECT_DB.repository)
    private readonly tokenRepository: Repository<Token>
  ) {}

  /**
   * Генерация токена
   */
  generateToken(user: User): string {
    return sign(
      { id: user.id, status: user.status, roles: user.roles },
      process.env.JWT_SECRET_KEY
    )
  }

  /**
   * Сохранение токена в БД
   */
  async saveToken(createUserToken: TokenInput) {
    try {
      const newToken = await this.tokenRepository.create(createUserToken)
      await this.tokenRepository.save(newToken)
      return newToken
    } catch {
      throw new GraphQLError(tokenErrors.SAVE)
    }
  }

  /**
   * Проверяет есть ли у пользователя токен
   */
  async exists(param: { uid: number; token: string }) {
    try {
      const findToken = await this.tokenRepository.findOne(param)
      return findToken ?? findToken
    } catch {
      throw new GraphQLError(tokenErrors.EXISTS)
    }
  }

  /**
   * Подтверждение токена
   */
  verifyToken(token: string) {
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as { id: number, status: StatusEnum, roles: Role[] }
    } catch (error) {
      throw new GraphQLError(tokenErrors.VERIFY)
    }
  }

  /**
   * Удаляет токен у пользователя
   */
  async delete(uid: number, token?: string) {
    try {
      const where = token ? { uid, token } : { uid }
      const find = await this.tokenRepository.findOne({ where })
      if (!find) return

      return await this.tokenRepository.delete(find)
    } catch {
      throw new GraphQLError(tokenErrors.DELETE)
    }
  }
}
