export interface IPhoto {
  id:number
  name:string
  description: string
  fileName: string
  create: ()=> void
  read: ()=> void
  update: ()=> void
  delete: ()=> void
}
