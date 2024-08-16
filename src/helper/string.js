const capitalizeWord = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const capitalize = (text = '') => {
  const arrStr = text.toLowerCase().split(' ')
  return arrStr.map(capitalizeWord).join(' ')
}

export {
  capitalize,
  capitalizeWord
}