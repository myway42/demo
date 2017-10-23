import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { connect } from 'react-redux'

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const IndexPage = (props) => {
  const list = props.userInfo.map((value, index) => (
    <Link to={{
      pathname: '/detail',
      state: { key: value.key }
    }} key={index}>
      <Card.Grid style={gridStyle}>{value.name}</Card.Grid>
    </Link>
  ))
  return (
    <Card title="姓名" noHovering>
      {list}
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
)(IndexPage)
