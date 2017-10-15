import React from 'react'

const Input = (props) => {
  const onInputChange = (event) => {
    props.inputChange(event.target.value)
  }

  const onInputSubmit = (event) => {
    event.preventDefault()
    console.log(props.newTodo)
    if (props.newTodo.replace(/\s+/,'') === '') {
      alert('事件内容不能为空')
      props.inputChange('')
    } else {
      props.inputSubmit()
    }
  }

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="panel-body">
          <form>
            <div className="input-group">
              <input type="text" className="form-control" id="listItemInput" placeholder="Add new todo" value={props.newTodo} onChange={onInputChange}/>
              <span className="input-group-btn">
                <button className="btn btn-primary" onClick={onInputSubmit}>Add Item</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Input