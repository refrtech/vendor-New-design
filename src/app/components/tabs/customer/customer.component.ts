import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Contacts } from '@capacitor-community/contacts'
import { of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';

export interface PermissionStatus {
  granted: boolean;
}

export interface Contact {
  contactId: string;
  displayName?: string;
  phoneNumbers: PhoneNumber[];
  emails: EmailAddress[];
  photoThumbnail?: string;
  organizationName?: string;
  organizationRole?: string;
  birthday?: string;
}

export interface PhoneNumber {
  label?: string;
  number?: string;
}

export interface EmailAddress {
  label?: string;
  address?: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  //exist: boolean;
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['check', 'name', "action1", "action2"];
  activated: number = 1;
  Eusercontacts!: MatTableDataSource<UserData>;
  newusercontacts!: MatTableDataSource<UserData>;
  Eusercontactlist: Array<UserData> = [];
  newusercontactlist: Array<UserData> = [];
  userID = "";
  currentContacts: any[] = [];
  storename = "";
  shareUrlB1 = "";
  shareUrlP1 = "";

  constructor(
    private socialSharing: SocialSharing,
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    public router:Router,
    public dependancy:DependencyService
  ) {
    this.dependancy.activeroute = this.router.url;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.syncContact();
      // this.roshaninput.nativeElement.focus();
    }, 3000);
    // setTimeout(() => {
    //   this.execute();
    // }, 3000);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  activate(index: number) {
    this.activated = index;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Eusercontacts.filter = filterValue?.trim().toLowerCase();
    if (this.Eusercontacts.paginator) {
      this.Eusercontacts.paginator.firstPage();
    }
    this.newusercontacts.filter = filterValue?.trim().toLowerCase();
    if (this.newusercontacts.paginator) {
      this.newusercontacts.paginator.firstPage();
    }
  }

  // execute(){
  //   // Create 100 users
  //   const users: any[] = [
  //      {name:"Name1", email:"email1@example.com", phone:"+919876543210", exist: true},
  //      {name:"Name2", email:"email2@example.com", phone:"+919876543211", exist: false}
  //   ];

  //   this.dataSource = new MatTableDataSource(users);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.showData = true;
  // }







  async syncContact() {
    let result: any;
    if (result != undefined) {
      for (let i = 0; i < result.contacts.length; i++) {
        const element = result.contacts[i];
        if (element.displayName && element.contactId && element.phoneNumbers.length) {

          const newCon: any[] = [{
            displayName: element.displayName,
            contactId: element.contactId,
            phoneNumber: element.phoneNumbers[0].number,
          }];
          this.Eusercontacts = new MatTableDataSource(newCon);
        }
      }
    }
    else {
      this.Eusercontactlist = []
      this.newusercontactlist = [];

      // const gotIT = [
      //   { name: "Name1", email: "email1@example.com", phone: "9167452128" },
      //   { name: "Name2", email: "email2@example.com", phone: "1234567801" },
      // ]

      await Contacts.getContacts().then(result => {
        const gotIT = result.contacts;
        this.execute(gotIT)

      }).catch(err => {
        // this.newContacts = [];
        // this.loading = false;
        // this.errorContacts = true;
        this.execute([])
        this.auth.resource.startSnackBar("Unable to Sync Contacts.")
      });

    }
  }

  execute(gotIT: Contact[]) {
    let newlist: any[] = []

    for (let index = 0; index < gotIT.length; index++) {
      let element: any = {
        name: gotIT[index].displayName || "",
        //email: gotIT[index].emails[0]?.address || "",
        phone: gotIT[index].phoneNumbers[0].number || ""
      };

      if (element.name && element.phone) {
        newlist.push(element)
      }
    }


    this.auth.user$.pipe(take(1)).subscribe((mine: any) => {
      if (!mine) {

      } else {
        this.userID = mine.uid;

        this.auth.getMyStore(mine.uid)//.pipe(take(1))
          .subscribe((storeRef: any) => {
            if (storeRef[0]) {
              this.storename = storeRef[0].name;
              this.shareUrlB1 = storeRef[0].shareUrlB1;
              if (storeRef[0].addedDynamicLinkP1) {
                this.shareUrlP1 = storeRef[0].shareUrlP1;
              }
            }
          })



        this.auth.getContacts(mine.uid).then(ref => {
          const data: any = ref.exists() ? ref.data() : { uid: mine.uid, list: [] }
          if (!data || !data.list) {

          } else {
            const list = data.list || [];
            for (let c = 0; c < list.length; c++) {
              const element = list[c];
              let iX = newlist.findIndex(x => x.phone == element.phone);
              if (iX == -1) {
                newlist.push(element)
              }
            }
            for (let v = 0; v < newlist.length; v++) {
              const element = newlist[v];

              this.auth.checkContacts(element.phone).then(x => {
                if (x.success) {
                  let exist = x.exist;
                  if (!exist) {
                    element["exist"] = false;
                    this.newusercontactlist.push(element);
                  } else {
                    element["exist"] = true;
                    this.Eusercontactlist.push(element);
                  }

                  if (newlist.length == v + 1) {
                    this.Eusercontacts = new MatTableDataSource(this.Eusercontactlist);
                    this.newusercontacts = new MatTableDataSource(this.newusercontactlist);
                    if (newlist.length > 0) {
                      this.currentContacts = newlist;
                    }
                    if (newlist.length > 0 && data.list.length !== newlist) {
                      this.auth.updateContacts(mine.uid, newlist).then(() => {})
                    }
                  }
                }
              })
            }
          }
        })
      }
    })
  }


  whatappshare(row: any) {
    const data = {
      message: `We now invite you to become our brand voice through Refr.
    Give us a shoutout to your friends & get rewarded on every successful referral/conversion.
    Click the link below & start sharing!
    Thankyou,
    Refr X ${this.storename}`,
      subject: "Hi, Thanks for being a part of " + this.storename + (this.storename[this.storename.length - 1] !== "s" ? "'s" : "") + " journey 😊",
      url: this.shareUrlP1
    }

    const textBODY = `${data.subject}
${data.message}
${data.url}`;

    if (!this.auth.resource.appMode) {
      const X = window.encodeURIComponent(textBODY)
      const wa = `https://wa.me/?${'phone=' + row.phone + '&text=' + X}`;
      window.open(wa, "_blank");
    } else {
      this.socialSharing.canShareVia("whatsapp").then((res) => {
        this.socialSharing.shareViaWhatsApp(textBODY, "", "").then(res => {
          //this.erz.push("res: " + res)
        }).catch(err => {
        })
      }).catch(e => {
        this.auth.resource.startSnackBar("Error: " + e)
      })
    }
  }

  invitesmsuser(row: any) {
    const data = {
      message: `We now invite you to become our brand voice through Refr.
    Give us a shoutout to your friends & get rewarded on every successful referral/conversion.
    Click the link below & start sharing!
    Thankyou,
    Refr X ${this.storename}`,
      subject: "Hi, Thanks for being a part of " + this.storename + (this.storename[this.storename.length - 1] !== "s" ? "'s" : "") + " journey 😊",
      url: this.shareUrlP1
    }

    const textBODY = `${data.subject}
${data.message}
${data.url}`;

    if (!this.auth.resource.appMode) {
      let comma = "";
      var userAgent = window.navigator.userAgent;
      if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        comma = ";";
      }
      else {
        comma = ",";
      }
      const url = "sms:" + comma + row.phone + "?" + "body=" + textBODY;
      // alert(url);
      window.open(url, "_blank");
    } else {
      this.socialSharing.shareViaSMS(textBODY, "")
    }
  }

  addcontact() {
    const bsRef = this.bottomSheet.open(NewCustomerComponent, {
      panelClass: 'newcontact', data: {}
    });
    bsRef.afterDismissed().subscribe(ref => {
      if (!ref || !ref.success) {
      } else {
        if (ref.name && ref.phone) {
          let iX = this.currentContacts.findIndex(x => x.phone == ref.phone);
          if (iX == -1) {
            let element: any = { name: ref.name, phone: ref.phone }
            this.currentContacts.push(element)
            this.auth.checkContacts(element.phone).then(xC => {
              if (xC.success) {
                let exist = xC.exist;
                if (!exist) {
                  element["exist"] = false;
                  this.newusercontactlist.push(element);
                } else {
                  element["exist"] = true;
                  this.Eusercontactlist.push(element);
                }
                this.auth.updateContacts(this.userID, this.currentContacts).then(() => {
                  this.Eusercontacts = new MatTableDataSource(this.Eusercontactlist);
                  this.newusercontacts = new MatTableDataSource(this.newusercontactlist);
                })
              }

            })



          } else {
            this.auth.resource.startSnackBar("Number already exists!")
          }
        }

      }
    })
  }

}
