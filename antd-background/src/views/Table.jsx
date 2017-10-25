import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import TablePage from '../components/TablePage';

/**
 * 表格页: 以表格形式展示数据,可对其中各项进行排序,可按照区域进行筛选,可以删除数据
 */

const { Content } = Layout;

const Table = () => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>表格页</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', minHeight: 360, padding: '40px' }}>
      <TablePage />
    </div>
  </Content>
)

export default Table;