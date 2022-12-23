import { isPreviewMode } from '@decentraland/EnvironmentAPI'

//using search service 
//https://github.com/decentraland/decentrally-service
const SERVICES_DOMAIN = 
  //"http://localhost:5001"
  "https://decentrally-service.decentraland.net"


const ParcelCountX:number = 1
const ParcelCountZ:number = 2


export class Config{
  IN_PREVIEW = false // can be used for more debugging of things, not meant to be enabled in prod
 
  //shows 2d ui debug buttons
  TEST_CONTROLS_ENABLE = true

  ENABLED_DETECT_SCENE_ACTIVE_UTIL = true
  DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED = false

  sizeX!:number
  sizeY!:number
  sizeZ!:number

  center!:Vector3
  centerGround!:Vector3

  initAlready:boolean = false

  init(){
    if(this.initAlready) return;

    this.sizeX = ParcelCountX*16
    this.sizeZ = ParcelCountZ*16 
    this.sizeY = (Math.log((ParcelCountX*ParcelCountZ) + 1) * Math.LOG2E) * 20// log2(n+1) x 20 //Math.log2( ParcelScale + 1 ) * 20
    this.center = new Vector3(this.sizeX/2,this.sizeY/2,this.sizeZ/2)
    this.centerGround = new Vector3(this.sizeX/2,0,this.sizeZ/2)

    this.initAlready = true

  }
}

export const CONFIG = new Config()
CONFIG.init()

//set in preview mode from env, local == preview
isPreviewMode().then(function(val:boolean){
  setInPreview(val);
})

export function setInPreview(val: boolean) {
  log("setInPreview " + val)
  CONFIG.IN_PREVIEW = val

  //var console: any
}


