import React, { Component } from "react";
import "./App.css";
import Admin from "./admin";
import Common from "./common";
import { Route, Switch } from "react-router-dom";

const Login = () => {
  return <div>login登录页</div>;
};
const Detail = () => {
  return <div>Detail详情页</div>;
};
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/common" component={Common} />
          <Route path="/detail" component={Detail} />
        </Switch>
      </div>
    );
  }
}

export default App;
