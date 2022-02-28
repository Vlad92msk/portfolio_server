import { PostgreConstants } from '@db/db.constants'
import { createProvider } from '@utils/createProvider.utils'

const {
  PORTFOLIO: {
    connect,
    tables: { INTERFACE: { ru, en } }
  }
} = PostgreConstants

export const UserInterfaceProviders = createProvider([
  {
    connect: [connect],
    repository: ru.rep__interface_portfolio,
    name: ru.name__interface_portfolio
  },
  {
    connect: [connect],
    repository: en.rep__interface_portfolio,
    name: en.name__interface_portfolio
  }
])
