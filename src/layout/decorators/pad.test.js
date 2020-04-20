const {line, pad, table} = require('../..')

const id = style => style

test('pad README example works', () => {
  const style = {
    line: {width: 40}
  }
  
  const answer42 = line('The answer is 42.')

  const res = pad(['line'], 4)(answer42)(style)

  const exp = '    The answer is 42.                   \n'

  expect(res).toStrictEqual(exp)
})

test('pad works on arrays', () => {
  const style = {
    cols: [{width: 20}, {width: 20}]
  }
  
  const answer42 = table([['--answer', '42']])

  const res = pad(['cols', 0], 4)(answer42)(style)

  const exp = '    --answer        42                  \n'

  expect(res).toStrictEqual(exp)
})

test('pad assumes 0 if spaces is undefined', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = pad(['line'])(id)(style)

  const exp = {
    line: {padStart: 0, width: 40}
  }

  expect(res).toStrictEqual(exp)
})