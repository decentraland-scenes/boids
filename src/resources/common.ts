
const INVISIBLE_MATERIAL = new BasicMaterial()
const INVISIBLE_MATERIAL_texture = new Texture('images/transparent-texture.png')
INVISIBLE_MATERIAL.texture = INVISIBLE_MATERIAL_texture
INVISIBLE_MATERIAL.alphaTest = 1


const MATERIAL_CACHE:Record<string,ObservableComponent> = {}
const GLTF_CACHE:Record<string,GLTFShape> = {}


export class CommonResources {
    static RESOURCES = {
        models:{
          names:{
            
          }
        },
        textures: {
          //sprite_sheet: spriteSheetTexture,
          transparent: {
            texture: INVISIBLE_MATERIAL_texture,
            size:{sourceHeight:1,sourceWidth:1} //ImageSection
          },
          roundedSquareAlpha: {
            texture: new Texture ("images/rounded_alpha_square.png")
           // size:{sourceHeight:1,sourceWidth:1} //ImageSection
          }
          
        },
        materials: {
          //sprite_sheet: spriteSheetMaterial
          transparent: INVISIBLE_MATERIAL
        },
        strings:{
           
        },
        images:{
          portrait:{
          }
        }
      }
}


export function getOrCreateGLTFShape(model:string):GLTFShape{
  let shape:GLTFShape = GLTF_CACHE[model]
  if(!shape){
    log("miss gltf cache",model)
    shape = new GLTFShape(model)
    GLTF_CACHE[model] = shape
  }else{
    log("hit gltf cache",model)
  }
  return shape;
}

export function getOrCreateMaterial(color:Color3,transparent:boolean):ObservableComponent{
  let colorCacheName = color.toHexString();// + "-" + colorOn.toHexString() + "-" + emissiveIntensity
  if(transparent){
      colorCacheName = "transparent"
  }
  let materialComp:ObservableComponent = MATERIAL_CACHE[colorCacheName]
  if(!materialComp){
      if(!transparent){
          const material = new Material()
          material.albedoColor = color
          //barItemMaterial.specularIntensity = 1
          material.roughness = 1
          material.metallic = 0.0
          MATERIAL_CACHE[colorCacheName] = material

          materialComp = material
      }else{
          //do stuff to make transparent
          let material = CommonResources.RESOURCES.materials.transparent
          MATERIAL_CACHE[colorCacheName] = material

          materialComp = material
      }
  }else{
    if(transparent){
      log("hit transparent cache")
    }
  }
  return materialComp;
}
