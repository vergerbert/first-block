import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../tasks-filter'
import './footer.css'

export default class Footer extends Component {
  render() {
    const {itemsLeft, clearCompleted, filterChange, filter} = this.props
    
    return (
      <footer className='footer'>
        <span className='todo-count'>{itemsLeft} items left</span>
        <TasksFilter
        filter={filter}
        filterChange={filterChange}/>
        <button className='clear-completed'
        type='button'
        onClick={clearCompleted}>Clear completed</button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  itemsLeft: 0,
  clearCompleted: () => {},
  filterChange: () => {},
  filter: 'All'
}

Footer.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired
}