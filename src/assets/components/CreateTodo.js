import React, { useState } from "react";
import TodoList from "./TodoList";
import swal from "sweetalert";

function CreateTodo() {
  const [todo, setTodo] = useState({ title: "", done: false });
  const [todoArr, setTodoArr] = useState([]);

  let todos = localStorage.hasOwnProperty("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  const onChange = (event) => {
    let { value } = event.target;
    let obj = {};
    obj["title"] = value;
    obj["done"] = false;
    setTodo(obj);
  };

  const CreateTodo = (event) => {
    const { name } = event.target;
    if (event.key === "Enter" || name === "addTodo") {
      if (todo.title !== "") {
        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodo({ title: "", done: false });
      } else {
        alert("Oops write todo first");
      }
    }
  };

  const completeTodo = (i) => {
    if (todos[i]["done"] !== true) {
      todos[i]["done"] = true;
      localStorage.setItem("todos", JSON.stringify(todos));
      setTodoArr(todos);
      alert("work completed!");
    }
  };

  const deleteTodo = (i) => {
    alert("work deleted");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file",
      icon: "warning",
      buttons: true,
    }).then((res) => {
      if (res) {
        todos.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodoArr(todos);
      }
    });
  };

  return (
    <>
      <div className="box">
        <div className="text-end">
          <h2>React Todo App</h2>
          <h4>Add a new Todo</h4>
        </div>
        <div className="text-addTodo">
          <input
            type="text"
            name="todo"
            placeholder="Write here.."
            value={todo.title}
            onKeyPress={CreateTodo}
            onChange={onChange}
          />
          <button
            className="btn-addTodo"
            type="button"
            name="addTodo"
            onClick={CreateTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
      <TodoList
        todoArr={todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default CreateTodo;
