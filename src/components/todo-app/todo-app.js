import React, {Component} from 'react'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import './todo-app.css'

export default class TodoApp extends Component {
  state = {
    todos: [],
    filter: 'All'
  }

  createItem = (label) => {
    return {
      id: this.state.todos.length + 1,
      completed: false,
      label
    }
  }

  addItem = (text) => {
    this.setState(({todos}) => ({todos: [...todos, this.createItem(text)]}))
  }

  deleteItem = (ident) => {
    this.setState(({todos}) => ({todos: todos.filter(({id}) => id !== ident)}))
  }

  toggleProperty = (id, name, value) => {
    this.setState(({todos}) => ({
      todos: todos.map(element => 
        element.id === id ? {...element, [name]: value} : element
      )
    }))
  }

  toggleCompleted = (id) => {
    this.toggleProperty(
      id, 'completed', !this.state.todos.find(item => item.id === id).completed
    )
  }

  toggleEditing = (id, text) => {
    this.toggleProperty(id, 'label', text)
  }

  clearCompleted = () => {
    this.setState(({todos}) => ({todos: todos.filter(element => !element.completed)}))
  }

  filterItems() {
    const {todos, filter} = this.state
    return todos.filter(({completed}) => (
      filter === 'All' || (filter === 'Completed' ? completed : ! completed)
    ))
  }

  filterChange = (data) => {
    this.setState({filter: data})
  }

  render() {
    return (
      <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm addItem={this.addItem}/>
      </header>

      <section className='main'>
        <TaskList
        todos={this.filterItems()}
        deleteItem={this.deleteItem}
        toggleEditing={this.toggleEditing}
        toggleCompleted={this.toggleCompleted}/>

        <Footer
        itemsLeft={this.state.todos.filter(({completed}) => !completed).length}
        clearCompleted={this.clearCompleted}
        filterChange={this.filterChange}
        filter={this.state.filter}/>
      </section>
    </section>
    )
  }
}