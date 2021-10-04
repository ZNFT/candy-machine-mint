import { BotType } from "../pages/RarityTool"
import { botsJson, secondBotsJson } from "./bots"
import { duplicates } from "./duplicate-bots"

export const getBotsFromHash = (num: string) => {
  const botsArray: BotType[] = []
  if(botsJson[num]){
    botsArray.push(botsJson[num])
  }
  if(duplicates[num]){
    botsArray.push(duplicates[num])
  }
  if(secondBotsJson[num]){
    botsArray.push(secondBotsJson[num])
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