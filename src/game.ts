
/// --- Set up a system ---

import { createBoundaryMarkers, createBoundaryPlanes, initBoidController } from "./boids/setupBoids"
import { initBoidSystem , startBoidSystem } from "./boidSystem"
import { addShark } from "./shark"
import { createDebugUIButtons } from "./ui/ui-hud-debugger"


const seaBedModel = new GLTFShape('models/Underwater.gltf')
const seaBed = new Entity()
seaBed.addComponent(seaBedModel)
seaBed.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(0.8, 0.8, 0.8),
  })
)
engine.addEntity(seaBed)

/*
const seaBed2 = new Entity()
seaBed2.addComponent(seaBedModel)
seaBed2.addComponent(
  new Transform({   
    position: new Vector3(8, 0, 8+16),
    scale: new Vector3(0.8, 0.8, 0.8),
    rotation: Quaternion.Euler(0,90,0)
  })
)
engine.addEntity(seaBed2)*/


function start(){
  initBoidController()
  initBoidSystem()
  
  createDebugUIButtons()
  
  startBoidSystem()

  createBoundaryPlanes()
  createBoundaryMarkers()

  addShark()
}


start()
