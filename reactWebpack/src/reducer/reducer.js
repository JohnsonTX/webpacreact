import {Tools} from '../Mytool';

let initData = {
  Topics:[],
  Topic:[],
  load:false,
  loading:true,
  sload:false,
  logIn:JSON.parse(Tools.localItem('User')) || '',
  singin:JSON.parse(Tools.localItem('User')) || '',
  Message:[],
},_ID=1;


const actions = (state=initData,action)=>{
      state.loading=true;
  if(action.data){
    state.loading=false;
    state.sload = true;
  }
    switch(action.type) {
      case'singin':
        return state;
      case'Message':
        return Object.assign({},state,{Message:action.data,load:true});
      case'logIn':
        state.logIn=JSON.parse(Tools.localItem('User')) || '';
        return Object.assign({},state,{logIn:action.data,singin:JSON.parse(Tools.localItem('User'))  || ''});
      case'Out':
        Tools.removeLocalItem("User");
        state.logIn = '';
        return state;
      case'Topic':
      return Object.assign({},state,{Topic:action.data,load:true});
      case'Topics':
             let {Topics} = state,{data}=action;
        if(!Topics.length){
          _ID=1;
        }
            if(data ){
               for(let i=0;i<5;i++){
                  Topics[(_ID - 1)*5 + i] = action.data[i]
                }
              _ID++;
            }

        return Object.assign({},state,{Topics:Topics});
      default :
            return state
    }

};

export  default {actions};
