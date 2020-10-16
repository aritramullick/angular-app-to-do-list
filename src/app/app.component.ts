import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { particlesJS } from 'particles.js';
import { OnInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  todos = [];
  items: Observable<any[]>;
  reference;
  database;
  constructor(db: AngularFireDatabase) {
    this.reference = db.list('/');
    this.database = db;
    this.reference.snapshotChanges()
  .subscribe(values => {
    this.todos=[];
    values.forEach(value => {
      let obj = value.payload.val();
      this.todos.push( {
        label: obj.label,
        key: value.key.toString(),
        done: obj.done });
      // console.log(obj)
    })
  });
    // db.list('/').valueChanges().subscribe((value) => {
    //   this.todos = []
    //   value.forEach((ele) => {
    //     this.todos.push(ele);
    //   })
    //   console.log(this.todos);
    // })
  }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });// Called after the constructor and called  after the first ngOnChanges() 
 }
  
  title = "Reminders";

  public addTodo(todoLabel) {
    if (todoLabel === "")
      return;
    const itemsRef = this.reference;
    itemsRef.push({ label: todoLabel, done: false });
  }
  public doneTodo(todo) {
    this.database.object('/'+todo.key)
    .update({
      done: true
    });
  }
  
deleteTodo(todo) {
  this.database.object('/'+todo.key)
  .remove();
  }
}
