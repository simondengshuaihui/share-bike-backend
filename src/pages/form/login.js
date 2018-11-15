import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";

const FormItem = Form.Item;

class FormLogin extends React.Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(
          `${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${
            userInfo.userPwd
          }`
        );
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.form);
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登录水平表单" style={{ marginTop: 10 }}>
          <FormItem wrapperCol={{ xs: 24, sm: 12 }}>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" },
                {
                  pattern: new RegExp("^\\w+$", "g"),
                  message: "用户名必须为字母或者数字"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem wrapperCol={{ xs: 24, sm: 12 }}>
            {getFieldDecorator("userPwd", {
              initialValue: "",
              rules: []
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem wrapperCol={{ xs: 24, sm: 12 }}>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a href="#">忘记密码</a>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </FormItem>
        </Card>
      </div>
    );
  }
}
// 封装formlogin导出高阶组件
export default Form.create()(FormLogin);
