/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Mains from './public/Main';
import {actions} from '../actions/index';
import {Tools} from '../Mytool';
class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showStyle:false,
      list:[],
      on:true
    };
    this.show = ()=>{
      this.setState({showStyle:!this.state.showStyle})
    }

    this.out =()=>{
      this.props.login('Out');
      location.href='/';
    }
    this.list=(list,status)=>{
      this.setState({list:list,on:status});
    };
  }
  render (){
     debugger;
      var {loginname,avatar_url,create_at,recent_replies,recent_topics,score} = this.props.state.logIn,customer =this.props.params.loginname,
        self=this.props.state.singin, styleObj={background:'url('+avatar_url +') center center / cover'},{on}=this.state,showStyle=this.state.showStyle,showBack = false;
         if(self){
           self = self.loginname;
         }
    if(on){
        var them = "on", reply ='';
      }else {
        var them = "", reply ='on';
      }
      if(customer != self){
        showBack = true;
      }


    return(
      <div>
        <section>
          <article>
            <div className="loading" style={showStyle ? {display:'block'} :  {display:'none'}}>
              <div className="confirm">
                <h2>您确定要退出吗？</h2>
                <div>
                  <span onClick={()=>this.show()}> <i  className="iconfont cancel"></i> &nbsp;取消&nbsp;&nbsp;&nbsp;</span>
                  <span onClick={()=>{this.out()}}> <i className="iconfont sure"></i>&nbsp;确定</span>
                </div>
              </div>
            </div>
            <div  className="goBack">
              <div>
                <i onClick={this.props.router.goBack} style={showBack ? {display:'block'} : {display:'none'}}  className="iconfont">&#xe633;</i>
                  <i onClick={()=>this.show()} style={showBack ? {display:'none'} :{display:'block'}}  className="iconfont out" ></i>
                个人中心
              </div>
            </div>
            <div className="person-center">
              <i className="user-icon"  style={styleObj}></i>
              <span className="name">{loginname}</span>
              <span>积分:{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号年龄：{Tools.formatDate(create_at)}</span>
            </div>
            <div className="person-content">
              <ul className="nave" >
                <li onClick={()=>{this.list(recent_topics,true)}} className={them}>主题</li>
                <li onClick={()=>{this.list(recent_replies,false)}}  className={reply}>回复</li>
              </ul>
              <ItemList init={recent_topics}  state={this.state.list}/>
            </div>

          </article>
        </section>
      </div>
    )
  }

}
class  ItemList extends React.Component{
  render(){
    var {state,init} = this.props,data=init;
    if(state.length>0){
      data=state
    }
    return(
      <div>

        <ul>
            {data ?data.map((item, index) => {
                let {id, title, last_reply_at} = item;
                return (
                  <li key={index} className="replays-item">
                    <Link data-flex="box:last" to={`/topic/${id}`}>
                      <div className="tit">{title}</div>
                      <time >{Tools.formatDate(last_reply_at)}</time>
                    </Link>
                  </li>
                );
              }) : ''
            }
        </ul>
      </div>
    )
  }

}
const userName = (state)=>{
  return {userName:state.login}
};
const login=(dispatch)=>{
  return {login:(action,data)=>dispatch(actions(action,data))}
}
User = connect(userName,login)(User)
export  default Mains(
  {
    id: 'logIn',  //应用关联使用的redux
    component: User, //接收数据的组件入口
    url: 'user/',
    data:{
      scrollSend:false
    }
    ,
    success: (state) => {return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
  });
