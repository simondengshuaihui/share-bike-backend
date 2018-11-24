import React from "react";
import {Route} from 'react-router-dom'
import OrderDetail from './pages/order/detail'
import {Row } from 'antd'
import Header from './components/header/header'

export default class Common extends React.Component {
  render() {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="second" menuName="订单页"/>
        </Row>
        <Row className="content">
            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
        </Row>
      </div>
    );
  }
}
