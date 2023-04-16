import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Todo } from '../interfaces/todo.interface';
import { BehaviorSubject, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosCollection!: AngularFirestoreCollection<Todo>;
  todosDocument!: AngularFirestoreDocument<Todo>;
  constructor(private afs: AngularFirestore) {
    this.todosCollection = this.afs.collection<Todo>('todos');
  }

  getTodosByUserAndStatus() {}

  addTodo(todo: Todo) {
    return from(this.todosCollection.add(todo));
  }

  updateTodo(todo: Todo) {
    this.todosDocument = this.afs.doc<Todo>(`todos/${todo.id}`);
    return from(this.todosDocument.update(todo));
  }

  deleteTodo(todo: Todo) {
    this.todosDocument = this.afs.doc<Todo>(`todos/${todo.id}`);
    return from(this.todosDocument.delete());
  }
}
