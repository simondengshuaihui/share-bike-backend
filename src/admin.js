import React from 'react'
import {Row,Col} from 'antd'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Navlist from './components/navlist/navlist'
import Home from './pages/home'
import './style/common.less'

export default class Admin extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Row className="container">
                <Col span="3" className="nav-left">
                    <Navlist></Navlist>
                </Col>
                <Col span="21" className="main">
                    <Header></Header>
                    <Row className="content">
                        <Home></Home>
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}