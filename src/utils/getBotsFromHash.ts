import { BotType } from "../pages/RarityTool"
import { botsJson } from "./bots"
import { wave3 } from "./updatedWave3"

export const getBotsFromHash = (num: string) => {
  const botsArray: BotType[] = []
  if(botsJson[num]){
    botsArray.push(botsJson[num])
  }
  if(wave3[num]){
    botsArray.push(wave3[num])
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