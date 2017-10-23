import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import Index from '../views/Index';
import Detail from '../views/Detail';
import Table from '../views/Table';
import Form from '../views/Form';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LayOut extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="desktop" /><span>功能</span></span>}
            >
              <Menu.Item key="1"><Link to='/'>展示</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/table'>表格</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/form'>表单</Link></Menu.Item>
              {/* <Menu.Item key="3"><Link>rudex</Link></Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="appstore" /><span>其他</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Route exact path='/' component={Index} />
            <Route exact path='/table' component={Table} />
            <Route exact path='/form' component={Form} />
            <Route exact path='/detail' component={Detail} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Joki ©2017
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayOut;