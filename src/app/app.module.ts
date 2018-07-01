import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { RouterModule, Route, Routes } from '@angular/router';
import { FormGroupValidComponent } from './form-group-valid/form-group-valid/form-group-valid.component';
import { FormGroupValidModule } from './form-group-valid/form-group-valid.module';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{
  path: '', component: FormGroupValidComponent
}]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormGroupValidModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
