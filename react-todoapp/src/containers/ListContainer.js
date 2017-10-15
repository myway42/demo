import { connect } from 'react-redux'
import List from '../components/List'
import { itemClick, itemDelete } from '../redux/action'

function mapStateToProps(state) {
  return {
    listItems: state.reducer.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    itemClick: (i) => dispatch(itemClick(i)),
    itemDelete: (i) => dispatch(itemDelete(i))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)