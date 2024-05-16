import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramClone';
  auth = new FirebaseTSAuth();
  
  constructor(private loginSheet: MatBottomSheet){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: (user) => {
              alert("Bejelentkezve");
            },

            whenSignedOut: (user) => {
              alert("Kijelentkezve");
            }
          }
        )
      }
    )
    
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }

  onLogoutClick(){
    this.auth.signOut();
  }

  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
