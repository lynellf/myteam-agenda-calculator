import { TContext } from '../mod.ts'

export function filterByKeyword(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, results } = context
      const keywords = exclude.get('keyword') ?? []
      const output = results.filter(
        (c) =>
          !keywords.some((n) =>
            c.agenda.toLowerCase().includes(n.toLowerCase())
          )
      )
      resolve(output)
    } catch (error) {
      reject(error)
    }
  })
}
