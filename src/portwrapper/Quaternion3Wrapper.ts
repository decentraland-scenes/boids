

/**
 * attempt at sdk 6.x like syntax
 */
export class QuaternionWrapper {
  y: number
  x: number
  z: number
  w: number


  static LookRotation(direction: Vector3,up?:Vector3) {
    return Quaternion.LookRotation(direction,up)
  }
  static Slerp(rotation: { x: number; y: number; z: number; w: number }, lookRot: any, amount: number = 1): Quaternion {
    return Quaternion.Slerp(rotation,lookRot,amount)
  }
  
  
  static Euler(x:number,y:number,z:number){
    return Quaternion.Euler(x,y,z)
  }
  static Zero(){
    return Quaternion.Zero()
  }
  /*
  static LookRotation(direction: Vector3.MutableVector3) {
    throw new Error("Method not implemented.")
  }
  static Slerp(rotation: { x: number; y: number; z: number; w: number }, lookRot: any, arg2: number): { x: number; y: number; z: number; w: number } {
    throw new Error("Method not implemented.")
  }
  
  
  static Euler(x:number,y:number,z:number){
    return Quaternion.euler(x,y,z)
  }
  static Zero(){
    return Quaternion.Zero()
  }
  */
  constructor(x:number,y:number,z:number,w:number) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

}
