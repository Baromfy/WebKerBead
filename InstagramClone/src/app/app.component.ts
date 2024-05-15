import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramClone';
  
  constructor(private loginSheet: MatBottomSheet){}

  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
