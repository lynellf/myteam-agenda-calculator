import { TContext } from '../mod.ts'

export function logError(context: TContext) {
  const { err } = context
  console.error(err)
}
