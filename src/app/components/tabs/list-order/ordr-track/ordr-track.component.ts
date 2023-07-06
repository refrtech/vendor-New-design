import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-ordr-track',
  templateUrl: './ordr-track.component.html',
  styleUrls: ['./ordr-track.component.scss']
})
export class OrdrTrackComponent implements OnInit {

  payment:any = null;
  show = false;

  constructor(
    public depends: DependencyService,
    public auth: AuthService,
    public pay: PaymentService,
    private dialogRef: MatDialogRef<OrdrTrackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.payment = data.ordr;

    const shipID = this.payment.shipCreate.y3Order.shipment_id;
    const shipToken = this.payment.shipCreate.y1Login.token;
    if(this.payment.id && shipID && shipToken){
    this.trackShipment(this.payment.id, shipID, shipToken)
    }
  }

  ngOnInit(): void {
  }



  trackShipment(id:string, shipID:string, shipToken:string){
    this.depends.trackShipment("IN", shipID, shipToken)//.pipe()
    .subscribe((res:any) => {
      if(!res || !res.success || !res.data ){

      }else{
        this.pay.updateShiping(id, res.data).then(() => {
          this.show = true;
        })
        // STATUS CODE	DESCRIPTION
        // 0
        // 6	Shipped
        // 7	Delivered
        // 8	Cancelled
        // 9	RTO Initiated
        // 10	RTO Delivered
        // 11	Pending
        // 12	Lost
        // 13	Pickup Error
        // 14	RTO Acknowledged
        // 15	Pickup Rescheduled
        // 16	Cancellation Requested
        // 17	Out For Delivery
        // 18	In Transit
        // 19	Out For Pickup
        // 20	Pickup Exception
        // 21	Undelivered

        if(
          res.data.shipment_status == 0 ||
          res.data.shipment_status == 8 ||
          res.data.shipment_status == 16 ||

          res.data.shipment_status == 7
          //res.data.track_status == 0
          ){
          const w = res?.data?.shipment_track[0]?.weight
          this.dialogRef.close({success:true, status:res.data.shipment_status, weight:(+w||0) })
        }

      }
    })
  }

}
