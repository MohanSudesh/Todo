import React, { Component } from "react";
import axios from "axios";

class Addtodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      priority: "",
      completed: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    // console.log(this.state.completed);
    // console.log(this.state.priority);
    // console.log(this.state.name);

    const newTodo = {
      name: this.state.name,
      priority: this.state.priority,
      completed: this.state.completed
    };
    axios.post("http://localhost:4000/todos/add", newTodo).then(res => {
      console.log(res.data);
    });

    this.setState({
      name: "",
      priority: "",
      completed: ""
    });
  };
  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { name, priority, completed } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h2>Add Task</h2>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Priority</label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={this.handleChange}
            >
              <option name="select_priority" priority="">
                Select Priority
              </option>
              <option name="low" priority="Low">
                Low
              </option>
              <option name="Medium" priority="Medium">
                Medium
              </option>
              <option name="High" priority="High">
                High
              </option>
            </select>
          </div>
          <div>
            <p>Is it completed?</p>
            <input
              type="radio"
              name="Completed"
              id="completed"
              value="true"
              checked={completed === "true"}
              onChange={this.handleChange}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="Completed"
              value="false"
              id="completed"
              checked={completed === "false"}
              onChange={this.handleChange}
            />
            <label>No</label>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Addtodo;
