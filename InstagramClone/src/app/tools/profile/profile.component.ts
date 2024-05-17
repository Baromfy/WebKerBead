import { Component, Input } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() show: boolean = false;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor() {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement
  ){
    let name = nameInput.value;
    let description = descriptionInput.value;
    let user = this.auth.getAuth().currentUser;

    if (user){
      this.firestore.create(
        {
          path: ["Users", user.uid],
          data: {
            publicName: name,
            description: description
        },
        onComplete: (docId) => {
          alert("Profile Created");
          nameInput.value = "";
          descriptionInput.value = "";
        },
        onFail: (err) => {
  
        }
      }
      );

    }

    

  }
}
