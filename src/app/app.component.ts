import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todos = [];
  items: Observable<any[]>;
  reference;
  constructor(db: AngularFireDatabase) {
    this.reference = db.list('/');
    db.list('/').valueChanges().subscribe((value) => {
      value.forEach((ele) => {
        this.todos.push(ele);
      })
      console.log(this.todos);
    })
  }
  
  title = "first-angular-app";

  addTodo(todoLabel) {
    if (todoLabel === "")
      return;
    const itemsRef = this.reference;
    itemsRef.push({ label: todoLabel });
  }
  
  deleteTodo(todo) {
// to get a key, check the Example app below
    // db.list('/', ref => ref.orderByChild('size').equalTo('large'))
    // this.reference.remove('');
    this.todos = this.todos.filter( t => t.label !== todo.label);
  }
}
