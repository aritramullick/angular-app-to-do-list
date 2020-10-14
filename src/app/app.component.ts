import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';


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
  item: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.item = db.object('/').valueChanges();
  }
  
  title = "first-angular-app";
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
