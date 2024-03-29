const {synopses, synopsesWith} = require('..')

test('synopses README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: []},
    {key: 'questions', required: true}
  ]
  
  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'ask', args: ['ask'], opts: askOpts, required: true},
      {key: 'answer', args: ['-a', '--answer'], types: ['number']},
      {key: 'help', args: ['-h', '--help'], types: []}
    ]
  }
  
  const style = {
    line: [{width: 40}]
  }
  
  const res = synopses(opts)(style)

  const txt = 'deepThought [-a|--answer] [-h|--help]   \n'+
              'deepThought (ask) [-h] (<questions>...) \n'
  
  expect(res).toStrictEqual(txt)
})

test('synopses works with all option types', () => {
  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                         },
    {                    args: ['-w', '--wrong']                                        },
    {                                                types: ['wrong']                   },
    {                                                                           opts: []},
    {key: 'stringPos',                               types: ['string']                  },
    {key: 'numberPos',                               types: ['number']                  },
    {key: 'boolPos',                                 types: ['bool']                    },
    {key: 'arrayPos',                                types: ['bool', 'bool']            },
    {key: 'variadicPos'                                                                 },
    {key: 'command',     args: ['co', 'command'],                               opts: []},
    {key: 'variadic',    args: ['-v', '--variadic']                                     },
    {key: 'flag',        args: ['-f', '--flag'],     types: []                          },
    {key: 'string',      args: ['-s', '--string'],   types: ['string']                  },
    {key: 'number',      args: ['-n', '--number'],   types: ['number']                  },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool']                    },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number']        }
  ]

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const style = {
    line: [{width: 80}]
  }

  const res = synopses(opts)(style)

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]    \n' +
              '                        [<variadicPos>...] [-v|--variadic] [-f|--flag]          \n' +
              '                        [-s|--string] [-n|--number] [-b|--bool] [-a|--array]    \n' +
              'deepThought [with-opts] [co|command]                                            \n' +
              'deepThought [co|command]                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('synopses with undefined opt prints an empty line', () => {
  const opts = undefined

  const style = {
    line: [{width: 80}]
  }

  const res = synopses(opts)(style)

  const txt = '                                                                                \n'

  expect(res).toStrictEqual(txt)
})

test('synopses works without programName', () => {
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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const style = {
    line: [{width: 80}]
  }

  const res = synopses(opts)(style)

  const txt = '[<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>] [<variadicPos>...]         \n' +
              '[-v|--variadic] [-f|--flag] [-s|--string] [-n|--number] [-b|--bool] [-a|--array]\n' +
              '[with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              '[with-opts] [co|command]                                                        \n' +
              '[co|command]                                                                    \n'

  expect(res).toStrictEqual(txt)
})

test('synopses prints only programName if opts are empty', () => {
  const opts = {
    key: 'deepThought',
    opts: []
  }

  const style = {
    line: [{width: 80}]
  }

  const res = synopses(opts)(style)

  const txt = 'deepThought                                                                     \n'

  expect(res).toStrictEqual(txt)
})

test('synopses prints only programName if opts are undefined', () => {
  const opts = {
    key: 'deepThought'
  }

  const style = {
    line: [{width: 80}]
  }

  // @ts-ignore
  const res = synopses(opts)(style)

  const txt = 'deepThought                                                                     \n'

  expect(res).toStrictEqual(txt)
})

test('synopses uses default line style if line is undefined in style', () => {
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

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const style = {
    b: []
  }

  const res = synopses(opts)(style)

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]    \n' +
              '                        [<variadicPos>...] [-v|--variadic] [-f|--flag]          \n' +
              '                        [-s|--string] [-n|--number] [-b|--bool] [-a|--array]    \n' +
              'deepThought [with-opts] [co|command]                                            \n' +
              'deepThought [co|command]                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('synopses uses default line style if style is undefined', () => {
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

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const res = synopses(opts)()

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]    \n' +
              '                        [<variadicPos>...] [-v|--variadic] [-f|--flag]          \n' +
              '                        [-s|--string] [-n|--number] [-b|--bool] [-a|--array]    \n' +
              'deepThought [with-opts] [co|command]                                            \n' +
              'deepThought [co|command]                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('synopsesWith correctly passes on id', () => {
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

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const style = {
    custom: [{width: 70}]
  }

  const res = synopsesWith({id: 'custom'})(opts)(style)

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]      \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag]            \n' +
              '            [-s|--string] [-n|--number] [-b|--bool] [-a|--array]      \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>]       \n' +
              '                        [<arrayPos>] [<variadicPos>...]               \n' +
              '                        [-v|--variadic] [-f|--flag] [-s|--string]     \n' +
              '                        [-n|--number] [-b|--bool] [-a|--array]        \n' +
              'deepThought [with-opts] [co|command]                                  \n' +
              'deepThought [co|command]                                              \n'

  expect(res).toStrictEqual(txt)
})

test('synopsesWith with wrong id uses default style', () => {
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

  const style = {
    custom: [{width: 70}]
  }

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const res = synopsesWith({id: 'foo'})(opts)(style)

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]    \n' +
              '                        [<variadicPos>...] [-v|--variadic] [-f|--flag]          \n' +
              '                        [-s|--string] [-n|--number] [-b|--bool] [-a|--array]    \n' +
              'deepThought [with-opts] [co|command]                                            \n' +
              'deepThought [co|command]                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('synopsesWith with undefined id uses default id', () => {
  const defaultId = 'line'

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

  const style = {
    [defaultId]: [{width: 70}]
  }

  const opts = {
    key: 'deepThought',
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts},
      ...commandOpts
    ]
  }

  const res = synopsesWith({})(opts)()

  const txt = 'deepThought [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]                \n' +
              '            [<variadicPos>...] [-v|--variadic] [-f|--flag] [-s|--string]        \n' +
              '            [-n|--number] [-b|--bool] [-a|--array]                              \n' +
              'deepThought [with-opts] [<stringPos>] [<numberPos>] [<boolPos>] [<arrayPos>]    \n' +
              '                        [<variadicPos>...] [-v|--variadic] [-f|--flag]          \n' +
              '                        [-s|--string] [-n|--number] [-b|--bool] [-a|--array]    \n' +
              'deepThought [with-opts] [co|command]                                            \n' +
              'deepThought [co|command]                                                        \n'

  expect(res).toStrictEqual(txt)
})