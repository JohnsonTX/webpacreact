/**
 * Created by johnsontx on 2017/1/14.
 */
// export const formSub =(text)=>{
//   return {type:'FORM_SUB',id:formID++,text}
// };
// export  const toggle_item = (id)=>{
//   return {type:'TOGGLE_ITEM',id}
// };
// export const  showItem =(filter)=>{
//   return {type:'SHOW_ITEM',filter}
// };
//
// export  const getBase = (filter)=>{
// return{
//   type:'GET_BASE',
//   filter
// }
// };
// export const getDatal = (data,sort)=>{
// return{
//   type:'GET_DATA',
//   data,
//   sort
// }
// };
//
// export  const getServe = (URL='topics',parms={page: 1,  limit: 5, mdrender: false},sort='list') =>
//   (dispatch)=>{
//     try{
//       Tools.get(URL,parms,(data)=>{
//           dispatch(getDatal(data.data,sort))
//       });
//     }catch (e){
//       console.log('error: ',e)
//     }
// };
// export const cleanData = (clean)=>{
//   return {
//     type:'CLEAN_DATA',
//    clean
//   }
// }
  let _ID=1;
export const actions = (type,data,id)=>{
  return {
    type: type,
    data,
    id:_ID++,
  }
};

