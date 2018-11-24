import React, { Component } from 'react';
import './App.css';
import Admin from './admin'
import Common from './common'
import {Route} from 'react-router-dom'

const Login =()=>{
  return <div>login登录页</div>
}
const Detail =()=>{
  return <div>Detail详情页</div>
}
class App extends Component {
  render() {
    return (
     <div>
       <Route path='/login' component={Login}></Route>
       <Route path='/admin' component={Admin}></Route>
       <Route path='/common' component={Common}></Route>
       <Route path='/detail' component={Detail}></Route>
     </div>
    );
  }
}

export default App;
