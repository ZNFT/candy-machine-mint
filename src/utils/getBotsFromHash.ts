import { BotType } from "../pages/RarityTool"
import { botsJson } from "./bots"
import { wave3 } from "./updatedWave3"
import { wave4 } from "./wave4"

export const getBotsFromHash = (num: string) => {
  const botsArray: BotType[] = []
  if(botsJson[num]){
    botsArray.push(botsJson[num])
  } else if(wave3[num]){
    botsArray.push(wave3[num])
  } else if(wave4[num]){
    botsArray.push(wave4[num])
  }

  const parsed = parseInt(num,10)
  let pairedID = 0
  if(!isNaN(parsed) && parsed > 1234 && parsed < 1842){
    pairedID = parsed + 2323
    botsArray.push(wave3[pairedID])
  } else if(!isNaN(parsed) && parsed > 3557 && parsed < 4165){
    pairedID = parsed - 2323
    botsArray.push(botsJson[pairedID])
  }
  return botsArray;
}

export const getWaveName = (collection: string) => {
  if(collection === 'Gen 1 heads'){
    return 'Wave 1'
  } else if(collection === 'Gen 2 heads'){
    return 'Wave 2'
  } else if(collection === 'Gen 3 heads'){
    return 'Wave 3'
  } else if(collection === 'Gen 4 heads'){
    return 'Wave 4'
  }
}