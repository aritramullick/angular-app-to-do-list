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
  database;
  constructor(db: AngularFireDatabase) {
    this.reference = db.list('/');
    this.database = db;
    db.list('/').valueChanges().subscribe((value) => {
      this.todos = []
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
  this.reference.snapshotChanges()
  .subscribe(actions => {
    actions.forEach(action => {
      let obj = action.payload.val();
      console.log(obj)
      if (obj.label === todo.label) {
        this.reference.remove(action.key.toString());
      }
    })
  });
    // this.todos = this.todos.filter( t => t.label !== todo.label);
  }
}
