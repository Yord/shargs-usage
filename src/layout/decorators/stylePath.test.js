const {line, stylePath, table} = require('../..')
const {defaultStyle} = require('../../style')

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

test('stylePath uses empty styles object if style and default style do not contain string id', () => {
  const style = {
    b: []
  }
  
  const pad4 = (obj = {}) => ({...obj, padStart: (obj.padStart || 0) + 4, width: (obj.width || 0) - 4})

  const res = stylePath(['foo'], pad4)(id)(style)

  const exp = {
    ...style,
    foo: {width: -4, padStart: 4}
  }

  expect(res).toStrictEqual(exp)
})

test('stylePath uses default styles as basis if style is undefined', () => {
  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const res = stylePath(['line', 0], pad4)(id)()

  const exp = {
    ...defaultStyle,
    line: [{
      ...defaultStyle.line[0],
      width: defaultStyle.line[0].width - 4,
      padStart: (defaultStyle.line[0].padStart || 0) + 4
    }]
  }

  expect(res).toStrictEqual(exp)
})

test('stylePath changes first layer in style if path is empty', () => {
  const style = {
    cols: [{width: 15}, {width: 25}]
  }
  
  const setLine = obj => ({...obj, line: [{width: 40}]})

  const res = stylePath([], setLine)(id)(style)

  const exp = {
    ...style,
    line: [{width: 40}]
  }

  expect(res).toStrictEqual(exp)
})

test('stylePath changes nothing if path is not an array', () => {
  const style = {
    line: []
  }

  const setLine = obj => ({...obj, line: {width: 40}})

  const res = stylePath(undefined, setLine)(id)(style)

  const exp = style

  expect(res).toStrictEqual(exp)
})

test('stylePath generates a list if current path element is a number which is missing from the obj', () => {
  const style = {
    right: [{width: 20}]
  }

  const doubleWidth = (obj = {}) => ({...obj, width: (obj.width || 30) * 2})

  const res = stylePath(['wrong', 0], doubleWidth)(id)(style)

  const exp = {
    ...style,
    wrong: [{width: 60}]
  }

  expect(res).toStrictEqual(exp)
})