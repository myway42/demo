import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {active: true}
  }

  changeActive = () => {
    this.setState((prevState) => ({active: !prevState.active}))
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="page-header">
            <h1>My Todo App</h1>
          </div>
          <ul className="nav nav-pills">
            <li role="presentation" className={this.state.active?'active':''} onClick={this.changeActive}><Link to='/'>首页</Link></li>
            <li role="presentation" className={this.state.active?'':'active'} onClick={this.changeActive}><Link to='/list'>事件列表页</Link></li>
            <li role="presentation" className="disabled pull-right"><a>事件总数: {this.props.list.length||0}</a></li>
          </ul>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    list: state.reducer.list
  }
}

export default connect(
  mapStateToProps
)(TodoApp)