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
import { MainComponent } from './main/main.component';
import { FaqComponent } from './faq/faq.component';
import { ModelTrainingComponent } from './model-training/model-training.component';
import { UploadDirective } from './shared/directives/upload.directive';
import { UploadComponent } from './model-training/upload/upload.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'train-a-model', component: ModelTrainingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainComponent,
    FaqComponent,
    ModelTrainingComponent,
    UploadDirective,
    UploadComponent,
    TutorialComponent,
  ],
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
