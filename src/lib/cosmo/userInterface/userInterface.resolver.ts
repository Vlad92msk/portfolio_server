import { Resolver, Query } from '@nestjs/graphql'
import { from } from 'rxjs'

import { ProjectLanguage } from '@lib/connect/users/decorators/user.decorator'
import { LanguageSupported, MyObservable } from '@src/types'
import { UserInterfaceService } from './userInterface.service'
import { Interface_cosmo_ru } from './entitys/userInterface_ru.entity'

@Resolver(() => Interface_cosmo_ru)
export class UserInterfaceResolver {
  constructor(private userInterfaceService: UserInterfaceService) {
  }

  @Query(() => Interface_cosmo_ru, { description: 'Получить интерфейс космо' })
  userInterfaceCosmoFindAll(
    @ProjectLanguage() language: LanguageSupported
  ): MyObservable<Interface_cosmo_ru> {
    return from(this.userInterfaceService.findUserInterface([language]))
  }
}
