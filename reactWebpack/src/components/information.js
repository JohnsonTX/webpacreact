/**
 * Created by johnsontx on 2017/1/20.
 */2
import React from 'react';
import { Link } from 'react-router';
import Mains from './public/Main';
import {Imgicon} from './public/base';
import {Tools} from '../Mytool';

class Information extends React.Component {
  constructor(props){
    super(props);
    this.initState = (props) => {
      var {state, location} = props;
      console.log(state)
    };
    this.animate = ()=>{
      var nodes=this.refs.nav,headM,refs =this.refs,mbut = refs.button.style;
      if(nodes){
        for (let j=0;j <nodes.children.length;j++){
          nodes.children[j].className='';
        }
        for (let arr=1;arr< nodes.children.length;arr++){
          if(nodes.children[arr].children[0].search == location.search ){
            headM=nodes.children[arr].children[0].offsetLeft + "px";
            nodes.children[arr].className='add';
          }
          if(!location.search){
            nodes.children[0].className='add';
            headM = 0;
          }
        }
      }
      mbut.left =headM;
    };
  }

  render (){
    var data = this.props.state.Topics;



    return(
      <div>
        <div className="navBg">
          <div className="fixedNav">
            <div className="button" ref="button"></div>
            <ul className="nav" id="nav" ref="nav">
              <li >
                <Link to="/">
                  全部
                </Link>

              </li>
              <li>
                <Link to="/?tab=good">
                  精华
                </Link>
              </li>
              <li >
                <Link to="/?tab=share">
                   分享
                </Link>
              </li>
              <li>
                <Link to="/?tab=ask">
                   问答
                </Link>
              </li>
              <li >
                <Link to="/?tab=job">
                   招聘
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="main">
          <ul id="main">
            {data.map(t=>(
              <li key={t.id}>
                <Link to={"topic/" + t.id}>
                  <div className="itemList" >
                     <Imgicon state={t} />
                    <span>{t.title}</span>
                  </div>
                  <div className="user">
                    <i className="user-icon"  style={{background:'url(' + t.author.avatar_url + ') center',backgroundSize: 'cover'}}></i>
                    <div className="user-info">
                      <p>  <span className="visit">{t.reply_count} / {t.visit_count}-阅读</span>
                        <span className="user-name">{t.author.loginname}</span>
                      </p>
                      <p>  <span className="reply">{Tools.formatDate(t.create_at)}-创建</span>
                        <span className="create">回复：{Tools.formatDate(t.last_reply_at)}</span></p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    )
  }

  componentDidMount() {
    this.animate();
    var refs =this.refs,list = refs.nav.childNodes,mbut = refs.button.style,
      ofleft,_this=this,ipathnam=_this.props.location.pathname;
    mbut.height =list[0].clientHeight +'px' ;
    mbut.width =list[0].clientWidth +'px' ;

    window.onresize = function(){
      if(ipathnam !=location.pathname){return}
      mbut.height =list[0].clientHeight +'px' ;
      mbut.width =list[0].clientWidth +'px' ;
      var left=document.getElementById('nav').childNodes;
      left.forEach((value,index)=>{
        if(left[index].className == 'add'){
          ofleft = left[index].offsetLeft + "px";
        }
      });
      mbut.left = ofleft;
    };

  }
  componentWillReceiveProps(np){
    this.animate()

  }
}
export  default Mains(
  {
  id: 'Topics',  //应用关联使用的redux
  component: Information, //接收数据的组件入口
  url: 'topics',
  data: (props, state) => { //发送给服务器的数据
    return {
      tab: props.location.query.tab || 'all',
      state:state
    }
  },
  success: (state) => {return state; }, //请求成功后执行的方法
  error: (state) => { return state } //请求失败后执行的方法
});

