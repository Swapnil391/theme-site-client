import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AccountComponent } from './pages/account/account.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StandardDialogComponent } from './components/standard-dialog/standard-dialog.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    AccountComponent,
    ProfileCardComponent,
    UserDetailsComponent,
    StandardDialogComponent,
    FileUploadComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
