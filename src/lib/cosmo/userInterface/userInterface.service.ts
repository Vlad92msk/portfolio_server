import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { catchError, from, of, switchMap } from 'rxjs'

import { PostgreConstants } from '@db/db.constants'
import { catchErrorCustom } from '@utils/catchErrorCustom'
import { createLanguageVariables, CreateLanguageVariablesType } from '@utils/createLanguageVariables'
import { Interface_cosmo_ru } from './entitys/userInterface_ru.entity'
import { Interface_cosmo_en } from './entitys/userInterface_en.entity'
import { UserInterfaceErrors } from './errors'
import { LanguageSupported, MyObservable } from '@src/types'

const { COSMO: { schemas: { INTERFACE } } } = PostgreConstants

@Injectable()
export class UserInterfaceService {
  private readonly langVar: CreateLanguageVariablesType

  constructor(
    @Inject(INTERFACE.ru.rep__interface_cosmo)
    readonly interfaceRepository_ru: Repository<Interface_cosmo_ru>,

    @Inject(INTERFACE.en.rep__interface_cosmo)
    readonly interfaceRepository_en: Repository<Interface_cosmo_en>
  ) {
    /**
     * Создает объект для переключения на базу данных с соответствующим языком
     */
    this.langVar = createLanguageVariables(['ru', 'en'], [this.interfaceRepository_ru, this.interfaceRepository_en])
  }

  /**
   * Получить интерфейс
   * @param language
   */
  public findUserInterface = ([language]: [LanguageSupported]): MyObservable<Interface_cosmo_ru> => from(
    this.langVar[language].findOneOrFail(1)
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom(`${this.findUserInterface.name} - ${UserInterfaceErrors.FIND_INTERFACE}`))
  )
}
