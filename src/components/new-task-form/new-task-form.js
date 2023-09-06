import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: ''
  }

  labelChange = (event) => {
    this.setState({label: event.target.value})
  }

  addTask = (event) => {
    event.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({label: ''})
  }

  render() {
    return (
      <form
      onSubmit={this.addTask}>
        <input className='new-todo'
        placeholder='What needs to be done?'
        onChange={this.labelChange}
        value={this.state.label}
        autoFocus/>
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {}
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired
}