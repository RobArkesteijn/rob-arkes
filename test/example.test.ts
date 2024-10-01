import { expect, test } from 'vitest'

function splitString(input: string, delimiter: string): string[] {
  return input.split(delimiter)
}

test('splitString: splits a string by a delimiter', () => {
  const input = 'te-st'
  const delimiter = '-'
  const expectedOutput = ['te', 'st']

  const result = splitString(input, delimiter)

  expect(result).toEqual(expectedOutput)
})
