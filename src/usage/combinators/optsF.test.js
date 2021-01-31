const {optsF} = require('./optsF')

const f = (defArgs, descOpt, opts) => ({defArgs, descOpt, opts})

test('optsF sorts args', () => {
  const answer = {key: 'answer', types: ['number'], args: ['--answer', '-a']}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<number>')
  expect(descOpt(answer)).toStrictEqual('')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF generates required shields', () => {
  const answer = {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<number>')
  expect(descOpt(answer)).toStrictEqual(' [required]')

  expect(opts).toStrictEqual(opt.opts)
})