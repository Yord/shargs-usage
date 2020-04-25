const {line, stylePath, table} = require('../..')

const id = style => style

test('stylePath README example works 1/2', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const answer42 = line('The answer is 42.')

  const res = stylePath(['line', 0], pad4)(answer42)(style)

  const exp = '    The answer is 42.                   \n'

  expect(res).toStrictEqual(exp)
})

test('stylePath README example works 2/2', () => {
  const style = {
    cols: [{width: 20}, {width: 20}]
  }

  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const answer42 = table([
    ['--answer', '42']
  ])

  const res = stylePath(['cols', 0], pad4)(answer42)(style)

  const exp = '    --answer        42                  \n'

  expect(res).toStrictEqual(exp)
})

test('stylePath works with arrays', () => {
  const style = {
    cols: [{width: 20}, {width: 20}]
  }

  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const res = stylePath(['cols', 0], pad4)(id)(style)

  const exp = {
    cols: [{padStart: 4, width: 16}, {width: 20}]
  }

  expect(res).toStrictEqual(exp)
})

test('stylePath uses empty styles object if style does not contain id', () => {
  const style = {}
  
  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: (obj.width || 0) - 4})

  const id = line('a')

  const res = stylePath(['foo'], pad4)(id)(style)

  const exp = 'a                                                                               \n'

  expect(res).toStrictEqual(exp)
})

test('stylePath uses default styles if style is undefined', () => {
  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const id = line('a')

  const res = stylePath(['line', 0], pad4)(id)()

  const exp = '    a                                                                           \n'

  expect(res).toStrictEqual(exp)
})

test('stylePath changes first layer in style if path is empty', () => {
  const style = {
    desc: [{padStart: 4, width: 36}]
  }

  const setLine = obj => ({...obj, line: [{width: 40}]})

  const res = stylePath([], setLine)(id)(style)

  const exp = {
    line: [{width: 40}],
    desc: [{padStart: 4, width: 36}]
  }

  expect(res).toStrictEqual(exp)
})

test('stylePath changes nothing if path is not an array', () => {
  const style = {
    desc: [{padStart: 4, width: 36}]
  }

  const setLine = obj => ({...obj, line: {width: 40}})

  const res = stylePath(undefined, setLine)(id)(style)

  const exp = style

  expect(res).toStrictEqual(exp)
})