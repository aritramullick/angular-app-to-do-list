import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  // template: `
  //   <li *ngFor="let item of items | async">
  //      {{ item | json }}
  //   </li>
  // `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos = [];
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    db.list('/').valueChanges().subscribe((value) => {
      value.forEach((ele) => {
        this.todos.push(ele);
      })
      console.log(this.todos);
    })

    // this.items.forEach((ele) => {
    //   this.todos.push(ele);
    //   console.log(ele);
    // });
  }
  
  title = "first-angular-app";

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
