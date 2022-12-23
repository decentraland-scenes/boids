import { CONFIG } from "./config"
import { SceneActiveUtil } from "./sceneActiveUtil"

const useVideoTexture = true


let DEBUG_BLUE = new Material()

DEBUG_BLUE.albedoColor = Color4.Blue()
//DEBUG_YELLOW.alphaTexture = enemyMarkerTexture
DEBUG_BLUE.roughness = 1.0
DEBUG_BLUE.metallic = 0.0

  const seaLevelPlaneEntity = new Entity()
  engine.addEntity(seaLevelPlaneEntity)
  //seaLevelPlaneEntity.setParent(REGISTRY.entities.parentScene)
  seaLevelPlaneEntity.addComponent(new Transform({
    position: new Vector3(CONFIG.center.x,10,CONFIG.center.z),
    rotation: Quaternion.Euler(90,-90,90),
    scale: new Vector3(CONFIG.sizeX,CONFIG.sizeZ,1)//new Vector3(CONFIG.sizeX,CONFIG.sizeZ,1)
  }))
  //REGISTRY.entities.seaLevelPlane = seaLevelPlaneEntity
  seaLevelPlaneEntity.addComponent(new OnPointerDown(()=>{
    //noop
  },{
    hoverText: "seaLevelEntity"
  }))

  
  //using plane until get real model
  const seaPlane = new PlaneShape()
  seaLevelPlaneEntity.addComponent(seaPlane)
  //seaLevelPlaneEntity.addComponent(CommonResources.RESOURCES.materials.transparent)

 
  // #1
  //https://vimeo.com/735986584
  const myVideoClip = new VideoClip(
    "videos/waveLoop.mp4"
)

  // #2
  const myVideoTexture = new VideoTexture(myVideoClip)
  myVideoTexture.pause()
  myVideoTexture.playing = false
  myVideoTexture.loop = true

  //REGISTRY.videoTexture = myVideoTexture

  // #3

  const videoMat = new Material()
  videoMat.albedoTexture = myVideoTexture
  videoMat.alphaTexture = myVideoTexture
  videoMat.emissiveTexture = myVideoTexture;

  videoMat.specularIntensity = 0

  videoMat.emissiveColor = Color3.White();
  videoMat.albedoColor = Color3.White();
  videoMat.emissiveIntensity = 10

  videoMat.metallic = 0
  videoMat.roughness = 1

  const videoCausticMat = new Material()
  videoCausticMat.albedoTexture = myVideoTexture
  videoCausticMat.alphaTexture = myVideoTexture
  videoCausticMat.emissiveTexture = myVideoTexture;
  videoCausticMat.specularIntensity = 0
  videoCausticMat.emissiveColor = Color3.FromHexString("#FF7700");  
  videoCausticMat.emissiveIntensity =0.8
  videoCausticMat.metallic = 0
  videoCausticMat.roughness = 1
 

  
  //videoMat.emissiveTexture = myVideoTexture
  //myVideoTexture.play() //called in scene triggers to play or not

  function setVideoPlaying(val: boolean) {
    const METHOD_NAME = "setVideoPlaying"
    log(METHOD_NAME,"val",val);
    if (val) {
      if(!CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL || (sceneActiveUtil.capturedUserInput || sceneActiveUtil.playerPositionChanged)){
        myVideoTexture.play()
      }else{
        log('stage',CONFIG,METHOD_NAME,"input not captured, cannot play yet")
      } 
    } else { 
      log('stage',METHOD_NAME,"stopping show")
      myVideoTexture.pause()
    } 
  }

  if(useVideoTexture){
    seaLevelPlaneEntity.addComponentOrReplace(videoMat)
  } else{
    seaLevelPlaneEntity.addComponentOrReplace(DEBUG_BLUE)          
  } 

  function addCaustics(){
    for(let i=0; i< 5; i++){

      const causticPlane = new Entity()
   
      causticPlane.addComponent(new Transform({
        position: new Vector3(0,-0.49 + 0.24*i,40),
        rotation: Quaternion.Euler(-90,180,89.9),
        scale: new Vector3(80,0.85,1)
      }))
     
      const causticShape = new PlaneShape()
      causticShape.uvs=[
        0,0.3+0.05*i,
        0,0.32+0.05*i,
        1,0.37+0.05*i,
        1,0.35+0.05*i,
    
        0,0.3+0.05*i,
        0,0.32+0.05*i,
        1,0.37+0.05*i,
        1,0.35+0.05*i,
      ]
      causticPlane.addComponent(causticShape)
      if(useVideoTexture){
        causticPlane.addComponent(videoCausticMat)  
      }else{
        causticPlane.addComponent(DEBUG_BLUE)          
      }
      causticPlane.setParent(seaLevelPlaneEntity)
    }
  }

  addCaustics()
 
  const sceneActiveUtil = new SceneActiveUtil( setVideoPlaying ) 
  if(CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL) sceneActiveUtil.init()
