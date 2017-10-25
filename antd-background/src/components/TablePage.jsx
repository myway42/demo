import React from 'react';
import { Table, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import { itemDelete } from '../redux/action'

const TablePage = (props) => {

  const onItemDelete = (index) => {
    props.itemDelete(index)
  }

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  }, {
    title: '地址',
    dataIndex: 'ads',
    filters: [{
      text: '浙江',
      value: '浙江',
  }, {
      text: '江苏',
      value: '江苏',
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.ads.indexOf(value) === 0,
    sorter: (a, b) => a.ads.length - b.ads.length,
  }, {
    title: '手机号',
    dataIndex: 'phone',
    sorter: (a, b) => a.phone.length - b.phone.length,
  }, {
    title: '邮箱',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  }, {
    title: 'operation',
    dataIndex: 'operation',
    render: (text, record) => (
      <Popconfirm title="Sure to delete?" onConfirm={() => onItemDelete(record.key)}>
        <a href="">Delete</a>
      </Popconfirm>
    )
  }];

  return (
    <Table columns={columns} rowKey={record => record.key} dataSource={props.userInfo} />
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.reducer.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    itemDelete: (index) => dispatch(itemDelete(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePage)