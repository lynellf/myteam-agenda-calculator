import { sum } from 'https://cdn.skypack.dev/simple-statistics?dts'
import { TContext } from '../mod.ts'

export function getTotal(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { results } = context
      const xp = results.map((c) => {
        const result = parseInt(c.xp)
        const isNumber = !isNaN(result)
        return isNumber ? result : 0
      })
      const total = sum(xp)
      resolve(total)
    } catch (error) {
      reject(error)
    }
  })
}
