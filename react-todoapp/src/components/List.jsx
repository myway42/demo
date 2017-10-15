import React from 'react'

const List = (props) => {
  const list = props.listItems.map((el, i) => (
                <li className="list-group-item" key={i}>
                  <span style={
                      el.done ? {textDecoration: 'line-through'}
                      : {textDecoration: 'none'}
                    }
                    onClick={props.itemClick.bind(null, i)}
                    >{el.item}</span>
                  <button type="button" className="btn btn-danger btn-sm pull-right" style={{marginTop: '-5px'}} onClick={()=>props.itemDelete(i)}>删除</button>
                </li>
              ))

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="panel-body">
          <ul className="list-group">
            {
              list
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default List