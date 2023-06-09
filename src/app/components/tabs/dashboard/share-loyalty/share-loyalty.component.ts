import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource.service';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-share-loyalty',
  templateUrl: './share-loyalty.component.html',
  styleUrls: ['./share-loyalty.component.scss']
})
export class ShareLoyaltyComponent implements OnInit {

  link = "";

  erz:any[] = []
  showRedeem = false;

  private ngNavigatorShareService: NgNavigatorShareService;

  constructor(
    private socialSharing: SocialSharing,
    public resource: ResourceService,
    private dialogRef: MatDialogRef<ShareLoyaltyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {link: string; name:string;mincashback:any},
    //public dialog: MatDialog
    ngNavigatorShare: NgNavigatorShareService
    ) {
      this.link = data.link;

      if(!data.link){

      }else{
        this.execute()
      }

      this.ngNavigatorShareService = ngNavigatorShare;
    }

  ngOnInit(): void {
  }


  execute(){
    // create new code

  }

  copyClip(){
    if(this.link){
      this.resource.copyClipboard(this.link)
    }
  }

  shareX(type:string){

const data = {
message: `Thanks for being a part of “${this.data.name}’s” journey 😊
Check out our store on Refr & get assured cashback of ₹${this.data.mincashback} on your next purchase.
Join India’s 1st People Powered marketplace.

http://app.refr.club
Refr X ${this.data.name}`,
subject: "Hi, Thanks for being a part of " + this.data.name + (this.data.name[this.data.name.length-1] !== "s" ? "'s" : "") + " journey 😊",
url: this.link
}

    if(type == "fb"){
      this.shareFacebook(data)
    }

    if(type == "tw"){
      this.shareTwitter(data)
    }

    if(type == "wa"){
      this.shareWhatsapp(data)
    }

    if(type == "sms"){
      var userAgent = window.navigator.userAgent;
      if( userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) ){
        // iPad or iPhone
        this.shareSMS("safari", data)
      }else{
        // Anything else
        this.shareSMS("", data)
      }
    }

    if(type == "other"){
      if(!this.resource.appMode){
        this.shareX("shareWebShareApi")
      }else{
        this.shareOther(data);
      }
    }

    if(type == "shareWebShareApi"){ this.shareWebShareApi(data);}

  }




  async shareFacebook(data: { message: string; subject: string; url: string; }){
    const textBODY = `${data.subject}\n${data.message}`;
    const dataX = { message: textBODY, image: "", url: data.url }
    /*
    const fb = `https://facebook.com/sharer/sharer.php?u=${ dataX.url }&quote=${ dataX.message }`
    window.open(fb, "_blank");
    TRY QUOTE
    */
   //com.facebook.katana

if(!this.resource.appMode){
    const X = window.encodeURIComponent(dataX.message)

    const fb = `https://www.facebook.com/sharer/sharer.php?u=${ dataX.url }`;
    //const fb = `https://www.facebook.com/sharer/sharer.php?u=${ 'https://google.com' }&quote=${ 'ManMade' }`;
    //const fb = `https://www.facebook.com/sharer/sharer.php?u=${dataX.url}`  //&quote=${ X }`;
    window.open(fb, "_blank");

}else{


   this.socialSharing.canShareVia("facebook").then(r => {
    //this.socialSharing.shareViaFacebook(dataX.message, dataX.image, dataX.url).then(() => {
      this.socialSharing.shareViaFacebookWithPasteMessageHint(dataX.message, dataX.image, dataX.url, "Please paste the copied text").then(() => {
    }).catch(err => {
      this.resource.startSnackBar("Error: " + err);
      this.erz.push(err)
    })

   }).catch(e => {
    this.resource.startSnackBar("Error: " + e);
    this.erz.push("No Axess: " + e)
   })


}

  }

  shareTwitter(data: { message: string; subject: string; url: string; }){
    const textBODY = `${data.subject}\n${data.message}\n${data.url}`;
    const dataX = { message: textBODY, image: "", url: data.url }
    const tw = `https://twitter.com/intent/tweet?via=${ 'refrclub' }&text=${dataX.message}`;
    window.open(tw, "_blank");
  }

  shareWhatsapp(data: { message: string; subject: string; url: string; }){
    const textBODY = `${data.subject}\n${data.message}\n${data.url}`;
    const dataX = { message:textBODY, image: "", url: data.url }
    /*
    const wa = `https://wa.me/?${ 'text=' + dataX.message }` //encodeURIComponent()
    window.open(wa, "_blank");dataX.image, null , dataX.url
    *//*, dataX.url*/

    if(!this.resource.appMode){
      const X = window.encodeURIComponent(textBODY)

      const wa = `https://wa.me/?${ 'text=' +  X }`;
      window.open(wa, "_blank");

    }else{



   this.socialSharing.canShareVia("whatsapp").then(r => {
    this.socialSharing.shareViaWhatsApp( dataX.message, dataX.image ).then(res => {
      this.erz.push("res: " + res)
    }).catch(err => {
      this.resource.startSnackBar("Error: " + err);
      this.erz.push(err)
    })

   }).catch(e => {
    this.resource.startSnackBar("Error: " + e);
    this.erz.push("No Axess: " + e)
   })


    }

  }

  shareSMS(via:string, data: { message: string; subject: string; url: string; }){
    const textBODY = `${data.subject}\n${data.message}\n${data.url}`;
    const dataX = { message: textBODY, url: data.url }

    if(!this.resource.appMode){
      if(via !== "safari"){
        const url = "sms:?body=" + dataX.message;
        //const url = "sms:+19725551212?body=" + dataX.message;
        window.open(url, "_blank");
      }else{
        const url = "sms:;body=" + dataX.message;
        //const url = "sms:+19725551212?body=" + dataX.message;
        window.open(url, "_blank");
      }
    }else{
      this.socialSharing.shareViaSMS(dataX.message, "")
    }
  }

  async shareOther(data: { message: string; subject: string; url: string; }){
    const dataX = { message: data.message, subject: data.subject, file: "", url: data.url }
      this.socialSharing.share( dataX.message, dataX.subject, dataX.file, dataX.url ).then(() => {
      }).catch(err => {
        this.resource.startSnackBar("Error: " + err);
        this.erz.push(err)
      })


  }



  shareWebShareApi(data: { message: string; subject: string; url: string; }){
    const textBODY = `${data.subject}\n${data.message}\n${data.url}`;
    const dataX = { message: textBODY, url: data.url }
    // this.auth.resource.copyClipboard(dataX.message)
    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }

    this.ngNavigatorShareService.share({
      title: 'Refr Club',
      text: dataX.message,
      url: dataX.url
    }).then( (response) => {
    })
    .catch( (err) => {
      this.resource.startSnackBar("Error: " + err);
      this.erz.push(err)
    });
  }


}
