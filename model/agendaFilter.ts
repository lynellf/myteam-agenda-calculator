import { Machine, assign } from 'https://cdn.skypack.dev/xstate?dts'
import { players, challenges, TChallenge } from '../data/mod.ts'
import { exclude, targetExp, dirname } from '../settings.ts'
import {
  filterByName,
  filterByCollection,
  filterByKeyword,
  filterByColor,
  filterByMode,
  filterByTheme,
  saveResults,
  logError,
  getTotal,
} from './actions/mod.ts'

export type TContext = {
  players: typeof players
  challenges: typeof challenges
  exclude: typeof exclude
  targetExp: typeof targetExp
  results: TChallenge[]
  dirname: typeof dirname
  totalXP: number
  err: null | Error
}

type TFilterEvent = {
  type: string
  data: TContext['results']
}

type TAnalyzeEvent = {
  type: string
  data: number
}

type TErrorEvent = {
  type: string
  data: Error
}

export const agendaFilterMachine = Machine(
  {
    id: 'agendas',
    initial: 'byName',
    context: {
      dirname,
      players,
      challenges,
      exclude,
      targetExp,
      totalXP: 0,
      results: [],
      err: null,
    } as TContext,
    states: {
      byName: {
        invoke: {
          src: async (context) => await filterByName(context),
          onDone: {
            target: 'byCollection',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      byCollection: {
        invoke: {
          src: async (context) => await filterByCollection(context),
          onDone: {
            target: 'byTheme',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      byTheme: {
        invoke: {
          src: async (context) => await filterByTheme(context),
          onDone: {
            target: 'byKeyword',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      byKeyword: {
        invoke: {
          src: async (context) => await filterByKeyword(context),
          onDone: {
            target: 'byMode',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      byMode: {
        invoke: {
          src: async (context) => await filterByMode(context),
          onDone: {
            target: 'byColor',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      byColor: {
        invoke: {
          src: async (context) => await filterByColor(context),
          onDone: {
            target: 'analyzing',
            actions: assign<TContext, TFilterEvent>({
              results: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      analyzing: {
        invoke: {
          src: async (context) => await getTotal(context),
          onDone: {
            target: 'saving',
            actions: assign<TContext, TAnalyzeEvent>({
              totalXP: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'error',
            actions: assign<TContext, TErrorEvent>({
              err: (_, event) => event.data,
            }),
          },
        },
      },
      saving: {
        invoke: {
          src: async (context) => await saveResults(context),
          onDone: {
            target: 'done',
          },
          onError: {
            target: 'error',
            actions: ['logError'],
          },
        },
      },
      done: {
        type: 'final',
      },
      error: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      logError,
    },
  }
)
