import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { WorkComponent } from './work/work.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'work', pathMatch: 'full' },
  { path: 'work', component: WorkComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [AppComponent, FooterComponent, NavComponent, WorkComponent, AboutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
