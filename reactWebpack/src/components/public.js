/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {actions} from '../actions/index';
import {NaveBottom} from './public/base';
import {Tools} from '../Mytool';
class Public extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tab:'',
      title:'',
      content:'',
      accesstoken:'',
      showStyle:false,
    };
    this.show = ()=>{
      var {singin,logIn} = this.props.state;
      if(!singin && !logIn){this.props.router.push({
        pathname: '/singin'
      });}
      this.setState({showStyle:!this.state.showStyle})
    }

    this.send =()=>{

       var {tab,title,content} =this.refs;
        this.state={
          tab:tab.value,
          title:title.value,
          content:content.value,
          accesstoken:this.props.state.logIn.accesstoken || this.props.state.singin.accesstoken,
        };
      this.setState({showStyle:false})
      var {state} = this;

        if(!state.tab){
         return alert("请选择发表类型！！")
        }else if(state.title.length <10){
          return alert('标题字数请大于10！！')
        }else if(state.content.length<30){
          return alert('内容字数请大于30！！')
        }

      Tools.post('topics', state, (data) => {
        if (data.success) {
          this.props.router.push({
            pathname: '/topic/' + data.topic_id
          });
        }
      }, () => {
        alert('发表失败');
      });
    };
    this.list=(list,status)=>{
      this.setState({list:list,on:status});
    };
  }
  render (){
    var showStyle=this.state.showStyle,data={bottom:true},
      loginname=()=>{
        if( this.props.state.logIn){
          return this.props.state.logIn
        }
        return this.props.state.singin
      }
      ;
    return(
      <div>
        <section>
          <article>
            <div className="loading" style={showStyle ? {display:'block'} :  {display:'none'}}>
              <div className="confirm">
                <h2>请确认发表</h2>
                <div>
                  <span onClick={()=>this.show()}> <i  className="iconfont cancel"></i> &nbsp;取消&nbsp;&nbsp;&nbsp;</span>
                  <span onClick={()=>this.send()}> <i className="iconfont sure"></i>&nbsp;确定</span>
                </div>
              </div>
            </div>
            <div  className="goBack">
              <div>
                <i onClick={this.props.router.goBack}  className="iconfont">&#xe633;</i>
                  <i onClick={()=>this.show()} className="iconfont apply" ></i>
                发表主题
              </div>
            </div>
            <div className="fill"></div>
            {loginname() ?
              <div className="public">
                <div className="select-content">
                  <select name="" id="" ref='tab'>
                    <option value="">请选择发表类型</option>
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                  </select>
                </div>
                <div><input type="text" placeholder="请输入标题（大于10个字符）" ref="title"/></div>
                <div><textarea name="" id="" cols="30" rows="10" placeholder="请输入内容（大于30个字符）" ref="content"></textarea></div>
                <div className="public-button"> <button type="button" onClick={()=>this.show()}>发表</button></div>
              </div>
              :
               <div className="to-singIn"> 请点击 <Link to="/singin">登录</Link> 再发表主题!</div>
            }

            <NaveBottom state={data} message={this.props.state} />
          </article>
        </section>
      </div>
    )
  }
  componentWillReceiveProps(np){

  }
  componentDidMount(){
    document.getElementById('loading').style.display = 'none';
  }
}

const userName = (state)=>{
  return {state:state.actions}
};
const login=(dispatch)=>{
  return {login:(action,data)=>dispatch(actions(action,data))}
}
Public = connect(userName,login)(Public)
export  default Public;
