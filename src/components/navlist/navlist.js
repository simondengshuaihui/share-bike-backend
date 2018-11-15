import React from "react";
import { Menu, Icon } from "antd";
import "./navlist.less";
import logo from "./logo-ant.svg";
import menuConfig from "../../config/menuConfig";
import MenuItem from "antd/lib/menu/MenuItem";
import { NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class Navlist extends React.Component {
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
  render() {
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="" />
          <h2>backend M</h2>
        </div>
        <Menu theme="dark">{this.state.meanTreeNode}</Menu>
      </div>
    );
  }
}
