import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Aritra's To-Do List Maker";
  todos = [{
    label: "Pay your bills",
    done: true
  }];

  addTodo(todoLabel) {
    if (todoLabel === "")
      return;
    this.todos.push({
      label: todoLabel,
      done: false
    });
  }
  
  deleteTodo(todo) {
    this.todos = this.todos.filter( t => t.label !== todo.label);
  }
}
