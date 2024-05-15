import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'app/tools/authenticator/authenticator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginSheet: MatBottomSheet){

  }

  onGetStartedClick(){
    this.loginSheet.open(AuthenticatorComponent)
  }  
}


