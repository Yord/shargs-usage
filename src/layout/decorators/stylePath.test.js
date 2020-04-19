const {line, stylePath, table} = require('../..')

test('stylePath README example works 1/2', () => {
  const style = {
    line: {width: 40}
  }
  
  const pad4 = obj => ({...obj, padStart: (obj.padStart || 0) + 4, width: obj.width - 4})

  const answer42 = line('The answer is 42.')

  const res = stylePath(['line'], pad4)(answer42)(style)

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