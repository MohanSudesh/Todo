import React, { Component } from "react";
import axios from "axios";
export class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(res => {
        this.setState({
          todolist: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.todolist.map(todo => {
          return <div key={todo.name}>{todo.name}</div>;
        })}
      </div>
    );
  }
}

export default Todolist;
