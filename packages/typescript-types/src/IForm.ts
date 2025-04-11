export interface IForm{
  formName:string,
  date:string,
  language?:string,
  widgetId:string,
  data:{
    [key:string]:any
  },
  createdAt:Date,
  updatedAt?:Date,
}