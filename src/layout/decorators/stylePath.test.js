const {line, stylePath} = require('../..')

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