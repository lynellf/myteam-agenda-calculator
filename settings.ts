import { Map } from 'https://cdn.skypack.dev/immutable?dts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

const env = config()
const __dirname = env.DIRNAME

export const exclude = Map({
  name: [] as string[],
  collection: [] as string[],
  theme: [] as string[],
  keyword: [] as string[],
  modes: [],
  color: ['Pink-Diamond', 'Galaxy-Opal'] as string[],
})

export const targetExp = 150_000

export const dirname = __dirname
