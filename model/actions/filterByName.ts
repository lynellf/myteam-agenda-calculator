import { TContext } from '../mod.ts'

export function filterByName(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, challenges } = context
      const names = exclude.get('name') ?? []
      const results = challenges.filter(
        (c) =>
          !names.some((n) => c.agenda.toLowerCase().includes(n.toLowerCase()))
      )
      resolve(results)
    } catch (error) {
      reject(error)
    }
  })
}
