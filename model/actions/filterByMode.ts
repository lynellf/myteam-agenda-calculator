import { TContext } from '../mod.ts'

export function filterByMode(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, results } = context
      const modes = exclude.get('modes') ?? []
      const output = results.filter(
        (c) =>
          !modes.some((n) => c.agenda.toLowerCase().includes(n.toLowerCase()))
      )
      resolve(output)
    } catch (error) {
      reject(error)
    }
  })
}
