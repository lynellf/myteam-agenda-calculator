import { interpret } from 'https://cdn.skypack.dev/xstate?dts'
import { agendaFilterMachine as machine } from './model/mod.ts'

function app() {
  interpret(machine).start()
}

app()
