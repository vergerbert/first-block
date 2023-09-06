import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Task from '../task/task'
import './task-list.css'

export default class TaskList extends Component {
  render() {
    const {todos, deleteItem, toggleEditing, toggleCompleted} = this.props

    const elements = todos.map(item => {
      const {id, ...items} = item

      return (
        <Task
        key={id} {...items}
        deleteItem={() => deleteItem(id)}
        toggleEditing={() => toggleEditing(id)}
        toggleCompleted={() => toggleCompleted(id)}/>
      )
    })

    return (
      <ul className='todo-list'>{elements}</ul>
    )
  }
}

TaskList.defaultProps = {
  todos: [],
  deleteItem: () => {},
  toggleEditing: () => {},
  toggleCompleted: () => {}
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired
}