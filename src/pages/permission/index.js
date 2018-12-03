import React from "react";
import { Form, Button, Select, Modal, Card, Input, Tree, Transfer } from "antd";
import ETable from "../../components/etable";
import axios from "../../axios/axios";
import utils from "../../util/util";
import menuConfig from "../../config/menuConfig";

const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

export default class Permission extends React.Component {
  state = {};

  params = {
    page: 1
  };

  componentWillMount() {
    this.requestList();
  }

  requestList = () => {
    axios
      .ajax({
        url: "/role/list",
        data: this.params
      })
      .then(res => {
        this.setState({
          list: res.result.list.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: utils.pagination(res, current => {
            this.params.page = current;
            this.requestList();
          })
        });
      });
  };

  getRoleUserList = id => {
    axios
      .ajax({
        url: "/role/user_list",
        data: { params: { id: id } }
      })
      .then(res => {
        if (res) {
          this.getAuthUserList(res.result);
        }
      });
  };
  //   筛选用户
  getAuthUserList = dataSource => {
    const mockData = [];
    const targetKeys = [];
    // console.log('数据',data)
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        if (data.status == 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
    }
    this.setState({
      mockData,
      targetKeys
    });
  };

  handleRole = type => {
    this.setState({
      isRoleVisible: true
    });
  };
  handlePermission = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一个角色"
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: this.state.selectedItem
    });
    let menuList = this.state.selectedItem.menus;
    this.setState({
      menuInfo: menuList
    });
  };
  handleUserAuth = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一个角色"
      });
      return;
    }
    // 通过用户id获取当前用户的权限信息
    this.getRoleUserList(this.state.selectedItem.id);
    this.setState({
      isUserVisible: true,
      detailInfo: this.state.selectedItem
    });
  };

  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: "role/create",
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res) {
          this.setState({
            isRoleVisible: false
          });
          this.requestList();
        }
      });
  };

  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;

    axios
      .ajax({
        url: "/permission/edit",
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res) {
          this.setState({
            isPermVisible: false
          });
          this.requestList();
        }
      });
  };

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys || [];
    data.role_id = this.state.selectedItem.id;
    axios
      .ajax({
        url: "/role/user_role_edit",
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res) {
          this.setState({
            isUserVisible: false
          });
          this.requestList();
        }
      });
  };

  render() {
    console.log(this.state.list);

    const columns = [
      {
        title: "角色ID",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time"
        // render: utils.formateDate
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          if (status == 1) {
            return "启用";
          } else {
            return "停用";
          }
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time"
        // render: utils.formateDate
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name"
      }
    ];
    return (
      <div>
        <Card title="授权列表">
          <Button type="primary" icon="plus" onClick={this.handleRole}>
            创建角色
          </Button>
          <Button type="primary" icon="edit" onClick={this.handlePermission}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
          <div className="content-wrap" style={{ marginTop: 10 }}>
            <ETable
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
              updateSelectedItem={utils.updateSelectedItem.bind(this)}
              selectedRowKeys={this.state.selectedRowKeys}
            />
          </div>
        </Card>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          width={800}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible: false
            });
          }}
        >
          <RoleForm wrappedComponentRef={inst => (this.roleForm = inst)} />
        </Modal>
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}
        >
          <PermEditForm
            wrappedComponentRef={inst => (this.permForm = inst)}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo || []}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            });
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={targetKeys => {
              this.setState({
                targetKeys: targetKeys
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}

class RoleForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name", { initialValue: "" })(
            <Input type="text" placeholder="请输入角色名称" />
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("state", { initialValue: 1 })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
RoleForm = Form.create({})(RoleForm);

class PermEditForm extends React.Component {
  state = {};

  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys);
  };
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode {...item} />;
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name", { initialValue: "" })(
            <Input disabled type="text" placeholder={detail_info.role_name} />
          )}
        </FormItem>
        <FormItem label="状态:" {...formItemLayout}>
          {getFieldDecorator("state", { initialValue: "1" })(
            <Select>
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => this.onCheck(checkedKeys)}
          checkedKeys={menuInfo || []}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}
PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends React.Component {
  state = {};

  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = targetKeys => {
    this.props.patchUserInfo(targetKeys);
  };
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = targetKeys => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };

    const detail_info = this.props.detailInfo;
    // const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name", { initialValue: "" })(
            <Input disabled type="text" placeholder={detail_info.role_name} />
          )}
        </FormItem>
        <FormItem label="选择用户:" {...formItemLayout}>
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            dataSource={this.props.mockData}
            showSearch
            titles={["待选用户", "已选用户"]}
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
