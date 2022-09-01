/**
 * attempt at sdk 6.x like syntax for 7.x SDK
 */
export class EntityWrapper {
  entity: Entity

  constructor(entity: Entity) {
    this.entity = entity
  }

  /*
  getComponent<T extends EcsType = EcsType<any>>(comp: ComponentDefinition<T>): ComponentType<T> {
    return this.getComponentM(comp)
  }

  getComponentM<T extends EcsType = EcsType<any>>(comp: ComponentDefinition<T>): ComponentType<T> {
    return comp.mutable(this.entity)
  }
  getComponentR<T extends EcsType = EcsType<any>>(comp: ComponentDefinition<T>): DeepReadonly<ComponentType<T>> {
    return comp.getFrom(this.entity)
  }
  addComponent<T extends EcsType = EcsType<any>>(comp: ComponentDefinition<T>, val?: ComponentType<T>) {
    return comp.create(this.entity, val)
  }
  */

  
  //getComponent<T = any>(component: string): T;
  hasComponent<T>(component: ComponentConstructor<T>): boolean{
    return this.entity.hasComponent(component)
  }
  getComponent<T>(component: ComponentConstructor<T>|string): T{
    if (typeof component === 'string' || component instanceof String){
      return this.getComponent_String(component as string)
    }else{
      return this.getComponentM(component)
    }
  }
  hasComponent_String<T=any>(component: string): boolean{
    return this.entity.hasComponent(component)
  }
  getComponent_String<T=any>(component: string): T{
    return this.getComponentM_String(component as string)
  }
  getComponentM_String<T = any>(component: string): T{
    return this.entity.getComponent(component)
  }
  getComponentM<T>(component: ComponentConstructor<T>): T{
    return this.entity.getComponent(component)
  }
  isAlive(){
    return this.entity.alive
  }
}
