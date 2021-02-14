import { TContext } from '../mod.ts'

export function filterByCollection(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, results } = context
      const collections = exclude.get('collection') ?? []
      const output = results.filter(
        (c) =>
          !collections.some((n) =>
            c.agenda.toLowerCase().includes(n.toLowerCase())
          )
      )
      resolve(output)
    } catch (error) {
      reject(error)
    }
  })
}
