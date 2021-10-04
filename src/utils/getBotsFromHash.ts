import { BotType } from "../pages/RarityTool"
import { botsJson } from "./bots"
import { duplicates } from "./duplicate-bots"

export const getBotsFromHash = (num: string) => {
  const botsArray: BotType[] = []
  if(botsJson[num]){
    botsArray.push(botsJson[num])
  }
  if(duplicates[num]){
    botsArray.push(duplicates[num])
  }
  return botsArray;
}