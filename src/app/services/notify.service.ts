import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
//import { getMessaging } from "firebase/messaging";
//import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';
import { NotificationorderpopupComponent } from '../components/tabs/dashboard/notificationorderpopup/notificationorderpopup.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


// import {
//   Messaging, onMessage, getMessaging,
//   getToken, deleteToken, GetTokenOptions
// } from '@angular/fire/messaging';

import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { environment } from 'src/environments/environment';
import { getAuth } from 'firebase/auth';

async function generateFirebaseMessagingToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.apiKey }).then((currentToken) => {
      if (currentToken) {
        console.log("Hurraaa!!! we got the token.....")
        console.log(currentToken);
        // Send the token to your server and update the UI if necessary
        if(currentToken){
         // this.auth.updateUserSNS(uid, currentToken)
        }
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token................. ', err);
      // ...
    });
   // return token;
  } else {
    throw new Error('User not authenticated');
  }
}

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { initializeApp } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})



export class NotifyService {

  private messageSource = new Subject();
  // //private messageSource = new Subject();
  // currentMessage:any = new BehaviorSubject(null);

  title = 'af-notification';
  message:any = null;

  constructor(
    private auth:AuthService,
    public dialog: MatDialog,


    ){


      // this.angularFireMessaging.messages.subscribe((_messaging) => {
      //   //_messaging.onMessage = _messaging.onMessage.bind(_messaging);
      //   //_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      // })

      // this.angularFireMessaging.messages.subscribe(
      //   (_messaging: AngularFireMessaging) => {
      //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      // })


    }

    requestPermission(uid:string, tokenSNS_:string[]) {
      if(!this.auth.resource.appMode){
        const messaging = getMessaging(initializeApp(environment.firebase));
        //const messaging = getMessaging();

        getToken(messaging, { vapidKey: environment.firebase.apiKey }).then((currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....")
            console.log(currentToken);
            // Send the token to your server and update the UI if necessary
            if(currentToken && !tokenSNS_.includes(currentToken)){
              this.auth.updateUserSNS(uid, currentToken)
            }
            // ...
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
      }else{

        console.log('Initializing HomePage');

        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: Token) => {
            // alert('Push registration success, token: ' + token.value);
            let currentToken = token.value;
            console.log(currentToken);
            // Send the token to your server and update the UI if necessary
            if(currentToken && !tokenSNS_.includes(currentToken)){
              this.auth.updateUserSNS(uid, currentToken)
            }
          }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
          (error: any) => {
            // alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotificationSchema) => {
            // alert('Push received: ' + JSON.stringify(notification));
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: ActionPerformed) => {
            // alert('Push action performed: ' + JSON.stringify(notification));
          }
        );
      }
    }

    listen() {
      console.log('Inside listening message :'+this.auth.resource.appMode);
      // generateFirebaseMessagingToken().then((result)=>{
      //   console.log('Inside firebase token :'+result);
      // })
      if(!this.auth.resource.appMode){
        const messaging = getMessaging(initializeApp(environment.firebase));
        console.log('Inside IFF  '+messaging);
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          const audio = new Audio();
          audio.src = 'https://firebasestorage.googleapis.com/v0/b/refr-india.appspot.com/o/not-kiddin-243.mp3?alt=media&token=edd1b859-a85b-45db-a034-302210698947';
          audio.load();
          audio.play();
          if ( audio.src) {
            audio.play().then(() => {
              // success
            }).catch((error) => {
              // handle error
              console.error('Not able to play audio '+error);
            });
          }
          this.message=payload;
          const diag = this.dialog.open(NotificationorderpopupComponent, {
            width: '34%',
            data: {name:'aditya'},
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'nopadding'
          })

          // new Notification("Gebrünn Gebrünn by Paul Kalkbrenner", { icon: "", tag: "song" });
          // notification
          // this.messageSource.next(payload)
          // this.deSome()
        // this.messageSource.next(payload)
        });
      }}

/*
    listen() {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });

      // this.angularFireMessaging.messages.subscribe((message) => {
      //   console.log(message);
      // });
    }

    requestPermission() {
      // this.angularFireMessaging.requestToken.subscribe((token) => {
      //   console.log(token);
      // },(err) => {
      //   console.error('Unable to get permission to notify.', err);
      // });
    }

    receiveMessage() {
      // this.angularFireMessaging.messages.subscribe((payload) => {
      // console.log("new message received. ", payload);
      // this.currentMessage.next(payload);
      // })
    }

  // Listen for token refresh
  monitorRefresh(user:any) {
    // this.angularFireMessaging.tokenChanges.subscribe(token => {
    //   console.log('Token refreshed.', token);
    //   // this.messaging.getToken.pipe(take(1)).subscribe(token => {
    //   //   console.log('older token',token)
    //      this.saveToken(user, token)
    //   // })
    // });
  }

  // save the permission token in firestore
  private saveToken(user:any, token:any): void {
    // const currentTokens = user.fcmTokens || { }
    // console.log(currentTokens, token)

    // // If token does not exist in firestore, update db
    // if (!currentTokens[token]) {
    //   //const userRef = this.auth.notifySaveToken(user.uid)
    //   //const tokens = { ...currentTokens, [token]: true }
    //   //userRef.update({ fcmTokens: tokens })
    // }
  }

    get messaging(){
      return this.afM;
    }


  // get permission to send messages
  getPermission(user:any) {
    this.messaging.requestPermission.pipe(take(1)).subscribe(() => {
      console.log('Notification permission granted.');
      this.messaging.getToken.pipe(take(1)).subscribe(token => {
        console.log('created new token',token)
        this.saveToken(user, token)
      })
    })
  }


  // Listen for token refresh
  monitorRefresh(user:any) {
    this.messaging.onTokenRefresh(() => {
      console.log('Token refreshed.');
      this.messaging.getToken.pipe(take(1)).subscribe(token => {
        console.log('older token',token)
        this.saveToken(user, token)
      })
    });
  }

  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
     console.log('Message received. ', payload);
     this.messageSource.next(payload)
   });
  }

  // save the permission token in firestore
  private saveToken(user:any, token:any): void {
      const currentTokens = user.fcmTokens || { }
      //console.log(currentTokens, token)

      // If token does not exist in firestore, update db
      if (!currentTokens[token]) {
        //const userRef = this.auth.notifySaveToken(user.uid)
        //const tokens = { ...currentTokens, [token]: true }
        //userRef.update({ fcmTokens: tokens })
      }
  }
*/

doWhat(){
  document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
     console.log('Desktop notifications not available in your browser. Try Chromium.');
     return;
    }

  if (Notification.permission !== 'granted')
     Notification.requestPermission();
   });

   console.log(Notification.permission)
  //  function notifyMe() {
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
    else {
      console.log("MYRA")


    new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: 'Hey there! You\'ve been notified!',
     });

    }
  //  }
}


}
