import { Component } from '@angular/core';
import { log } from 'console';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(){
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  onResetClick(
    resetEmail: HTMLInputElement,
  ){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) => {
            alert(`Email elküldve a ${email} email címre`);
          }
        }
      );
    }
  }

  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement,)
    {
      let email = loginEmail.value;
      let password = loginPassword.value;

      if(this.isNotEmpty(email) && this.isNotEmpty(password)){
        this.firebasetsAuth.signInWith(
          {
            email: email,
            password: password,
            onComplete: (uc) => {
              alert("Bejelentkezve");
            },
            onFail: (err) => {
              alert(err);
            }
          }
        )
      }
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
          alert("Felhasználó létrehozva");
          registerEmail.value = "";
          registerPassword.value = "";
          registerConfirmPassword.value = "";
        },
        onFail: (err) => {
          alert("Felhasználó létrehozása sikertelen");
        }
        
        } 
      )
    };
  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, compareWidth: string){
    return text == compareWidth;
  }


  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
      
    }
  }
}



export enum AuthenticatorCompState{
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER
}
