const {synopsisDeep} = require('..')

test('synopsisDeep README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: []},
    {key: 'questions', required: true}
  ]
  
  const opts = [
    {key: 'ask', args: ['ask'], opts: askOpts, required: true},
    {key: 'answer', args: ['-a', '--answer'], types: ['number']},
    {key: 'help', args: ['-h', '--help'], types: []}
  ]
  
  const style = {
    line: {width: 40}
  }
  
  const res = synopsisDeep('deepThought')(opts)(style)

  const txt = 'deepThought [-a|--answer] [-h|--help]   \n'+
              'deepThought ask [-h] (<questions>...)   \n'
  
  expect(res).toStrictEqual(txt)
})

test('synopsisDeep works with all option types', () => {
  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                          },
    {                    args: ['-w', '--wrong']                                         },
    {                                                types: ['wrong']                    },
    {                                                                           opts: [] },
    {key: 'stringPos',                               types: ['string']                   },
    {key: 'numberPos',                               types: ['number']                   },
    {key: 'boolPos',                                 types: ['bool']                     },
    {key: 'arrayPos',                                types: ['bool', 'bool']             },
    {key: 'variadicPos'                                                                  },
    {key: 'command',     args: [],                                               opts: []},
    {key: 'variadic',    args: ['-v', '--variadic']                                      },
    {key: 'flag',        args: ['-f', '--flag'],     types: []                           },
    {key: 'string',      args: ['-s', '--string'],   types: ['string']                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number']                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool']                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number']         }
  ]

  const opts = [
    {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
    ...commandOpts
  ]

  const style = {
    line: {width: 80}
  }

  const res = synopsisDeep('deepThought')(opts)(style)

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought with-opts [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]      \n' +
              '                      [<variadicPos>...] [-v|--variadic] [-f|--flag]            \n' +
              '                      [-s|--string] [-n|--number] [-b|--bool] [-a|--array]      \n' +
              'deepThought with-opts command                                                   \n' +
              'deepThought command                                                             \n'

  expect(res).toStrictEqual(txt)
})

test('synopsisDeep works without programName', () => {
  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                          },
    {                    args: ['-w', '--wrong']                                         },
    {                                                types: ['wrong']                    },
    {                                                                           opts: [] },
    {key: 'stringPos',                               types: ['string']                   },
    {key: 'numberPos',                               types: ['number']                   },
    {key: 'boolPos',                                 types: ['bool']                     },
    {key: 'arrayPos',                                types: ['bool', 'bool']             },
    {key: 'variadicPos'                                                                  },
    {key: 'command',     args: ['co', 'command'],                                opts: []},
    {key: 'variadic',    args: ['-v', '--variadic']                                      },
    {key: 'flag',        args: ['-f', '--flag'],     types: []                           },
    {key: 'string',      args: ['-s', '--string'],   types: ['string']                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number']                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool']                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number']         }
  ]

  const opts = [
    {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
    ...commandOpts
  ]

  const style = {
    line: {width: 80}
  }

  const res = synopsisDeep()(opts)(style)

  const txt = '[<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>] [<variadicPos>...]         \n' +
              '[-v|--variadic] [-f|--flag] [-s|--string] [-n|--number] [-b|--bool] [-a|--array]\n' +
              'with-opts [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                  \n' +
              '          [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]          \n' +
              '          [-n|--number] [-b|--bool] [-a|--array]                                \n' +
              'with-opts co                                                                    \n' +
              'co                                                                              \n'

  expect(res).toStrictEqual(txt)
})

test('synopsisDeep prints only programName if opts are empty', () => {
  const opts = []

  const style = {
    line: {width: 80}
  }

  const res = synopsisDeep('deepThought')(opts)(style)

  const txt = 'deepThought                                                                     \n'

  expect(res).toStrictEqual(txt)
})

test('synopsisDeep prints only programName if opts are undefined', () => {
  const style = {
    line: {width: 80}
  }

  const res = synopsisDeep('deepThought')()(style)

  const txt = 'deepThought                                                                     \n'

  expect(res).toStrictEqual(txt)
})