import React from "react";
import { Row, Col } from "antd";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Navlist from "./components/navlist/navlist";
import Home from "./pages/home";
import "./style/common.less";
import { Route, Switch } from "react-router-dom";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loading";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/message";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gellery";
import Carousel from "./pages/ui/carousel";
import Login from './pages/form/login'
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HeightTable from './pages/table/heighTbale'
import City from './pages/city/index'
import Order from './pages/order/index'
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Bar from './pages/echart/bar'
import Pie from './pages/echart/pie'
import Line from './pages/echart/line'
import Rich from './pages/rich'

const NoMatch = () => <div>没有匹配的网页</div>;

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row className="container">
        <Col span="3" className="nav-left">
          <Navlist />
        </Col>
        <Col span="21" className="main">
          <Header />
          <Row className="content">
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/ui/buttons" component={Buttons} />
              <Route path="/admin/ui/modals" component={Modals} />
              <Route path="/admin/ui/loadings" component={Loadings} />
              <Route path="/admin/ui/notification" component={Notice} />
              <Route path="/admin/ui/messages" component={Messages} />
              <Route path="/admin/ui/tabs" component={Tabs} />
              <Route path="/admin/ui/gallery" component={Gallery} />
              <Route path="/admin/ui/carousel" component={Carousel} />
              <Route path="/admin/form/login" component={Login} />
              <Route path="/admin/form/reg" component={Register} />
              <Route path="/admin/table/basic" component={BasicTable} />
              <Route path="/admin/table/high" component={HeightTable} />
              <Route path="/admin/city" component={City} />
              <Route path="/admin/order" component={Order} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/bikeMap" component={BikeMap} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/rich" component={Rich} />
              <Route component={NoMatch} />
            </Switch>
          </Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}
