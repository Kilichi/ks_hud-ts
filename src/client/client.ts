// Vars

let hunger:number
let thirst:number
let vehicle
let hudPosition:string
let fuelPosition:string
let vehicleFuel:number

const playerID:number = GetPlayerServerId(NetworkGetEntityOwner(GetPlayerPed(-1)))
const Config = {
  useMinimap : true,
  minimap : true, // if you have useMinimap in false
}

// End Vars


// Principal event

on("esx_status:onTick",(status: { percent: number }[]) => {
  
  // Status
  
  hunger = status[0].percent
  thirst = status[1].percent
  
  // Minimap

  Config.useMinimap ? DisplayRadar(vehicle) : DisplayRadar(Config.minimap)

  // Vehicle update

  vehicle = IsPedSittingInAnyVehicle(PlayerPedId())
  vehicle ? vehicleFuel = GetVehicleFuelLevel(vehicle) : vehicleFuel = 0
  IsPedSittingInAnyVehicle(PlayerPedId()) ? hudPosition = 'right' : hudPosition = 'left'
  IsPedSittingInAnyVehicle(PlayerPedId()) ? fuelPosition  = 'right' : fuelPosition  = 'left'

  // Send to html & js

  SendNuiMessage(
    JSON.stringify(
      {
        hud : true,
        pauseMenu : IsPauseMenuActive(),
        armour : GetPedArmour(PlayerPedId()),
        health : GetEntityHealth(PlayerPedId())-100,
        food : hunger,
        thirst : thirst,
        playerid : playerID,
        hudPosition : hudPosition,
        fuelPosition : fuelPosition,
        stress : 0,
        fuel : vehicleFuel
      }
    )
  )

})

// End principal event
