
/**
 * Validate the userinput and returns TRUE if it is an array of numbers.
 * Be aware that this function is not bulletproof and can be bypassed,
 * you should always validate user input on the server. This is just an example.
 * and false if it is anything else.
 *
 * @param {sting} untrustedUserInput
 */
export function isVerifiableInputIntegrity (untrustedUserInput) {
  if (untrustedUserInput === undefined || untrustedUserInput === null || untrustedUserInput.length === 0) {
    return false
  }

  // Check if the input contains anything but [ ], numbers, commas, dots and spaces.
  const containsUnexpectedCharacters = untrustedUserInput.match(/[^0-9\[\]\,\.-\s]/g) !== null
  if (containsUnexpectedCharacters) {
    return false
  }

  // Check if its properly formatted as an array of numbers.
  const containsMultipleBrackets = untrustedUserInput.match(/\[/g).length > 1 || untrustedUserInput.match(/\]/g).length > 1
  const firstCharacterIsBracket = untrustedUserInput[0] === '['
  const lastCharacterIsBracket = untrustedUserInput[untrustedUserInput.length - 1] === ']'
  const secondCharacterIsNotANumber = isNaN(untrustedUserInput[1]) && untrustedUserInput[1] !== '-'
  if (containsMultipleBrackets || !firstCharacterIsBracket || !lastCharacterIsBracket || secondCharacterIsNotANumber) {
    return false
  }

  // The input is safe and can be parsed to an array of numbers.
  return true
}

/**
 * Validate the userinput to the minimum degree and returns the array if at all possible.
 * Be aware that this is dangerous and should not be used in production.
 */
export function unsafeStringToArrayConverter (untrustedUserInput) {
  if (untrustedUserInput === undefined || untrustedUserInput === null || untrustedUserInput.length === 0) {
    return untrustedUserInput
  }

  const arrayToRender = []
  if (Array.isArray(untrustedUserInput) && untrustedUserInput.length > 0) {
    return arrayToRender
  }

  // if it contains any truely dangerous characters, return []
  const containsDangerousCharacters = untrustedUserInput.match(/[<>\(\)\{\}\*\/\?\!\@\#\$\%\^\&\=\_\`\~\:\\'\";]/g) !== null
  if (containsDangerousCharacters) {
    return arrayToRender
  }

  // If else, try to parse it to an array of whatever is in there.
  const stringArray = untrustedUserInput.slice(1, untrustedUserInput.length - 1).split(',')
  stringArray.forEach(element => {
    // convert each string to a number and push it to the arrayToRender
    // we can't use parseInt or parseFloat since we want to be able to render both.
    arrayToRender.push((element))
  })
  return arrayToRender
}

/**
 * Converts a string to an array of numbers.
 * The string should be formatted as a javascript array of numbers.
 * The string should be validated before calling this function.
 * @param {string} stringToConvert
 */
export function stringToArrayConverter (stringToConvert) {
  const arrayToRender = []
  // remove the brackets and split the string into an array of strings
  const stringArray = stringToConvert.slice(1, stringToConvert.length - 1).split(',')
  stringArray.forEach(element => {
    // convert each string to a number and push it to the arrayToRender
    // we can't use parseInt or parseFloat since we want to be able to render both.
    arrayToRender.push(Number(element))
  })
  return arrayToRender
}