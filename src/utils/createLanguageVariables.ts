import { Repository } from 'typeorm'
import { LanguageSupported } from '@src/types'

export const createLanguageVariables = (lags: LanguageSupported[], repos: Repository<any>[]) => {
  return lags.reduce((acc: {[a: string]: Repository<any>}, item, i) => ({
    ...acc,
    [item]: repos[i]
  }), {})
}
export type CreateLanguageVariablesType = ReturnType<typeof createLanguageVariables>
