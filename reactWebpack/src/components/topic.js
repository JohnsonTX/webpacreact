/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { Link } from 'react-router';
import Mains from './public/Main';
import {Imgicon,UserIcon,UerName,Replays,ReplayForm} from './public/base';
import {Tools} from '../Mytool';
class Topic extends React.Component {
  constructor(props){
    super(props);
  }
  render (){
    var {Topic,logIn,singin} = this.props.state,replayId = singin.id,
      {id, title, create_at, visit_count, reply_count, content, replies,author,last_reply_at} =Topic;
       if(replies){
         var rlength = replies.length;
       }
    var createContent = () => {
      return {
        __html: content
      };
    };


    if(singin=='' && logIn){
      replayId = logIn.id;
    }
    return(
      <div>
        <section>
          <article>

            <div className="user">
              <span className="sort-topic"><Imgicon state={Topic} /></span>
              <UserIcon state={author} />
              <div className="user-info">
                <p>  <span className="visit"></span>
                  <UerName state={author} style={{color: "rgb(255, 148, 0)",fontSize:" 1.8em"}}/> <span >{Tools.formatDate(last_reply_at)} </span>
                </p>
                <p>
                  <span className="create">阅读量:{visit_count} 回复：{reply_count}</span></p>
              </div>
            </div>
            <div className="itemList on">
              <span>{title}</span>
            </div>
            <div className="content" dangerouslySetInnerHTML={createContent()} />
            <div className="replays">
              <h3> 共<span className="repm"> {rlength} </span>人回复</h3>
                <Replays {...this.props} actions={this.props.getDate} state={this.props.state} logIn={logIn}/>

            </div>
            <div>
            </div>
            <div style={{height:'180px'}}>


            {logIn ? <ReplayForm actions={this.props.getDate} state={this.props.state}  userId={id} loginname="回复支持Markdown语法,请注意标记代码"/> :
              <div className="login">
              <Link to="/singin"> <span >登录</span> </Link>
            </div>
            }
            </div>
          </article>
        </section>
      </div>
    )
  }

}



export  default Mains(
  {
  id: 'Topic',  //应用关联使用的redux
  component: Topic, //接收数据的组件入口
  url: 'topic/',
  data:{
    bottom:false,
    scrollSend:false,
  }
  ,
  success: (state) => {return state; }, //请求成功后执行的方法
  error: (state) => { return state } //请求失败后执行的方法
});

