import React, {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends Component {
  state = {
    editing: false,
    value: this.props.label,
    date: new Date()
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      const {toggleEditing} = this.props
      toggleEditing(this.state.value)
      this.setState({editing: false})
    }
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }

  startEditing = () => {
    this.setState({editing: true})
  }

  render() {
    const {label, completed, deleteItem, toggleCompleted} = this.props
    const {editing, value, date} = this.state
    const timeElapsed = formatDistanceToNow(date, {includeSeconds: true, locale: KG, addSuffix: true})

    if (editing) {
      return (
      <input className='edit' 
      type='text' 
      value={value}
      onKeyDown={this.keyDown}
      onChange={this.handleInputChange}/>
      )
    }

    return (
      <li className={completed ? 'completed' : editing ? 'editing' : null}>
        <div className='view'>
          <input className='toggle'
          type='checkbox'
          checked={completed}
          onChange={toggleCompleted}/>

          <label>
            <span className='description'
            onClick={toggleCompleted}>{value || label}</span>
            <span className='created'>{`created ${timeElapsed}`}</span>
          </label>

          <button className='icon icon-edit'
          onClick={this.startEditing}></button>

          <button className='icon icon-destroy'
          onClick={deleteItem}></button>
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  label: '',
  completed: false,
  deleteItem: () => {},
  toggleCompleted: () => {},
  toggleEditing: () => {}
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired
}