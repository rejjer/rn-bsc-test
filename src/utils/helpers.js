import R from 'ramda'
import { APP_NAME } from '../constants/names'

export const getModuleActionName = R.curry(
  (moduleName, actionName) => `${APP_NAME}/${moduleName}/${actionName}`,
)
