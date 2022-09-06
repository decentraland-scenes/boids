import * as ui from '@dcl/ui-scene-utils'

import * as utils from '@dcl/ecs-scene-utils'
import { REGISTRY } from 'src/registry'
import { CONFIG } from 'src/config'

const TEST_CONTROLS_ENABLE = CONFIG.TEST_CONTROLS_ENABLE 


const textFont = new Font(Fonts.SansSerif)
 
const canvas = ui.canvas


const buttonPosSTART = -350
let buttonPosCounter = buttonPosSTART
let buttonPosY = -50//350
const buttomWidth = 121
const changeButtomWidth = 120
const changeButtomHeight = 16
 
 

function updateDebugButtonUI(testButton:ui.CustomPromptButton){
  if(changeButtomWidth>0) testButton.image.width = changeButtomWidth
  if(changeButtomHeight>0) testButton.image.height = changeButtomHeight
  testButton.label.fontSize -= 5
}
function boolShortNameOnOff(val:boolean){
  if(val) return "On"
  return "Off"
}
export function createDebugUIButtons(){
  if(!TEST_CONTROLS_ENABLE){
    log("debug buttons DISABLED")
    return
  }
  log("debug buttons")

  const boidController = REGISTRY.boidController
  if(!boidController) throw new Error("boidController not initlalized")

  let testButton:ui.CustomPromptButton|null = null
  
  const testControlsToggle = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE,1,1)
  
  
  testControlsToggle.background.positionY = 350
  //testControls.background.visible = false
  testControlsToggle.closeIcon.visible = false
  //testControls.addText('Who should get a gift?', 0, 280, Color4.Red(), 30)
  //const pickBoxText:ui.CustomPromptText = testControls.addText("_It's an important decision_", 0, 260)  
   
  
  const enableDisableToggle = testButton = testControlsToggle.addButton(
    'show:true',
    buttonPosCounter,
    buttonPosY,
    () => { 
      log("enableDisableToggle " + testControls.background.visible)
      if(testControls.background.visible){
        testControls.hide()
        testControls.closeIcon.visible = testControls.background.visible
      }else{
        testControls.show()
        testControls.closeIcon.visible = testControls.background.visible
      }
      enableDisableToggle.label.value='show:'+!testControls.background.visible
    },
    ui.ButtonStyles.RED
  )
  if(changeButtomWidth>0) testButton.image.width = changeButtomWidth
  if(changeButtomHeight>0) testButton.image.height = changeButtomHeight
  
  buttonPosCounter += buttomWidth
    
    
  
  const testControls = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE,1,1)
  
  testControls.hide()
  
  testControls.background.positionY = 350  
  //testControls.background.visible = false
  testControls.closeIcon.visible = false
  //testControls.addText('Who should get a gift?', 0, 280, Color4.Red(), 30)
  //const pickBoxText:ui.CustomPromptText = testControls.addText("_It's an important decision_", 0, 260)  
  
  testControls.background.positionY = 350
  //testControls.background.visible = false
  testControls.closeIcon.visible = false
  //testControls.addText('Who should get a gift?', 0, 280, Color4.Red(), 30)
  //const pickBoxText:ui.CustomPromptText = testControls.addText("_It's an important decision_", 0, 260)  
  


  const cohesionIncAmount = .2
  const alignIncAmount = .2
  const seperationIncAmount = .2
  const obsticleIncAmount = .2
  const seekIncAmount = .2
  const seekIncRadiusAmount = 1
  const avoidIncRadiusAmount = .2

  const weightsFixDec = 2

  const incCohersion = testButton = testControls.addButton(
    'Inc:C:'+boidController.cohesionWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.cohesionWeight+=cohesionIncAmount
      decCohersion.label.value =  'Dec:Coh:'+boidController.cohesionWeight.toFixed(weightsFixDec)
      incCohersion.label.value =  'Inc:Coh:'+boidController.cohesionWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   
  const decCohersion = testButton = testControls.addButton(
    'Dec:Coh:'+boidController.cohesionWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.cohesionWeight-=cohesionIncAmount
      decCohersion.label.value =  'Dec:Coh:'+boidController.cohesionWeight.toFixed(weightsFixDec)
      incCohersion.label.value =  'Inc:Coh:'+boidController.cohesionWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const incAlign = testButton = testControls.addButton(
    'Inc:Algn:'+boidController.aligmentWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.aligmentWeight+=alignIncAmount
      decAlign.label.value =  'Dec:Algn:'+boidController.aligmentWeight.toFixed(weightsFixDec)
      incAlign.label.value =  'Inc:Algn:'+boidController.aligmentWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decAlign = testButton = testControls.addButton(
    'Dec:A:'+boidController.aligmentWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.aligmentWeight-=alignIncAmount
      decAlign.label.value =  'Dec:Algn:'+boidController.aligmentWeight.toFixed(weightsFixDec)
      incAlign.label.value =  'Inc:Algn:'+boidController.aligmentWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column



  const incSeparation = testButton = testControls.addButton(
    'Inc:Sep:'+boidController.separationWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.separationWeight+=seperationIncAmount
      incSeparation.label.value =  'Inc:Sep:'+boidController.separationWeight.toFixed(weightsFixDec)
      decSeparation.label.value =  'Dec:Sep:'+boidController.separationWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decSeparation = testButton = testControls.addButton(
    'Dec:Sep:'+boidController.separationWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.separationWeight-=seperationIncAmount
      incSeparation.label.value =  'Inc:Sep:'+boidController.separationWeight.toFixed(weightsFixDec)
      decSeparation.label.value =  'Dec:Sep:'+boidController.separationWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column


  //NEW ROW//NEW ROW
  buttonPosY -= changeButtomHeight + 2;
  buttonPosCounter = buttonPosSTART;


  const incObsticle = testButton = testControls.addButton(
    'Inc:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.obstacleWeight+=obsticleIncAmount
      incObsticle.label.value =  'Inc:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec)
      decObsticle.label.value =  'Dec:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decObsticle = testButton = testControls.addButton(
    'Dec:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.obstacleWeight-=obsticleIncAmount
      incObsticle.label.value =  'Inc:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec)
      decObsticle.label.value =  'Dec:Obst:'+boidController.obstacleWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

  
  const incSeek = testButton = testControls.addButton(
    'Inc:Seek:'+boidController.seekWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekWeight+=seekIncAmount
      incSeek.label.value =  'Inc:Seek:'+boidController.seekWeight.toFixed(weightsFixDec)
      decSeek.label.value =  'Dec:Seek:'+boidController.seekWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decSeek = testButton = testControls.addButton(
    'Dec:Seek:'+boidController.seekWeight.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekWeight-=seekIncAmount
      incSeek.label.value =  'Inc:Seek:'+boidController.seekWeight.toFixed(weightsFixDec)
      decSeek.label.value =  'Dec:Seek:'+boidController.seekWeight.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

 


  //NEW ROW//NEW ROW
  buttonPosY -= changeButtomHeight + 2;
  buttonPosCounter = buttonPosSTART;



  const incSeekRadius = testButton = testControls.addButton(
    'Inc:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius+=seekIncRadiusAmount
      incSeekRadius.label.value =  'Inc:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
      decSeekRadius.label.value =  'Dec:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decSeekRadius = testButton = testControls.addButton(
    'Dec:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius-=seekIncRadiusAmount
      incSeekRadius.label.value =  'Inc:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
      decSeekRadius.label.value =  'Dec:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column


 
  const incAvoidRadius = testButton = testControls.addButton(
    'Inc:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.avoidRadius+=avoidIncRadiusAmount
      incAvoidRadius.label.value =  'Inc:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec)
      decAvoidRadius.label.value =  'Dec:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column
   

  const decAvoidRadius = testButton = testControls.addButton(
    'Dec:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.avoidRadius-=avoidIncRadiusAmount
      incAvoidRadius.label.value =  'Inc:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec)
      decAvoidRadius.label.value =  'Dec:AvoidRd:'+boidController.avoidRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

  //NEW ROW//NEW ROW
  buttonPosY -= changeButtomHeight + 2;
  buttonPosCounter = buttonPosSTART;


  const zeroSeekRadius = testButton = testControls.addButton(
    'Zero:SeekRad',
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius=0
      incSeekRadius.label.value =  'Inc:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
      decSeekRadius.label.value =  'Dec:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  )
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

  const MaxSeekRadius = testButton = testControls.addButton(
    'Max:SeekRad',
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius=20
      incSeekRadius.label.value =  'Inc:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
      decSeekRadius.label.value =  'Dec:SeekRd:'+boidController.seekRadius.toFixed(weightsFixDec)
    },
    ui.ButtonStyles.RED
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column


  
  const plobs = testButton = testControls.addButton(
    'PL.Obst:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerObstacle?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      //boidController.o=20
      REGISTRY.boidSystem!.playerObstacle!.enabled! = !REGISTRY.boidSystem!.playerObstacle?.enabled
      plobs.label.value =  'PL.Obst:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerObstacle?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column


  const plseek = testButton = testControls.addButton(
    'PL.Seek:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius=20
      REGISTRY.boidSystem!.playerSeek!.enabled! = !REGISTRY.boidSystem!.playerSeek?.enabled
      plseek.label.value =  'PL.Seek:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerSeek?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

 
  const plpredator = testButton = testControls.addButton(
    'PL.Predator:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius=20
      REGISTRY.boidSystem!.playerPredator!.enabled! = !REGISTRY.boidSystem!.playerPredator?.enabled
      plpredator.label.value =  'PL.Predator:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column



  //NEW ROW//NEW ROW
  buttonPosY -= changeButtomHeight + 2;
  buttonPosCounter = buttonPosSTART;


    /*
  const obs = testButton = testControls.addButton(
    'Obst:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerObstacle?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      //boidController.o=20
      REGISTRY.boidSystem!.playerObstacle!.enabled! = !REGISTRY.boidSystem!.playerObstacle?.enabled
      obs.label.value =  'Obst:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerObstacle?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column


  const seek = testButton = testControls.addButton(
    'Seek:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      //boidController.seekEnabled=false
      REGISTRY.boidSystem!.playerSeek!.enabled! = !REGISTRY.boidSystem!.playerSeek?.enabled
      seek.label.value =  'Seek:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerSeek?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column

 
  const predator = testButton = testControls.addButton(
    'Predator:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!),
    buttonPosCounter,
    buttonPosY,
    () => { 
      boidController.seekRadius=20
      REGISTRY.boidSystem!.playerPredator!.enabled! = !REGISTRY.boidSystem!.playerPredator?.enabled
      predator.label.value =  'Predator:'+boolShortNameOnOff(!REGISTRY.boidSystem!.playerPredator?.enabled!)
    },
    ui.ButtonStyles.RED 
  ) 
  updateDebugButtonUI(testButton)
  buttonPosCounter += buttomWidth //next column*/

} 
 
