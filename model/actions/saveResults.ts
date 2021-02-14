import { TChallenge } from '../../data/mod.ts'
import { TContext } from '../mod.ts'

export type TAgendas = Map<string, TChallenge[]>

export function getAgendas(challenges: TChallenge[]) {
  const allGroups = challenges.map((c) => c.group)
  const uniqueGroups = [...new Set(allGroups)]
  const challengesByGroup = uniqueGroups.reduce((output, groupName) => {
    const groupChallenges = challenges.filter((c) => c.group === groupName)
    output.set(groupName, groupChallenges)
    return output
  }, new Map() as TAgendas)
  return challengesByGroup
}

export async function saveResults(context: TContext) {
  try {
    const { results, dirname, totalXP } = context
    const agendas = getAgendas(results)
    console.log({ totalChallenges: results.length, totalXP })
    const json = JSON.stringify({ ...Object.fromEntries(agendas), totalXP })
    const path = `${dirname}/results.json`
    await Deno.writeTextFile(path, JSON.stringify(json))
    return true
  } catch (error) {
    throw error
  }
}
