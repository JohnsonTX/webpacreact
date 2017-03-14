import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Information from '../components/information'; //首页
import Topic from '../components/topic'; //主题详情
import SingIn from '../components/singin'; //登陆
import User from '../components/user'; //个人中心
import Public from '../components/public'; //发表
import Massage from '../components/message'; //发表


/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
var history = browserHistory;
const RouteConfig = (
  <Router history={history}>
    <Route path="/" component={Roots}>
      <IndexRoute component={Information} />
      <Route path="topic/:id" component={Topic}/>
      <Route path="singin" component={SingIn}/>
      <Route path="public" component={Public}/>
      <Route path="message" component={Massage}/>
      <Route path="user/:loginname" component={User}/>
    </Route>
  </Router>
);

export default RouteConfig;
