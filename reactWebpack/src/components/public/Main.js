/**
 * Created by johnsontx on 2017/1/12.
 */
import {Tools} from '../../Mytool';
import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import  {actions} from '../../actions/index';
import {NaveBottom} from './base';
import '../../styles/base.css';
/**
 * 模块入口方法
 *
 * @param {Object} mySeting
 * @returns
 */
var pnum=1,repeatData={},cpnum,scrollCent={},wlocation=location,cpath;
const Mains = (mySetting) => {
  var setting = {
    id: '', //应用唯一id表示
    type: 'GET', //请求类型
    url: '', //请求地址
    data: null, //发送给服务器的数据
    component: <div></div>, //数据回调给的组件
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state; } //请求失败后执行的方法
  };
  var sendData;
  /**
   * 覆盖默认设置
   */
  for (let key in mySetting) {
    setting[key] = mySetting[key];
  }

  /**
   * 组件入口
   *
   * @class Index
   * @extends {Component}
   */
  class Index extends Component {

    constructor(props) {
      super(props);
      /**
       * 初始化状态
       *
       * @param {Object} props
       */
      this.initState = (props,states) => {
        var {state, location} = props;
        var {pathname, search} = location;
        this.path = pathname + search;
      }
      this.state={scrollT:scrollCent};
      /**
       * DOM初始化完成后执行回调
       */
       this.readyDom = (data)=>{
         var {actions} = this.props.state,url=this.getUrl(data),parms=this.sendData(data,pnum),cparms = pnum,
           {pathname,search}=this.props.location,slocation=wlocation.href;
           try{
             /**已经存在不再发送请求**/
                 if(slocation === repeatData[setting.id] && cparms === cpnum || !this.stop()){

                   window.scrollTo(0,scrollCent[setting.id]);
                   document.getElementById('loading').style.display = 'none';
                   return;
                 }
                 if(cparms==cpnum && !parms.mdrender){
                  actions[setting.id]=[];
                 }
                 /**获取数据**/
                 Tools.get(url,parms,(data)=>{
                   repeatData[setting.id] = slocation;
                   cpath = url;
                   cpnum = cparms;
                   this.props.getDate(setting.id,data.data)
                 });
             if(parms.mdrender ==true ){
               window.scrollTo(0,0);
             }
           }catch (e){
             console.log('error: ',e)
           }
       };
      /**
       * 当列表条数太少时
       */
      this.scrollFunc =  ()=> {
        var _init = this,{scrollSend,backTop} =_init.props.setting.data,again=true;
        if(again){
            _init.readyDom();
          again = false;
        }
        function handle(delta) {
          var inH=window.innerHeight,scrTop=document.body.scrollTop,clH = document.body.clientHeight;
          if(scrTop > 200 ){
            _init.refs.backTop.style.display = 'block';
          }else {
            _init.refs.backTop.style.display = 'none';
          }
          if (delta<0) //小于向下大于向上

          if(pnum==1 && clH<inH && scrollSend !=false){
            debugger;
            pnum++;
            _init.readyDom();
            if(window.removeEventListener){
              window.removeEventListener('DOMMouseScroll',wheel, false);
            }
          }else  {

              window.onscroll = (e)=>{
                inH=window.innerHeight,scrTop=document.body.scrollTop,clH = document.body.clientHeight
                again = true;



                if(scrollSend !=false){
                if(clH - inH == scrTop && again){
                  document.getElementById('loading').style.display = 'block';
                  again =false;
                  pnum++;
                  _init.readyDom();


                }
              }
            }
          }
        }

        function wheel(event){
          var delta = 0;
          if (!event) event = window.event;
          if (event.wheelDelta) {
            delta = event.wheelDelta/120;
            if (window.opera) delta = -delta;
          } else if (event.detail) {
            delta = -event.detail/3;
          }
          if (delta)
            handle(delta);
        }
        if(pnum==1){
          if (window.addEventListener)
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
      };




      // /**
      //  * 请求开始
      //  */
      this.loading = true;
      // this.start = () => {
      //   this.state.loadAnimation = true;
      //   this.state.loadMsg = '正在加载中...';
      //   this.props.state(this.state);
      // }
      // /**
      //  * 下一页加载成功
      //  *
      //  * @param {Object} res
      //  */
      //
      //
      // /**
      //  * 请求失败时
      //  */
      // this.error = () => {
      //   this.state.loadAnimation = false;
      //   this.state.loadMsg = '加载失败';
      //   this.props.setState(this.state);
      // }
      /**
       * 停止加载*/
      this.stop=()=>{
        if(setting.data.stop){
          return setting.data.stop(this.props);
        }
        return true;
      }

      /**
       * url更改时
       */
      this.unmount = (pnum,_ID) => {
        var _this=this,rmbsc = this.props.setting.id;
        if(document.getElementById('loading')){
          document.getElementById('loading').style.display = 'block';
        }
        if(pnum){
          this.props.state.actions.Topics = [];
        }
          scrollCent[rmbsc] =window.scrollY;
        this.loading = true;
      };

      /**
       * 获取ajax 请求url
       *
       * @returns Object
       */
      this.getUrl = () => {
        var {url} = this.props.setting,{id,loginname}=this.props.params;
        if(id){
          return url + id
        }
        if(typeof url =='function' ){
          return url(this.props);
        }

        if(loginname) return url + loginname;
        return url;
      }

      /**
       * 获取要发送给服务器的数据
       *
       * @returns
       */
      this.sendData = (data,pnum=1) => {
        var parms={page: pnum,  limit: 5, mdrender: false},params =this.props.params,endData=this.props.setting.data;
        if(params.id){
          return {mdrender:true}
        }else if(JSON.stringify(params).length > 2){
          return {mdrender:false}
        }
        if(endData.params){
          return Object.assign({},endData.params(this.props),{mdrender:false})
        }
        if(data){return Object.assign({},data.location.query,parms)}
          return Object.assign({},this.props.location.query,parms);
      };

      this.initState(this.props);
    }
    render() {
     let {loading,load}=this.props.state.actions,ztop;

      /****返回top**/
     var  backTop = ()=>{
       var toptime=setInterval(()=>{
         var top = document.body.scrollTop,speed = document.body.clientHeight / window.innerHeight;
          ztop=top-(20 * speed);
         window.scrollTo(ztop,ztop);
         if(ztop <= 0){
           clearInterval(toptime)
         }
       }, 10)
      };
      return (

        <div>
          <div id='scroll' ref='scroll'>
            <div  className="goBack" style={load ? {display:'block'} : {display:"none"}}>
              <div  >
                <i onClick={this.props.router.goBack}  className="iconfont">&#xe633;</i>详情
              </div>
            </div>
            <div className="fill" ></div>
          <this.props.setting.component {...this.props} state={this.props.state.actions} />
            <div id="backTop" ref="backTop">
              <i  className="iconfont backTop" onClick={backTop}></i>
            </div>
          </div>
          <NaveBottom state={this.props}  />
        </div>
      );
    }
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */

    componentWillMount() {

    }
    componentDidMount() {
      this.scrollFunc()

    }
    shouldComponentUpdate(np) {
      var {actions} = np.state,rmbsc=this.props.setting.id;
            return actions[rmbsc] != undefined;
    }
    /**
     * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
     */
    componentWillReceiveProps(np) {
      var {location,params} = np;
      var {pathname, search} = location;
      var path = pathname + search;
      if (this.path !== path) {
        pnum=1;
        this.unmount(pnum,params.id);
        this.readyDom(np);
      }
      this.initState(np);
    }

    /**
     * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
     * 使用该方法可以在组件更新之后操作 DOM 元素。
     */
    componentDidUpdate() {

      if(document.getElementById('loading') && !this.props.state.actions.loading){
        document.getElementById('loading').style.display = 'none';
      }else {
        document.getElementById('loading').style.display = 'block';
      }
    }
    /**
     * 在组件从 DOM 中移除的时候立刻被调用。
     * 在该方法中执行任何必要的清理，比如无效的定时器，
     * 或者清除在 componentDidMount 中创建的 DOM 元素
     */
    componentWillUnmount() {
       //地址栏已经发生改变，做一些卸载前的处理
      this.unmount();
    }
  }
  Index.defaultProps = {setting};
     const Action = (dispatch)=>{
       return {getDate:(action,data)=>{dispatch(actions(action,data))}}
     };
  return connect((state) => { return { state: state,user:state.user} },Action)(Index); //连接redux
};


export default Mains;
