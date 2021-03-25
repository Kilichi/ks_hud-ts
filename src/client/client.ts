import { resolve } from "path"

const Wait = (ms) => new Promise(resolve => setTimeout(resolve,ms))

let hunger:number
let thirst:number
let vehicle:number

on("esx_status:onTick",(status) => {
  hunger = status[0].percent
  thirst = status[1].percent
})
