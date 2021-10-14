import { BotType } from "../pages/RarityTool"
import { botsJson } from "./bots"
import { wave2Hash, wave3Hash } from "./paired-bots"
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

  if(wave2Hash[num]){
    botsArray.push(wave3[wave2Hash[num]])
  } else if(wave3Hash[num]){
    botsArray.push(botsJson[wave3Hash[num]])
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