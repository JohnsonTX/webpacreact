/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { Link } from 'react-router';
import Mains from './public/Main';
import {Imgicon,UserIcon,UerName,Replays,ReplayForm} from './public/base';
import {Tools} from '../Mytool';
class Massage extends React.Component {

  render (){
    var {has_read_messages,hasnot_read_messages} = this.props.state.Message;
    return(
      <div>
        <section>
          <article>
            <div className="message">
              <div  className="goBack">
                <div>
                  <i onClick={this.props.router.goBack}  className="iconfont">&#xe633;</i>
                  消息
                </div>
              </div>
              <div className="content">
                <ul>
                  {hasnot_read_messages ? hasnot_read_messages.map((item,index)=>{
                    let {type, author, topic, reply, has_read,id} = item,content;
                    if (type == 'at') {
                      content = <div>在话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link>中 @了你</div>;
                    } else {
                      content = <div>回复你了的话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link></div>
                    }
                    return(
                      <li  key={index}>
                        <div className="user">
                          <Link className="user" to={`/user/${author.loginname}`}><UserIcon state={author} /></Link>
                          <div className="user-info">
                            <p>
                              <UerName state={author} style={{color: "rgb(100, 181, 4)",fontSize:" 1.2em"}}/>
                            </p>
                            <div>{content}</div>
                          </div>
                        </div>

                      </li>
                    )
                  } ) : <li>
                    <div className="to-singIn"> 您未 <Link to="/singin">登录</Link> 暂无消息!</div>
                  </li>}
                </ul>
              </div>

            </div>
          </article>
        </section>
      </div>
    )
  }
  componentDidMount(){
   document.getElementById('loading').style.display='none'
  }
}



export  default Mains(
  {
  id: 'Message',  //应用关联使用的redux
  component: Massage, //接收数据的组件入口
  url: 'messages',
  data:{
    stop:(props,state)=>{
      if(!props.state.actions.singin.accesstoken &&!props.state.actions.logIn.accesstoken){
        return false
      }else{
        return true;
      }
    },
    params:(props,state)=>{
      if(props.state.actions.singin.accesstoken){
        return {accesstoken: props.state.actions.singin.accesstoken}
      }else if(props.state.actions.logIn.accesstoken){
        return {accesstoken:props.state.actions.logIn.accesstoken}
      }
    },
    scrollSend:false,
  }
  ,
  success: (state) => {return state; }, //请求成功后执行的方法
  error: (state) => { return state } //请求失败后执行的方法
});

