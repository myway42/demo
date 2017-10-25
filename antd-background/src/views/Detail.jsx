import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import DetailPage from '../components/DetailPage';
import { Link } from 'react-router-dom';

/**
 * 详细页: 通过路由传参获取具体个人信息并展示
 * 注意点: 路由的location需要通过属性传递给子组件,否则子组件无法获取
 */

const { Content } = Layout;

const Detail = (props) => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
    <Breadcrumb.Item><Link to='/'>返回主页</Link></Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', minHeight: 360, paddingTop: '40px' }}>
      <DetailPage location={props.location}/>
    </div>
  </Content>
)

export default Detail;