import { EntityWrapper } from 'src/portwrapper/EntityWrapper.js';
import { CommonResources } from 'src/resources/common.js';
//import BoidEntity from './BoidEntity.js';
import { BOID_CONFIG } from './Constants.js';
import Grid from "./Grid";
import IBoidEntity, { BoidTypeEnum } from './IBoidEntity.js';
import IBoidVisibleEntity from './IBoidVisibleEntity.js';

export const fishConeShape = new ConeShape()
fishConeShape.withCollisions = false

export const fishBoxShape = new BoxShape()
fishBoxShape.withCollisions = false
 
export const objsSphere = new SphereShape()
 objsSphere.withCollisions = false

export const fishShapes:GLTFShape[] =
[
  new GLTFShape("models/Fish_01/Fish_01.glb"),
  new GLTFShape("models/Fish_03/Fish_03.glb"),
  new GLTFShape("models/Fish_04/Fish_04.glb")
]

for(const p in fishShapes){
  fishShapes[p].withCollisions = false
}


/**
 * @module BoidVisualEntity 
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export default class BoidVisibleEntity implements IBoidVisibleEntity {
    boid:IBoidEntity
    entity!:EntityWrapper
    modelEntity!:EntityWrapper
    //maxEntitySpeed?:number
    /**
     * Constructor for the Entity class
     * @param {Number} boid entitiy
     */
    constructor(boid:IBoidEntity) {
        this.boid = boid

        this.initEntity()
        /*if(this.id == 1){
        log(this.id,"fish stats",{
            id:this.id,
            mass:this.mass,
            maxforce:this.maxforce,
            maxspeed:this.maxspeed,
        })
        }*/
    }

    initEntity(){
        const type = this.boid.type
        const parent = new Entity("fish-p-"+this.boid.id)
        //parent.addComponent(fishShape)
        parent.addComponent(new Transform(
        {
            position:new Vector3(1,1,1)
            //,scale: new Vector3(this.mass/2,this.mass/2,this.mass).scale(FISH_MASS_SIZE_SCALE) 
        }
        ))
        
        this.entity = new EntityWrapper(parent)

        
        const child = new Entity("fish-"+this.boid.id)

        child.addComponent(new Transform( {
            scale: Vector3.One()
        } ))
        

        if(type == BoidTypeEnum.FLOCK_ENTITY){

            child.getComponent(Transform).rotate(new Vector3(0,1,0),-90)
            child.getComponent(Transform).rotate(new Vector3(1,0,0),90)

            //as fish
            child.addComponent(fishShapes[ Math.floor(Math.random()*fishShapes.length) ])
            
            //as particles 
            
            //sphere particles
            //child.addComponentOrReplace(objsSphere)
            //child.getComponent(Transform).scale.scaleInPlace(.05)

            //cube particles
            //child.addComponentOrReplace(fishBoxShape)
            //child.getComponent(Transform).scale.scaleInPlace(.05)

        }else if(type == BoidTypeEnum.PREDATOR_ENTITY){
            if(BOID_CONFIG.VISIBLE_PREDATOR) {
                child.addComponent(fishConeShape)

                child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                child.getComponent(Transform).scale.scaleInPlace(.3)

                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.SEEK_ENTITY){
            if(BOID_CONFIG.VISIBLE_SEEK) {
                child.addComponent(new BoxShape())

                child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                child.getComponent(Transform).scale.scaleInPlace(.2)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.OBSTACLE_ENTITY){
            if(BOID_CONFIG.VISIBLE_OBSTACLES) {
                child.addComponentOrReplace(objsSphere)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
            log("adding child obs")
        }else{
            log("unknown type",type)
        }
        
        
        child.setParent(parent)

        this.modelEntity = new EntityWrapper(child)

        engine.addEntity(parent) 
        
    }
}