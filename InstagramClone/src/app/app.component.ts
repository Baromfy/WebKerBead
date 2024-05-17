import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramClone';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument!: UserDocument;
  
  constructor(private loginSheet: MatBottomSheet, private router: Router){
    this.userDocument = { publicName: '', description: '' };
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: (user) => {
              //alert("Bejelentkezve");
              this.getUserProfile();
            },
            whenSignedOut: (user) => {
              //alert("Kijelentkezve");
            }
          }
        )
      }
    )
    
  }

  getUserProfile(){
    let user = this.auth.getAuth().currentUser;

    if (user){
      this.firestore.listenToDocument(
        {
          name: "Getting Document",
          path: ["Users", user.uid],
          onUpdate: (result) => {
            this.userDocument = <UserDocument><unknown>result.data();
            this.userHasProfile = result.exists;
            if(this.userHasProfile) {
              this.router.navigate(["postfeed"]);
            }
          }
        }
        
      )
    }
    
    
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

export interface UserDocument {
  publicName: string;
  description: string;
}