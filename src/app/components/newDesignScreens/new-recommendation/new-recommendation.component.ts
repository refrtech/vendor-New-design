import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { NewCampaignComponent } from '../../store-create/new-campaign/new-campaign.component';

@Component({
  selector: 'app-new-recommendation',
  templateUrl: './new-recommendation.component.html',
  styleUrls: ['./new-recommendation.component.scss']
})
export class NewRecommendationComponent implements OnInit {
  TransationdataSource!: MatTableDataSource<any>;
  OrderColumns: string[] = [
    'Tran_details',
    'User_details',
    'Interaction',
    'Refr_Token',
  ];

  data:any = [{
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },

];

  constructor(
    private dailog: MatDialog,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.TransationdataSource = new MatTableDataSource(this.data);
  }


  // orderDetails(){
  //   const dialogRef = this.dailog.open(OrderDetailsComponent, {
  //     width: "30%",
  //     maxHeight:'80%',
  //     hasBackdrop: true,
  //     disableClose: false,
  //     panelClass: 'OrderDetails'
  //   });

  // }


  createNew(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(NewCampaignComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      height:h,
      data:{enableDirect:true},
      disableClose: true,
      panelClass:"dialogLayout"//, autoFocus:false
    });

    refDialog.afterClosed().subscribe(ref =>{
      if(!ref || !ref.id){}else{
        // if(this.userData){
          //this.execute(this.userData);
          // const costX = (ref.tX !== 'tC') ? this.campCost(ref.tX) : ref.payCustom
          // const amRate = this.auth.resource.campaignPlans;
          // const amCamp = costX;
          // //const amMerc = this.getMerchCost() || 0;
          // const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          // const amCost = costX;
          // const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          // const amTotal = costX;
          // this.startPayment( this.userData.uid, ref.tX, amRate, amCamp,
          //   //amMerc,
          //   amSale,amCost,amSave,amTotal
          //   //this.userData.uid, //ref.storeCamp
          //   )
        // }
      }
    })
    //this.auth.resource.router.navigate(["/store/create-campaign"])
  }

}
