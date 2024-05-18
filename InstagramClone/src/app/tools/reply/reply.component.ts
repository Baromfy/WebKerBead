import { Component, Inject } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { timeStamp } from 'console';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent {
  firesrore = new FirebaseTSFirestore();

  constructor(@Inject(MAT_DIALOG_DATA) private postId: string) {}

  onSendClick(commentInput: HTMLInputElement){
    this.firesrore.create(
      {
        path: ["Posts", this.postId, "PostComments"],
        data: {
          comment: commentInput.value,
          creatorId: "",
          creatorName: "",
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        }
      }
    );
  }
}
