import { Resolver, Query } from '@nestjs/graphql'
import { from } from 'rxjs'
import { UserInterfaceService } from './userInterface.service'
import { ProjectLanguage } from '@lib/connect/users/decorators/user.decorator'
import { Interface_ru } from './entitys/userInterface_ru.entity'
import { LanguageSupported, MyObservable } from '@src/types'

@Resolver(() => Interface_ru)
export class UserInterfaceResolver {
  constructor(private userInterfaceService: UserInterfaceService) {
  }

  @Query(() => Interface_ru, { description: 'Получить интерфейс портфолио' })
  userInterfacePortfolioFindAll(
    @ProjectLanguage() language: LanguageSupported
  ): MyObservable<Interface_ru> {
    return from(this.userInterfaceService.findUserInterface([language]))
  }
}
