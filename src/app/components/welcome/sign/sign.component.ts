import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { environment } from 'src/environments/environment';
import { getAuth, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export class PhoneNumber {
  country: string = '91';
  iso: string = 'IND';
  coin: string = 'INR';
  digits: number = 10;
  area: string = '';
  prefix: string = '';
  line: string = '';
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  phoneNumber = new PhoneNumber();
  phoneNumFull: string = '';
  verificationCode: string = '';
  credentialX = '';

  constructor(
    public auth: AuthService,
    public themeService: ThemeService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<SignComponent>
  ) {}

  ngOnInit(): void {
    this.auth.setupReCapca();
  }

  setContactNumber() {
    // if(!know){
    //   this.phoneNumber.area = "";
    //   this.phoneNumber.prefix = "";
    //   this.phoneNumber.line = "";
    // }else{
    this.phoneNumber.area = this.phoneNumFull.slice(0, 3);
    this.phoneNumber.prefix = this.phoneNumFull.slice(3, 6);
    this.phoneNumber.line = this.phoneNumFull.slice(6, this.phoneNumber.digits);
    //}
  }

  step0() {
    //FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    let validatePhone =
      this.phoneNumber.country +
      this.phoneNumber.area +
      this.phoneNumber.prefix +
      this.phoneNumber.line;
    if (this.auth.resource.invalidPhone(validatePhone)) {
      this.auth.resource.startSnackBar('issue: format must be 0-9.');
    } else {
      const phone = this.phoneNumber.e164;
      const step0_CheckUserExist = this.auth.step0_userForward(phone, false);
      step0_CheckUserExist.then((data: any) => {
        if (!data.success) {
          this.finalRESULT(data);
        } else {
          if (!data.exist) {
            this.auth.verifyPhoneWithOTPX(phone, false).then((dataV) => {
              //this.auth.stepDisable = false;
              //this.finalRESULT(dataV);
              if (!dataV.success) {
                this.finalRESULT(dataV);
              } else {
                this.auth.resource.first.reset();
                //this.auth.resource.pass.reset();
                this.auth.stepDisable = false;
                this.auth.step = 1;
                //this.auth.resource.first.
              }
            });
            // .catch(err => {
            //   this.finalRESULT({"success":false,info:"401"});
            // });
          } else {
            this.auth.verifyPhoneWithOTPX(phone, false).then((dataV) => {
              //this.auth.stepDisable = false;
              //this.finalRESULT(dataV);
              if (!dataV.success) {
                this.finalRESULT(dataV);
              } else {
                //this.auth.resource.first.reset();
                //this.auth.resource.pass.reset();
                this.auth.stepDisable = false;
                this.auth.step = 5;
                //this.auth.resource.first.
              }
            });
            // this.auth.resource.pass.reset();
            // this.auth.step = 3;
            // this.auth.stepDisable = false;
          }
        }

        /*
        const step1_newUSER = this.auth.step1_newUSER(
          this.phoneNumber.e164, //validatePassword, name,
          //this.phoneNumber.iso, this.phoneNumber.coin
          );

       step1_newUSER.then((ref:any) =>{
        if(ref.success){
          this.auth.verifyPhoneWithOTPX( ref.phone, false ).then(dataV => {
            this.auth.stepDisable = false;
            this.finalRESULT(dataV);
            this.auth.step = 1;
          });
          // this.auth.verifyPhoneWithOTP( ref.phone, false ).then(dataV => {
          //   this.auth.stepDisable = false;
          //   //this.finalRESULT(dataV);
          //   this.auth.step = 1;
          // });
        }else{
        }
        //this.finalRESULT(data);
       })
       */
      });
    }
  }

  step1X() {
    //CREATE NEW USER
    this.auth.resource.first.disable();
    //this.auth.resource.pass.disable();

    let validatePassword = this.auth.resource.pass.value;
    if (this.auth.resource.invalidPassword(validatePassword)) {
      //this.auth.resource.pass.setValue("");
      this.auth.resource.first.enable();
      //this.auth.resource.last.enable();
      //this.auth.resource.pass.enable();
      this.verificationCode = '';
      this.auth.resource.startSnackBar('issue: format must be 0-9A-Za-z@.');
    } else {
      const name = this.auth.resource.first?.value; //+" "+ this.auth.resource.last?.value;
      //const pass = this.auth.resource.pass.value;

      if (this.verificationCode?.length < 6) {
        this.auth.resource.startSnackBar('issue: verification code invalid.');
      } else {
        this.auth.confirmationResult
          .confirm(this.verificationCode)
          .then((credential: any) => {
            this.auth
              .step2X_varifyCODE(
                credential,
                name, //pass,
                this.phoneNumber.e164,
                this.phoneNumber.iso,
                this.phoneNumber.coin
              )
              .then((creUser) => {
                this.finalRESULT(creUser);
                this.goToDash();
              });
            // .catch(err =>{
            //   this.auth.resource.startSnackBar(err);
            // })
          })
          .catch((err: any) => {
            console.error(err);
            this.verificationCode = '';
            this.auth.resource.startSnackBar(err);
          });
        // this.auth.step2X_varifyCODE(this.verificationCode, "", name, pass,
        // this.phoneNumber.e164, //validatePassword, name,
        // this.phoneNumber.iso, this.phoneNumber.coin
        // ).then(data => {
        //   //this.auth.resource.playSound('beep')
        //   //this.finalRESULT(data);
        // })
      }
    }
  }

  step6() {
    if (this.verificationCode?.length < 6) {
      this.auth.resource.startSnackBar('issue: verification code invalid.');
    } else {
      this.auth.confirmationResult
        .confirm(this.verificationCode)
        .then((credential: any) => {
          //this.auth.step2X_varifyCODE(credential, //name, //pass,
          //this.phoneNumber.e164, this.phoneNumber.iso, this.phoneNumber.coin ).then(creUser => {
          //this.finalRESULT(creUser);
          this.goToDash();
          //})
          // .catch(err =>{
          //   this.auth.resource.startSnackBar(err);
          // })
        })
        .catch((err: any) => {
          console.error(err);
          this.verificationCode = '';
          this.auth.resource.startSnackBar(err);
        });
    }
  }

  // step1(){//CREATE NEW USER
  //     this.auth.resource.first.disable();
  //     this.auth.resource.last.disable();
  //     this.auth.resource.pass.disable();

  //   let validatePassword = this.auth.resource.pass.value;
  //   if( this.auth.resource.invalidPassword(validatePassword) ){
  //     this.auth.resource.pass.setValue("");
  //     this.auth.resource.first.enable();
  //     this.auth.resource.last.enable();
  //     this.auth.resource.pass.enable();
  //     this.auth.resource.startSnackBar("issue: format must be 0-9A-Za-z@.")
  //   }else{
  //     const name = this.auth.resource.first?.value +" "+ this.auth.resource.last?.value;
  //     const step1_newUSER = this.auth.step1_newUSER( this.phoneNumber.e164, validatePassword, name, this.phoneNumber.iso, this.phoneNumber.coin );

  //     step1_newUSER.then((ref:any) =>{
  //       //this.finalRESULT(data);
  //       if(ref.success){
  //         this.auth.verifyPhoneWithOTP( ref.phone, false ).then(data => {
  //           this.finalRESULT(data);
  //         });
  //       }else{
  //       }
  //     })
  //   }
  // }

  // step2(){//VARIFY USER
  //   if(this.verificationCode?.length < 6){
  //     this.auth.resource.startSnackBar("issue: verification code invalid.")
  //   }else{
  //     this.auth.step2_varifyCODE(this.verificationCode, "").then(data => {
  //       //this.auth.resource.playSound('beep')
  //       this.finalRESULT(data);
  //     })
  //   }
  // }

  step2() {
    // this.auth.resource.pass.reset();
    // this.auth.stepDisable = false;
    // this.auth.step = 3;
    this.createUserUsingEmail('prakash.dimension@gmail.com', 'Mahanadi@123456');
  }

  step3() {
    //OLD USER LOG IN
    this.auth.resource.pass.disable();

    let validatePassword = this.auth.resource.pass.value;
    if (this.auth.resource.invalidPassword(validatePassword)) {
      this.auth.resource.pass.setValue('');
      this.auth.resource.pass.enable();
      this.verificationCode = '';
      this.auth.resource.startSnackBar('issue: format must be 0-9A-Za-z@.');
    } else {
      this.auth
        .step3_login(this.phoneNumber.e164, validatePassword)
        .then((data) => {
          //this.auth.resource.playSound('beep');
          this.finalRESULT(data);
          //UPDATE ALLOW NOTIFICATION SEND
          if (data.success && environment.production) {
            this.setUpNotify();
            //   //.filter(user => !!user) // filter null
            //    // take first real user
            //   //this.auth.user$.pipe(take(1)).subscribe(user => {
            //     //if (user) {
            //       //this.notifyService.getPermission(user)
            //       //this.notifyService.monitorRefresh(user)
            //       //this.notifyService.receiveMessages()
            //     //}
            //   //})
          }
          // //UPDATE ALLOW NOTIFICATION SEND
        });
    }
  }

  step4() {
    //OLD USER FORGOT PASSWOZRD
    this.auth.step4_resetLogin(this.phoneNumber.e164).then((data) => {
      this.finalRESULT(data);
    });
  }

  createUserUsingEmail(email: any, password: any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        var user = userCredential.user;

        //this.finalRESULT(userCredential);
        this.auth
          .getFirestoreDocument('users', user.uid)
          .subscribe((userObj) => {
            this.goToDashForEmailUser(userObj);
          });

        // ...

        // getAuth().currentUser.updateProfile({
        //     phone: +918454083097
        //   }).then(function() {
        //     // Update successful.
        //   }).catch(function(error:any) {
        //   });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  step5() {
    //OLD USER FORGOT PASSWOZRD
    this.auth.resource.pass.disable();
    let validatePassword = this.auth.resource.pass.value;
    if (this.auth.resource.invalidPassword(validatePassword)) {
      this.auth.resource.pass.setValue('');
      this.auth.resource.pass.enable();
      this.auth.resource.startSnackBar('issue: format must be 0-9A-Za-z@.');
    } else {
      this.auth
        .step5_reset(this.verificationCode, this.auth.resource.pass.value)
        .then((data) => {
          this.finalRESULT(data);
        });
    }
  }

  social(signFor: string) {
    if (signFor == 'google') {
      this.auth
        .googleSignin()
        .then((data: any) => {
          this.finalRESULT(data);
        })
        .catch((err) => {
          this.credentialX = 'Ve: ' + err;
        });
      //this.auth.resource.playSound('beep');

      //this.finalRESULT(data);
      //UPDATE ALLOW NOTIFICATION SEND
      //if(data.success && environment.production){
      // take first real user
      //}
      //UPDATE ALLOW NOTIFICATION SEND
      /*
      {
        "operationType": "signIn",
        "credential": {
            "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0NTBhMzVhMjA4MWZhYTFkOWFlMWQyZDc1YTBmMjNkOTFkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDcxNjQxMTc4NzgzLXBvYTFsYjBmamR2N2FtbnZoNW50ZnRlcGFza2dvaGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDcxNjQxMTc4NzgzLXBvYTFsYjBmamR2N2FtbnZoNW50ZnRlcGFza2dvaGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0MzkzMjQxNjcxMzU5NDk5MjI2IiwiZW1haWwiOiJkaXBlc2lvdXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLZk9LenJUWldIZ3JGcmw1V19DelFBIiwiaWF0IjoxNjQzOTI1MDY5LCJleHAiOjE2NDM5Mjg2Njl9.avhj--XivNLzmFBX24bRET7GNaHp1T6ruwHzRnCPadHVQ6x_FZI-iUEnF30z5sU-7ylWrqzahmHneTOPr0YHG23_GBQ8txfFs6gIeEm4u15RaHocZPgIFS7Ikh_LvHP9ZMrCYWbPIIneZUCGwuuD-lWPCIqomO2XSlVK0LH4wlu_XQkjUPJNfe0XnfUopc_hEF_VOp603o2a2jiLpGkH25yn-S5Ln3ii9kwoMefagBNvVP4D2cu5JYf4eVO-HHERA2O9oA7n6bnToIsLXrHUsbOcjMrCkeY0fQ5ycyn433TQD9CT-zCJ0zSdbjbz52kLIO_tsJaCPHoB5Z4c_2BuAA",
            "accessToken": "ya29.A0ARrdaM9bECdaoKclsykF9eRHwYkra_YvnQ_3UGhVan6w4uneZ-ugdVVSaQnDIKOSjI-GnAIclWrlle-CRJa-PkjnzysFMOEg21mKpAUys69TggR1ltgL1Zib-Noa0IYybJr0dQjv7kjjtkIsbB91M7BLAgf7",
            "pendingToken": null,
            "providerId": "google.com",
            "signInMethod": "google.com"
        },
        "additionalUserInfo": {
            "isNewUser": true,
            "providerId": "google.com",
            "profile": {
                "name": "DIPESIOUS",
                "granted_scopes": "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
                "id": "104393241671359499226",
                "verified_email": true,
                "given_name": "DIPESIOUS",
                "locale": "en",
                "email": "dipesious@gmail.com",
                "picture": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c"
            }
        },
        "user": {
            "uid": "9q8jMB5BvCRD68tbHg4jmafs9sj1",
            "email": "dipesious@gmail.com",
            "emailVerified": true,
            "displayName": "DIPESIOUS",
            "isAnonymous": false,
            "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c",
            "providerData": [
                {
                    "providerId": "google.com",
                    "uid": "104393241671359499226",
                    "displayName": "DIPESIOUS",
                    "email": "dipesious@gmail.com",
                    "phoneNumber": null,
                    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c"
                }
            ],
            "stsTokenManager": {
                "refreshToken": "AFxQ4_qSvCBGLG0JOaN7ON2ru-chJzjm1nNLIO0m0Tay7jURvmF7QJIBbYPAkLnt3FhgfZPByMEQR6tM36Dw--lfndfE9HyGYnWQ47ahsfBAkmYuLItAO4yKuXSQt0atg6MdDDSbm3KOW3_FU0esGNd_bOmjAXzWLRGTCpbNYTLE5XcEH2K2yyhz8LyL_EYvKrJxNRKsbZuxYjWEba2vsqI3sUeurGXfLQkKkhVOrbCUDb2PaaQwBN1Wi-azs1LS7I9_LQ16RCHMbUyK_drBBpG_MGCQTtC5FiyGzxSJvWVzL8G8u0HefSKYWiEAn8pjR8gTljW-oM1KDY-rqMQwbHPvTOB2i6O7UbgyLp0GN_b150j5J92s-pb1Op5mBttcUj3mAIYU1uIvkpkykX-3oXwfnKuxPp6R9w",
                "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRElQRVNJT1VTIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoQVlIZmlEVWh0SXlpMHZaVkJCT25zS0pXN1ZMTFZJRDF4TjRrPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JlZnItaW5kaWEiLCJhdWQiOiJyZWZyLWluZGlhIiwiYXV0aF90aW1lIjoxNjQzOTI1MDcwLCJ1c2VyX2lkIjoiOXE4ak1CNUJ2Q1JENjh0YkhnNGptYWZzOXNqMSIsInN1YiI6IjlxOGpNQjVCdkNSRDY4dGJIZzRqbWFmczlzajEiLCJpYXQiOjE2NDM5MjUwNzAsImV4cCI6MTY0MzkyODY3MCwiZW1haWwiOiJkaXBlc2lvdXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDQzOTMyNDE2NzEzNTk0OTkyMjYiXSwiZW1haWwiOlsiZGlwZXNpb3VzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.cVN2kGiEca50-sowg1FBDfzmnx4D7fnwtsOWXHBoOouqDmw4Z18shRHo1ijxfnmX1HGw5b4vyNGd7f8IA_5iNziWa5AQJFvT4BMVlVMd3YnAb6CViGKvJiCjs9W_wHY-2a1eHa7-YbrXhEC3NcJm0Gf_Zw80iNcsqJmYNjt_QTBJ0irSBs8-4z0yChQr6vmQKBdTrMYqiuQ-J5QjpGH2za2mx54HQrUk_-K-ldlD5RmK64dEAfpgm2Ct8g82D69Lwb9eawZyX5jTGyOtYddYOURotIrXdZ1SxbMPyDVgTZRC1m7z1AAeewR78S-wghrRvOAR5DjEC_qnyXVyRbcZig",
                "expirationTime": 1643928669977
            },
            "createdAt": "1643925069551",
            "lastLoginAt": "1643925069552",
            "apiKey": "AIzaSyC1dPYtopKROtR01CORXpWc2GHvrgznc0g",
            "appName": "[DEFAULT]"
        }
    }
*/

      /*
{
    "operationType": "signIn",
    "credential": {
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0NTBhMzVhMjA4MWZhYTFkOWFlMWQyZDc1YTBmMjNkOTFkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDcxNjQxMTc4NzgzLXBvYTFsYjBmamR2N2FtbnZoNW50ZnRlcGFza2dvaGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDcxNjQxMTc4NzgzLXBvYTFsYjBmamR2N2FtbnZoNW50ZnRlcGFza2dvaGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0MzkzMjQxNjcxMzU5NDk5MjI2IiwiZW1haWwiOiJkaXBlc2lvdXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIyNUFvQ1ZUZVc0YnFqYTVDdy0xTWV3IiwiaWF0IjoxNjQzOTI1NjUzLCJleHAiOjE2NDM5MjkyNTN9.NmGuCsm6ljkat0P-4DR0qPweIPAzIi_AYfA3gagOP98RAScjzAQaRAdRgvPpyVhpbeXEh_Y8DoSetKY2SS3RIpqp1M5wb9lZqfJEZBMid09qPziVbnRmgvEGqCjGc5wMp_Laji30FrGdj6r71-H1p8JsVqXVL05GO9X_q6MK6VEvg1j3PSlKPIPj2kNPpSRIiNycJsRZ9ud_96vJY17D3k6rPjrjBeduUQtieHpdbe0tUO5ctvuEIichv5b3GW6fp_BYinQQKNYAYqVuSPFDYa1rpv-qU2ykJHZrW3Rmy4x7kGLbzHyJWWhjC7jwilEnGZpOP21XP4o4xDyc3iGVsw",
        "accessToken": "ya29.A0ARrdaM-StJS1YQRQBjGH47lkvebjwIsfBeTCXWSx8Jslh3cBJcoeGzrrOX7TsUCVXxLm2Dt2_9l906mqqpJ183rVOFKc7yZnNXdSF10RTAN5D0IicTHVV8_hEJzUG8oYCW0MBsddN5Mug80EtWXC9A8Psxdr",
        "pendingToken": null,
        "providerId": "google.com",
        "signInMethod": "google.com"
    },
    "additionalUserInfo": {
        "isNewUser": false,
        "providerId": "google.com",
        "profile": {
            "name": "DIPESIOUS",
            "granted_scopes": "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
            "id": "104393241671359499226",
            "verified_email": true,
            "given_name": "DIPESIOUS",
            "locale": "en",
            "email": "dipesious@gmail.com",
            "picture": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c"
        }
    },
    "user": {
        "uid": "9q8jMB5BvCRD68tbHg4jmafs9sj1",
        "email": "dipesious@gmail.com",
        "emailVerified": true,
        "displayName": "DIPESIOUS",
        "isAnonymous": false,
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c",
        "providerData": [
            {
                "providerId": "google.com",
                "uid": "104393241671359499226",
                "displayName": "DIPESIOUS",
                "email": "dipesious@gmail.com",
                "phoneNumber": null,
                "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhAYHfiDUhtIyi0vZVBBOnsKJW7VLLVID1xN4k=s96-c"
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AFxQ4_rIbzsq6NUNtLc-ACW8tJd1XqDZnsMSjdA83Rky2NwbZghS871nVEymJ6zAO1mPsfwYbDnz43MWCZwh3ftMWr6FptCgbpeNYS-CunwRXpBs7ip_sp5JkZ9p2p9f_hQQlPUlU43Hl2ISP_nAI1myBe-ZJbXOlNc6-B2qE3jVNx7C_yTU1blIv_LkY2nzTL2mjSjx3v4Sul2Hy6S4edCGT21GussTTsGNIGyaSOJaN5RQkajZoa_2WTKFZSOCWy84QLW3UgFqR-zqu5U5FMK2kYfvARl6YzFo16TuNIVfvU5wy-WRMx6VWn_yC_iO5G1qml47AxA-epS-TaqAo2DSwRSjkKszzEOyRsH_c73jh92Uzztv23i86OLraxf-WJzpbC5a5GNPgMor_QGSA__ShguNduT4wA",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRElQRVNJT1VTIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoQVlIZmlEVWh0SXlpMHZaVkJCT25zS0pXN1ZMTFZJRDF4TjRrPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JlZnItaW5kaWEiLCJhdWQiOiJyZWZyLWluZGlhIiwiYXV0aF90aW1lIjoxNjQzOTI1NjUzLCJ1c2VyX2lkIjoiOXE4ak1CNUJ2Q1JENjh0YkhnNGptYWZzOXNqMSIsInN1YiI6IjlxOGpNQjVCdkNSRDY4dGJIZzRqbWFmczlzajEiLCJpYXQiOjE2NDM5MjU2NTMsImV4cCI6MTY0MzkyOTI1MywiZW1haWwiOiJkaXBlc2lvdXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDQzOTMyNDE2NzEzNTk0OTkyMjYiXSwiZW1haWwiOlsiZGlwZXNpb3VzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.mOaDHmWVNa4oOWxSRD7BjkV7BZdbvqf-wJxFUkBI8X0pS8oOp1hwxRUxpwgpR0RpGvysd-ry5BrbiE4OsTVsuD117nO5a9k0XjaN5jMsyQA4h5MCxkU2UXEkDhGuQBKOiK2875xKJEfvQ39KazOaSetq8i-XpMrd46YjjFKHz1e_sC-uVKiaujMVAbXiNJF__rRFN9tZjAPhcpfRS4ue2sualDgTvQEhYOX2m-lFaDcMD8i0eXPOa5jm2ek-JPY1slDz5kRHklpTCeecPcBhtANlfcG06oohlXGYdLtr-L07vdIb7P5JZKRBzHnU6C91T8XX745HaaV9AQ4I0RHf1w",
            "expirationTime": 1643929253281
        },
        "createdAt": "1643925069551",
        "lastLoginAt": "1643925653551",
        "apiKey": "AIzaSyC1dPYtopKROtR01CORXpWc2GHvrgznc0g",
        "appName": "[DEFAULT]"
    }
}
*/
    }
    // if(signFor == "apple"){
    //   this.auth.appleSignin().then(data => {
    //     this.finalRESULT(data)
    //   })
    // }
    if (signFor == 'facebook') {
      this.auth.facebookSignin().then((data) => {
        this.finalRESULT(data);
      });
    }
    // if(signFor == "microsoft"){
    //   this.auth.microsoftSignin().then(data => {
    //     this.finalRESULT(data)
    //   })
    // }
  }

  signWithSocial(cred: any, medium: string) {
    const step0_CheckUserExist = this.auth.step0_socialForward(
      cred.uid,
      cred.email
    );

    step0_CheckUserExist.then((ref) => {
      if (!ref) {
        const data = { success: false, info: '401' };
        this.finalRESULT(data);
      } else {
        this.credentialX = 'V: ' + ref.exists() + ' ' + ref.id;
        const existsX = ref.exists();
        if (!existsX) {
          // create new user
          this.auth.socialCreate(cred, medium).then((x: any) => {
            this.goToDash();
            //this.auth.upgradeSocial();
          });
        } else {
          this.goToDash();
          //this.auth.upgradeSocial();
          // sign current user
          //socialCreate
        }
      }
      /*
      v.pipe(take(1)).subscribe((ref:any) => {
        if(!ref){
          const data = {"success":false, info:"401"}
          this.finalRESULT(data);
        }else{

        }
        */
    });

    /*
      v.pipe(take(1)).subscribe((ref:any) => {
           if(!ref){
             const data = {"success":false, info:"401"}
             this.finalRESULT(data);
           }else{
                if(!ref.exists){
                  // create new user
                  this.auth.socialCreate(cred, medium).then((x:any) => {
                    this.goToDash()
                    //this.auth.upgradeSocial();
                  })
                }else{
                  this.goToDash()
                  //this.auth.upgradeSocial();
                  // sign current user
                  //socialCreate
                }
           }
      })
    })
      */
    //.catch(err => {})
    //step0_CheckUserExist.then((data:any) =>{
    //this.finalRESULT(data);
    //})
  }

  finalRESULT(data: any) {
    if (!data.success) {
      if (data.info !== '401') {
        this.auth.stepDisable = false;
        this.auth.resource.startSnackBar(data.info);
      } else {
        this.auth.stepDisable = false;
        this.auth.resource.startSnackBar('issue: Dirty Data!');
        this.dialogRef.close();
      }
      if (data.code == 'auth/user-disabled') {
        this.dialogRef.close();
      }
    } else {
      this.auth.stepDisable = false;

      if (data.complete) {
        this.goToDash();
      }

      if (data.incomplete) {
        //this.auth.step = 2; // PHONE NUMBER VARIFY
        this.auth.resource.startSnackBar('Please Complete Sign Up Process!');
        this.auth.verifyPhoneWithOTP(data.phone, false).then((data) => {
          this.finalRESULT(data);
        });
      }

      if (data.social) {
        this.signWithSocial(data.data, data.medium);
      }
    }
  }

  setUpNotify() {
    // this.notify.requestPermission();
    // this.notify.listen();
    //   //.filter(user => !!user) // filter null
    //    // take first real user
    //   this.auth.user$.pipe(take(1)).subscribe(user => {
    //     if (user) {
    //       // this.notifyService.requestPermission()
    //       // this.notifyService.monitorRefresh(user)
    //       // this.notifyService.receiveMessage()
    //       //this.notifyService.getPermission(user)
    //       //this.notifyService.monitorRefresh(user)
    //       //this.notifyService.receiveMessages()
    //   // this.notifyService.requestPermission();
    //   // this.notifyService.listen();
    //     }
    //   })
  }

  goToDash() {
    this.auth.user$.pipe(take(1)).subscribe((mine: any) => {
      if (mine) {
        console.log('Mine', mine);
        if (mine.storeLoc.length > 0) {
          if (mine.New_storeCam != undefined && mine.New_storeCam != '') {
            // if(mine.storeCam.length > 0){
            this.auth.resource.router.navigate(['/dash']);
          } else {
            this.auth.resource.router.navigate(['/store/create-campaign']);
          }
        } else {
          this.auth.resource.router.navigate(['/store/create-location']);
        }
        setTimeout(() => {
          this.dialogRef.close();
        }, 500);
      } else {
      }
    });
  }

  goToDashForEmailUser(mine: any) {
    if (mine) {
      if (mine.storeLoc.length > 0) {
        if (mine.storeCam.length > 0) {
          this.auth.resource.router.navigate(['/dash']);
        } else {
          this.auth.resource.router.navigate(['/store/create-campaign']);
        }
      } else {
        this.auth.resource.router.navigate(['/store/create-location']);
      }
      setTimeout(() => {
        this.dialogRef.close();
      }, 500);
    } else {
    }
  }
}
