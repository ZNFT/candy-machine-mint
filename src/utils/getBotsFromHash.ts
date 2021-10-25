import { wave2Hash, wave3Hash } from "./paired-bots"
import { wave1 } from "../bots/wave1"
import { wave3 } from "../bots/wave3"
import { wave2 } from "../bots/wave2"
import { wave4 } from "../bots/wave4"

export type BotDataType = {
  gen: string,
  img: string,
  attributes: {
    trait_type: string,
    value: string | number
  }[]
  name: string
}

export type BotsDataType = {
  [key: string]: BotDataType
}

export const getBotsFromHash = (num: string, getOnlyRanking?: boolean) => {
  const arr = []
  if(wave1[num]){
    arr.push(wave1[num])
  }
  else if(wave2[num]){
    arr.push(wave2[num])
  }
  else if(wave3[num]){
    arr.push(wave3[num])
  }
  else if(wave4[num]){
    arr.push(wave4[num])
  }

  if(getOnlyRanking){
    return arr
  }

  if(wave2Hash[num]){
    arr.push(wave3[wave2Hash[num]])
  } else if(wave3Hash[num]){
    arr.push(wave2[wave3Hash[num]])
  }
  return arr;
}
