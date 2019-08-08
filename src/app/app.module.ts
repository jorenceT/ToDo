import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToDoService } from './services/todo/todo.service';
import { CommonService } from './services/common/common.service';
import { DoneService } from './services/done/done.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ToDoService, CommonService, DoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
