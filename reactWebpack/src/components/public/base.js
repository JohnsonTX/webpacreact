import React from 'react';
import {Tools} from '../../Mytool';
import { Link } from 'react-router';
import { connect } from 'react-redux';

/**
 * 类型图标**/
export class  Imgicon extends React.Component{
  render(){
    var {tab,good,top} = this.props.state,csName = tab;
    if(tab='share' && good){
      csName = 'good'
    }else if(tab='share' && top){
      csName = 'top'
    }
    return(
        <i className={'iconfont '+csName}>
        </i>
    )
  }
}
/**
 * 用户图标**/
export  class UserIcon extends React.Component{
  render(){
    var {state} =this.props;
    if(state){
      var {avatar_url} = state,styleObj={
        background: 'url(' + avatar_url + ') center center / cover',
      };
    }
    return(
        <i className="user-icon"  style={styleObj}></i>
    )
  }
}

/**
 * 用户**/
export  class UerName extends React.Component{
  render(){
    var {state} =this.props,{style}=this.props;
    if(state){
      var {loginname} = state;
    }
    return(
      <span className="user-name" style={style}>{loginname}</span>
    )
  }
}

/**
 * 底部导航**/
class NaveBottom extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    var bottom,show=this.props.state,count;
    if(show.setting){
      bottom = show.setting.data.bottom
    }else {
      bottom = this.props.state;
    }

    if(show.state){
      var {logIn,singin} = show.state.actions,loginname =show.params.loginname;
      count = show.state.actions.singin.messageCount;
    }else{
      logIn = show.login;
      count =this.props.login.messageCount;
    }
    if(!count &&this.props.message){
      count=this.props.message.singin.messageCount;
    }
    if(loginname){
      if(logIn.loginname == singin.loginname ){
        bottom=true
      }else {
        bottom=false
      }
    }
    if(bottom==false){
      var styleObj = {
        display:'none'
      }
    }
    var {login} =this.props,person='/singin';
       if(login){
         person = '/user/' + login.loginname
       }
    return(
      <div className="navBg ">
        <div className="fixedNav bottom" style={styleObj}>
          <ul className="nav">
            <li >
              <Link to="/">
                <i className="iconfont home"></i>首页
              </Link>

            </li>
            <li>
              <Link to="/public/">
                <i className="iconfont apply"></i> 发表
              </Link>
            </li>
            <li style={{position:'relative'}}>
              <Link to="/message/">
                <i className="iconfont message"></i>消息 {count ? <span className="message">{count}</span> :''}
              </Link>
            </li>
            <li >
              <Link to={person}>
                <i className="iconfont person"></i>我的
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
NaveBottom = connect((state)=>{return{login:state.actions.logIn}})(NaveBottom);
export {NaveBottom}

/**
 * 回复**/
export class ReplayForm extends  React.Component{
  constructor(props){
    super(props);
    this.state = {button:'回复',sendId:'',data:this.props.state,load:false};
    var _this = this;
    this.submit=(user)=>{
      var {replayId,userId,state}=this.props,
      senddata={
        accesstoken:this.props.state.logIn.accesstoken || this.props.state.singin.accesstoken,
        id:userId,
        reply_id:'',
        content:this.refs.content.value,
      };
      if (senddata.content == '') {
        return alert('回复内容不能为空！');
      }
      if(user == state.logIn.loginname){
        return alert('您不能回复自己！')
      }
      if(replayId){
        senddata.reply_id =replayId;
        senddata.content= `[@${this.props.loginname}](/user/${this.props.loginname}) ${this.refs.content.value}`;
      } else{
        this.state.callUser =this.props.loginname;
        senddata.content =this.refs.content.value;
      }
      _this.setState({button:'提交中'});
      Tools.post(`topic/${userId}/replies`, senddata, (data) => {
        this.refs.content.value = '';
      });

      /**
       * 刷新页面**/
      Tools.get(`topic/${userId}`,{},(data) => {
        if(data.success){
          this.props.actions('Topic',data.data);
          window.scrollTo(0,document.body.clientHeight);
          this.refs.replayForm.parentNode.className = "hidden-replay";
          _this.setState({
            button:'回复'
          });
        }

      });

    }
  }
  render(){
    var {replayId,userId,loginname}=this.props,callUser=loginname;
        if(replayId){
          callUser = '@' + loginname;
        }
    return(
        <div action="" className="replay-form" ref="replayForm">
          <textarea rows="5" ref='content' placeholder={callUser}></textarea>
          <div className="replay-button">
            <button type="button"  onClick={()=>this.submit(loginname)}>{this.state.button}</button>
          </div>

        </div>
    )
  }
}

/**
 * 回复列表**/
export class Replays extends React.Component{

  constructor(props){
    super(props);


    this.checkAg = (ups)=>{
      if(ups.length==0){return ''}
      var {singin} = this.props.state,logid,renewId = this.props.params.id,agrree=false;
      if(!singin){
        logid = this.props.logIn.id;
      }else{
        logid =singin.id
      }
      for(let i=0;i<ups.length;i++){
        if(ups[i]==logid){
          debugger;
          return " on"
        }
      }
      return ''
    }
    /**
     * 点赞**/
    this.agree=(endData,id,loginname) =>{
        var {singin} = this.props.state,logid,renewId = this.props.params.id,agrree=false;
      if(!singin){
         logid = this.props.logIn.id;
      }else{
        logid =singin.id
      }
      var self = this.props.logIn,accesstoken ;
      if(self){
        if(self.accesstoken){
          accesstoken=self.accesstoken
        }else {
          accesstoken=this.props.state.singin.accesstoken
        }
        if(!accesstoken){
          this.props.router.push({
            pathname: '/singin'
          });
        }
        if(self.loginname == loginname){
          return alert('您不能给自己点赞！')
        }else if(!self) {
          alert('请登录！')
        }
      }else {
        return this.props.router.push({
          pathname: '/singin'
        });
      }

      Tools.post(`reply/${id}/ups`, { accesstoken }, (data) => {

      });

      /**
       * 刷新页面*/
      Tools.get(`topic/${renewId}`, {}, (data) => {
        this.props.actions('Topic',data.data);
      }, () => {
        this.state = { button: '刷新失败，请手动刷新' }
      });
    };
  }
  render(){

    var {state,onClick,logIn} =this.props,listId=1,data = state.Topic.replies;
    var CreateHtml = (data) =>{
      return {
        __html: data
      }
    };
    var {singin} = this.props.state,logid,renewId = this.props.params.id,agrree=false;
    if(!singin){
      logid = this.props.logIn.id;
    }else{
      logid =singin.id
    };

    var showRepaly = (replay)=>{
      if(logIn){
        var {className}=this.refs[replay];
        if(className == 'hidden-replay'){
          this.refs[replay].className='hidden-replay on'
        }else {
          this.refs[replay].className = 'hidden-replay'
        }
      }
    }
    return(
      <div>
        <ul >
          {data ? data.map(t=>(<li key={t.id}>
            <div className="user">
              <Link className="user" to={`/user/${t.author.loginname}`}><UserIcon state={t.author} /></Link>
              <div className="user-info">
                <p>  <span className="visit">#{listId++}</span>
                  <UerName state={t.author} style={{color: "rgb(100, 181, 4)",fontSize:" 1.2em"}}/>
                </p>
                <div dangerouslySetInnerHTML={CreateHtml(t.content)}/>
                <div className="agree">
                  <div className={"iconfont ag" +this.checkAg(t.ups)} onClick={()=>{this.agree(t.ups,t.id,t.author.loginname)}} ></div>{t.ups.length}
                  {logIn ? <div className="iconfont rep" onClick={()=>{showRepaly(t.id)}} ></div> : <Link to="/singin">
                    <div className="iconfont rep"></div>
                  </Link>}
                </div>
              </div>
            </div>

            <div ref={t.id} className="hidden-replay">
                <ReplayForm actions={this.props.actions} state={this.props.state} loginname={t.author.loginname} userId={state.Topic.id} replayId={t.id} />
            </div>
          </li>)) : ''}
        </ul>
      </div>

    )
  }
}
