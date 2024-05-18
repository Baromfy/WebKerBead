import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { EnvironmentComponent } from './environment/environment.component';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '/environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PostComponent } from './tools/post/post.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReplyComponent } from './tools/reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    ReplyComponent,
    //EnvironmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    FirebaseTSApp.init(environment.firebaseConfig),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
      
    }
 }
