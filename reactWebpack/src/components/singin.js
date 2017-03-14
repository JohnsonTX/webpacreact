/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import  {actions} from '../actions/index';
import {Tools} from '../Mytool';
var code;
class SingIn extends React.Component {

  constructor(props){
    super(props);
    this.state={
      loginStatus:'登录',
      count: 60,
      liked: true,
      code:''
    };
    this.createCode = ()=>{
      code = "";
      var codeLength = 4;//验证码的长度
      var checkCode = document.getElementById("code");
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z');//随机数
      for(var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
      }
      checkCode.value = code;//把code值赋给验证码
    };

    this.validate=()=>{
      var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写
      if(inputCode.length <= 0) { //若输入的验证码长度为0
         alert("请输入验证码！"); //则弹出请输入验证码
        return false;
      }
      else if(inputCode != code ) {//若输入的验证码与产生的验证码不一致时
        alert("验证码输入错误!"); //则弹出验证码输入错误
        this.createCode();//刷新验证码
        document.getElementById("input").value = "";//清空文本框
        return false;
      }
      return true;
    };
    this.singin=()=>{
      var accesstoken = this.refs.accessToken.value;
        /**
         * 重发发送验证
         */
      // if(this.state.liked){
      //   this.timer = setInterval(function () {
      //     var count = this.state.count;
      //     this.state.liked = false;
      //     count -= 1;
      //     if (count < 1) {
      //       this.setState({
      //         liked: true
      //       });
      //       count = 60;
      //     }
      //     this.setState({
      //       count: count
      //     });
      //   }.bind(this), 1000);
      // };


      if(!accesstoken) return alert('您有信息未填写');
      if(!this.validate()){return}
      this.setState({ loginStatus: '登录中...' });

      Tools.post('accesstoken',{accesstoken},(data)=>{
        if(data.success){
          alert("登录成功");
          Tools.get('message/count',{accesstoken},(gdata)=>{
            var sendData = Object.assign({},data,{accesstoken:accesstoken,messageCount:gdata.data})
            Tools.localItem("User",JSON.stringify(sendData));
          })
          this.props.login("logIn",data);
          this.props.router.push({
            pathname: '/user/' + data.loginname
          });
        }
      },()=>{
        this.setState({ loginStatus: '登录' });
        console.log('登录失败')
      })

    }
  }
  render (){

    return(
      <div>
        <section>
          <article>
            <div  className="goBack" >
              <div  onClick={this.props.router.goBack}>
                <i className="iconfont">&#xe633;</i>登录
              </div>
            </div>
            <form action="" className="singIn">
              <p style={{color: '#b7b7b7'}}>-11b58a50-e8c6-4d10-b2f6-5c88358f8a12-</p>
              <input ref="accessToken" type="text" placeholder="请填写登录码"/>
              <div className="proof">
                <input type = "text" id = "input" maxLength="4" placeholder="请填写验证码"/>
                <input type = "button"  id="code"  onClick={()=>{this.createCode()}}/>
              </div>

              <button type="button" onClick={()=>{this.singin()}}>{this.state.loginStatus}</button>
            </form>
          </article>
        </section>
      </div>
    )
  }
  componentDidMount(){
    this.createCode();
    document.getElementById('loading').style.display = 'none';
  }
}
const userName = (state)=>{
     return {userName:state.login}
};
const login=(dispatch)=>{
    return {login:(action,data)=>dispatch(actions(action,data))}
}
export default  SingIn = connect(userName,login)(SingIn)
