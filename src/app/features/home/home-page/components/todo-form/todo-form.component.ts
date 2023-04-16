import { Component, Input, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/core/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Input() todoCount: number = 0;
  closeResult = '';
  modalReference: any;
  loading = false;
  user!: User;
  todoForm = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(20)]),
    ],
    description: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(50)]),
    ],
  });

  get title(): AbstractControl<string | null, string | null> | null {
    return this.todoForm.get('title');
  }

  get invalidTitle(): boolean | undefined {
    return this.title?.invalid && this.title.touched;
  }

  get titleIsRequiredMessage(): string {
    if (this.title?.errors?.['required']) {
      return 'title is required';
    }
    return '';
  }

  get titleMaxLengthMessage(): string {
    if (this.title?.errors?.['maxlength']) {
      return 'title length must be less or equal to 20 characters';
    }
    return '';
  }

  get description(): AbstractControl<string | null, string | null> | null {
    return this.todoForm.get('description');
  }

  get invalidDescription(): boolean | undefined {
    return this.description?.invalid && this.description.touched;
  }

  get descriptionIsRequiredMessage(): string {
    if (this.description?.errors?.['required']) {
      return 'description is required';
    }
    return '';
  }

  get descriptionMaxLengthMessage(): string {
    if (this.description?.errors?.['maxlength']) {
      return 'description length must be less or equal to 50 characters';
    }
    return '';
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private todoService: TodoService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  open(content: any): void {
    this.modalReference = this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save(content: NgbActiveModal): void {
    if (this.todoCount <= 10) {
      const todo: Todo = {
        title: this.title?.value ? this.title?.value : '',
        description: this.description?.value ? this.description?.value : '',
        status: 'todo',
        uid: this.user.uid,
      };
      this.loading = true;
      this.todoService.addTodo(todo).subscribe(
        () => {
          this.loading = false;
          this.toastService.show('Todo added successfully', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
          content.dismiss();
        },
        (err: Error) => {
          this.loading = false;
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
        }
      );
    } else {
      this.toastService.show(`Can't add more than 10 todos per user`, {
        classname: 'bg-warning text-light',
        delay: 10000,
      });
    }
  }
}
