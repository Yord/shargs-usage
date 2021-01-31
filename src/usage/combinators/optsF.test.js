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

test('optsF generates default shields for numbers', () => {
  const answer = {key: 'answer', types: ['number'], args: ['-a', '--answer'], defaultValues: [42]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<number>')
  expect(descOpt(answer)).toStrictEqual(' [default: 42]')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF generates default shields for strings', () => {
  const answer = {key: 'answer', types: ['string'], args: ['-a', '--answer'], defaultValues: ['yay']}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<string>')
  expect(descOpt(answer)).toStrictEqual(' [default: yay]')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF generates default shields for booleans', () => {
  const answer = {key: 'answer', types: ['boolean'], args: ['-a', '--answer'], defaultValues: [false]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<boolean>')
  expect(descOpt(answer)).toStrictEqual(' [default: false]')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF does not generate default shields for arrays', () => {
  const answer = {key: 'answer', types: ['string'], args: ['-a', '--answer'], defaultValues: [[1, 2]]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<string>')
  expect(descOpt(answer)).toStrictEqual('')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF does not generate default shields for objects', () => {
  const answer = {key: 'answer', types: ['string'], args: ['-a', '--answer'], defaultValues: [{a: 1}]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<string>')
  expect(descOpt(answer)).toStrictEqual('')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF does not generate default shields for functions', () => {
  const answer = {key: 'answer', types: ['string'], args: ['-a', '--answer'], defaultValues: [a => a]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<string>')
  expect(descOpt(answer)).toStrictEqual('')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF generates array default shields for a string and a number', () => {
  const answer = {key: 'answer', types: ['string', 'number'], args: ['-a', '--answer'], defaultValues: ['yay', 42]}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<string number>')
  expect(descOpt(answer)).toStrictEqual(' [default: [yay, 42]]')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF overrides default shields with descDefault', () => {
  const answer = {key: 'answer', types: ['number'], args: ['-a', '--answer'], defaultValues: [42], descDefault: '23'}

  const opt = {
    opts: [
      answer
    ]
  }

  const {defArgs, descOpt, opts} = optsF(f)(opt)

  expect(defArgs(answer)).toStrictEqual('-a, --answer=<number>')
  expect(descOpt(answer)).toStrictEqual(' [default: 23]')

  expect(opts).toStrictEqual(opt.opts)
})

test('optsF removes default shields with descDefault', () => {
  const answer = {key: 'answer', types: ['number'], args: ['-a', '--answer'], defaultValues: [42], descDefault: ''}

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