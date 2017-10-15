import { connect } from 'react-redux'
import Input from '../components/Input'
import { inputChange, inputSubmit } from '../redux/action'

function mapStateToProps(state) {
  return {
    newTodo: state.reducer.newTodo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputChange: (value) => dispatch(inputChange(value)),
    inputSubmit: () => dispatch(inputSubmit())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)