import { TContext } from '../mod.ts'

export function filterByTheme(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, results } = context
      const themes = exclude.get('theme') ?? []
      const output = results.filter(
        (c) =>
          !themes.some((n) => c.group.toLowerCase().includes(n.toLowerCase()))
      )
      resolve(output)
    } catch (error) {
      reject(error)
    }
  })
}
