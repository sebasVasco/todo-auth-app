import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './home-page/components/navbar/navbar.component';
import { TodoListComponent } from './home-page/components/todo-list/todo-list.component';
import { TodoCardComponent } from './home-page/components/todo-card/todo-card.component';
import { TodoFormComponent } from './home-page/components/todo-form/todo-form.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    NavbarComponent,
    TodoListComponent,
    TodoCardComponent,
    TodoFormComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
