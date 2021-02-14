import { TPlayer } from '../../data/mod.ts'
import { TContext } from '../mod.ts'

function getColor(_ovr: string) {
  const ovr = parseInt(_ovr)
  const isSilver = ovr >= 70
  const isGold = ovr >= 76
  const isEmerald = ovr >= 80
  const isSapphire = ovr >= 84
  const isRuby = ovr >= 87
  const isAmethyst = ovr >= 90
  const isDiamond = ovr >= 92
  const isPinkDiamond = ovr >= 95
  const isGalaxyOpal = ovr >= 97

  if (isGalaxyOpal) return 'Galaxy-Opal'
  if (isPinkDiamond) return 'Pink-Diamond'
  if (isDiamond) return 'Diamond'
  if (isAmethyst) return 'Amethyst'
  if (isRuby) return 'Ruby'
  if (isSapphire) return 'Sapphire'
  if (isEmerald) return 'Emerald'
  if (isGold) return 'Gold'
  if (isSilver) return 'Silver'
  return 'Bronze'
}

function filterPlayersByColors(players: TPlayer[], colors: string[]) {
  const withColors = players.map((p) => ({
    name: p.name,
    color: getColor(p.overall),
  }))
  const output = withColors.filter((p) => colors.some((c) => p.color === c))
  return output
}

export function filterByColor(context: TContext) {
  return new Promise((resolve, reject) => {
    try {
      const { exclude, results, players } = context
      const colors = exclude.get('color') ?? []
      const byColors = filterPlayersByColors(players, colors)
      const output = results.filter(
        (c) =>
          !byColors.some((n) =>
            c.agenda.toLowerCase().includes(n.name.toLowerCase())
          )
      )
      resolve(output)
    } catch (error) {
      reject(error)
    }
  })
}
