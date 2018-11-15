import React from "react";
import { Card, Button, Icon } from "antd";
import "./ui.less";

const ButtonGrop = Button.Group;
export default class Buttons extends React.Component {
  state = {};
  handleClick = () => {
    this.setState({
      loading: true
    });
  };

  render() {
    return (
      <div>
        <Card title="普通按钮">
          <Button type="primary">button</Button>
          <Button type="default">button</Button>
          <Button type="ghost">button</Button>
          <Button type="dashed">button</Button>
        </Card>
        <Card title="图标按钮">
          <Button type="primary" icon="search" shape="circle" />
          <Button type="primary" icon="search">
            button
          </Button>
          <Button type="ghost">button</Button>
          <Button type="dashed">button</Button>
        </Card>
        <Card title="加载按钮">
          <Button type="primary" loading="true">
            加载
          </Button>
          <Button
            type="primary"
            icon="poweroff"
            onClick={this.handleClick}
            loading={this.state.loading}
          >
            加载
          </Button>
        </Card>
        <Card title="按钮组" className="no-margin">
          <ButtonGrop>
            <Button>L</Button>
            <Button>M</Button>
            <Button>R</Button>
          </ButtonGrop>
          <ButtonGrop>
            <Button type="primary">
              <Icon type="left" />
              Go back
            </Button>
            <Button type="primary">
              Go forward
              <Icon type="right" />
            </Button>
          </ButtonGrop>
        </Card>
      </div>
    );
  }
}
