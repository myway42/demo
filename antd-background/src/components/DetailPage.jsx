import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

const DetailPage = (props) => {
  let key = props.location.state.key
  const user = props.userInfo.filter(value => value.key===key)[0]
  return (
    <Card title={user.name} style={{ width: 300, margin: 'auto'}}>
      <p style={{marginBottom: 30}}><span style={{marginRight: 10}}>地址 :</span>{user.ads}</p>
      <p style={{marginBottom: 30}}><span style={{marginRight: 10}}>手机 :</span>{user.phone}</p>
      <p><span style={{marginRight: 10}}>邮箱 :</span>{user.email}</p>
    </Card>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.reducer.userInfo
  }
}

export default connect(
  mapStateToProps
)(DetailPage)