import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ToastService } from 'src/app/core/services/toast.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '@angular/fire/auth';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  user?: string;
}

export type Status = 'todo' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todosCollection!: AngularFirestoreCollection<Todo>;
  todos!: Todo[];
  activeTodos!: Todo[];
  completedTodos!: Todo[];
  todoCount = 0;
  loading = false;
  user!: User;

  constructor(
    private afs: AngularFirestore,
    private toastService: ToastService,
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setUser();
    this.filterTodosByStatus('todo');
    this.filterTodosByStatus('active');
    this.filterTodosByStatus('completed');
  }

  setUser(): void {
    this.authService.loggedUser().subscribe((user: User) => (this.user = user));
  }

  filterTodosByStatus(status: Status) {
    this.loading = true;
    this.todosCollection = this.afs.collection<Todo>('todos', (ref) =>
      ref.where('status', '==', status)
    );
    this.todosCollection.valueChanges({ idField: 'id' }).subscribe(
      (data) => {
        if (status === 'todo') {
          this.todos = data;
        } else if (status === 'active') {
          this.activeTodos = data;
        } else {
          this.completedTodos = data;
        }
        this.loading = false;
      },
      (err: Error) => {
        this.loading = false;
        this.toastService.show(err.message, {
          classname: 'bg-danger text-light',
          delay: 10000,
        });
      }
    );
  }

  setTodoCount(): void {
    this.todoCount =
      this.todos.length + this.activeTodos.length + this.completedTodos.length;
  }

  drop(event: CdkDragDrop<any[]>, status: Status): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const todo: Todo = event.container.data[event.currentIndex];
    const copiedTodo = {
      ...todo,
      status,
    };
    this.updateTodoInStore(copiedTodo);
  }

  updateTodoInStore(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe(
      () => {},
      (err: Error) => {
        this.toastService.show(err.message, {
          classname: 'bg-danger text-light',
          delay: 10000,
        });
      }
    );
  }
}
