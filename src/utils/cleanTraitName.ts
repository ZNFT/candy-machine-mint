const parsedInt = (num: string) => {
  return parseInt(num, 10)
}

export const cleanTraitName = (name: string | undefined) => {
  if(!name) return
  const firstSplit = name.split(' - ');
  const firstParsedInt = parsedInt(firstSplit[1])

  if(typeof firstParsedInt == 'number' && !isNaN(firstParsedInt)){
    return firstSplit[0]
  }
  const secondSplit = name.split(' ');
  const secondParsedInt = parsedInt(secondSplit[1])
  if(typeof secondParsedInt == 'number' && !isNaN(secondParsedInt) ){
    return secondSplit[0]
  }
  return name
}