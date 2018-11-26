import React from "react";
import { Menu, Icon } from "antd";
import "./navlist.less";
import logo from "./logo-ant.svg";
import menuConfig from "../../config/menuConfig";
import MenuItem from "antd/lib/menu/MenuItem";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeMenuTitle } from "../../redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Navlist extends React.Component {
  state = { currentKey:'' };
  // 渲染导航菜单
  componentWillMount() {
    const meanTreeNode = this.renderMenu(menuConfig);

    this.setState({ meanTreeNode });
  }
  renderMenu(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {/* 递归调用 */}
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </MenuItem>
      );
    });
  }

  handleClick = ({item,key}) => {
    if (key == this.state.currentKey) {
      return false;
    }
    console.log('999',item.props.children.props.children)
    this.props.changeMenuTitle(item.props.children.props.children);
    this.setState({
      currentKey: item.props.children.props.children
    });
  };
  homeHandleClick=()=>{
    this.props.changeMenuTitle('首页')
    this.setState({
      currentKey:''
    })
  }
  render() {
    return (
      <div>
        <NavLink to="/admin/home" onClick={this.homeHandleClick}>
          <div className="logo">
            <img src={logo} alt="" />
            <h2>backend M</h2>
          </div>
        </NavLink>
        <Menu theme="dark" onClick={this.handleClick}>
          {this.state.meanTreeNode}
        </Menu>
      </div>
    );
  }
}
const mapDispatchToProps=dispatch=>{
  return {changeMenuTitle:(key)=>{dispatch(changeMenuTitle(key))}}
}
export default connect(
  state => state,
  {changeMenuTitle}
)(Navlist);
