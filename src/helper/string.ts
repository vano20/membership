const capitalizeWord = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const capitalize = (text = ''): string => {
  const arrStr = text.toLowerCase().split(' ')
  return arrStr.map(capitalizeWord).join(' ')
}

export {
  capitalize,
  capitalizeWord
}