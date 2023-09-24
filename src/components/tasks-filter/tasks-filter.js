import React, {Component} from 'react'
import {taskStatuses} from '../../constants'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  render() {
    const {filter, filterChange} = this.props

    const buttons = Object.values(taskStatuses).map((status) => (
      <button className={filter === status ? 'selected' : null}
      onClick={() => filterChange(status)}
      key={status}
      type='button'>{status}</button>
    ))

    return <ul className='filters'><li>{buttons}</li></ul>
  }
}

TasksFilter.defaultProps = {
  filter: 'All',
  filterChange: () => {}
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  filterChange: PropTypes.func.isRequired
}
