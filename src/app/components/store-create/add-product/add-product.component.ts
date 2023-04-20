import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, of, take } from 'rxjs';
import { CropperComponent } from 'src/app/placeholders/cropper/cropper.component';
import { AuthService } from 'src/app/services/auth.service';
import { Shop } from 'src/app/universal.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit {

  store$: Observable<any> = of();

  submitFirst = false;
  disableForm = false;

  storeProduct = {
    storeID:"", by:"",

    productName:"",
    description:"",
    price:<number><unknown>undefined,
    cost:<number><unknown>undefined,
    category:"",
    code:"",
    variants:<any[]>[],

    warranty:true,
    content:true,
    //exchange:true,
  }

  choose = {
    size:"",
    color:"",
    material:"",
    titles: <string[]>[],
    title:"", about:"",
    //COD: false
  }

  imageUrlLogo:any[] = [];
  //imageUrlBanner:any = "";

  enableDirect = false;

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: {enableDirect: boolean;}
  ) {
    // force route reload whenever params change;
    this.auth.resource.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    const urlX = this.auth.resource.router.url;
    console.log("urlX", urlX)
    if(urlX == '/my-inventory'){ this.enableDirect = true; }
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.execute();
    }, 3000);
  }

  async execute(){
    const currentUser = await this.auth.afAuth.currentUser;
    const uid = currentUser?.uid;
    if(!uid){

    }else{
      this.auth.getMyStore(uid).pipe(take(1)).subscribe((store:any[]) => {
        if(!store || !store[0] || !store[0].id){
          // Retry

        }else{
          this.storeProduct.storeID = store[0].id;
          this.store$ = of(store[0]);
          this.auth.user$.pipe(take(1)).subscribe(mine => {
            if(!mine){}else{
              //this.storeProduct.campaignName = 'Campaign-'+ (1 + mine.storeCam.length);
              this.storeProduct.by = mine.uid;
              //this.storeCamp.dateS = this.startDate.getMonth() + "/" + this.startDate.getDate() + "/" + this.startDate.getFullYear();
              //this.storeCamp.dateE;
            }
          })
        }
      })
    }
  }

  getVariants(type:string){
    return this.storeProduct.variants.filter((x:any) => {
      return x.type == type;
    })
  }
  getVariant(type:string, name:string){
    return this.storeProduct.variants.filter((x:any) => {
      return x.name.toLowerCase() == name.toLowerCase() && x.type == type;
    })
  }

  addNewVariant(type:string, x:string, title:string){
    const i = this.storeProduct.variants.filter((v:any) => {
      return v.name.toLowerCase() == x.toLowerCase() && v.type == type;
    })

    if(i.length > 0){
      if(type == 'variant'){
        const iX = this.storeProduct.variants.filter((v:any) => {
          return v.title?.toLowerCase() == title.toLowerCase() && v.type == type; //&& v.name == x;
        })
        console.log("i Got Hit", iX.length)
    
        if(iX.length == 1){
          console.log("i Got Hit 1")
          this.choose.titles.splice( this.choose.titles.findIndex(v => v.toLowerCase() == title.toLowerCase()), 1 );
        }
        this.storeProduct.variants.splice( this.storeProduct.variants.findIndex(v => v.name.toLowerCase() == x.toLowerCase() && v.title?.toLowerCase() == title.toLowerCase() && v.type == type ), 1 );

      }else{
        this.storeProduct.variants.splice( this.storeProduct.variants.findIndex(v => v.name.toLowerCase() == x.toLowerCase() && v.type == type && !v.title ), 1 );
      }
    }else{

      if(type == 'variant'){
        if(type && x && title){
          const data = {type, name:x, title:title};
          this.storeProduct.variants.push(data);
          if( !this.choose.titles.includes(title) ){
            this.choose.titles.push(title);
          }
        }else{
          console.log("enter Proper")
        }
      }else{
        const data = {type, name:x};
        this.storeProduct.variants.push(data);
      }
      
    }
  }
  removeVariantBulk( type:string, title:string ){
    const b = this.storeProduct.variants.filter((v:any) => {
      return v.title.toLowerCase() == title.toLowerCase() && v.type == type;;
    });
    for (let i = 0; i < b.length; i++) {
      this.addNewVariant(b[i].type, b[i].name, title)
    }
  }


  async takePicture(type:string){
    if(!this.disableForm){
      const image = await Camera.getPhoto({
        quality: 100,
        height: 300,
        width: 300,
        allowEditing: false,
        source:CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      console.log("image", image)
      const imageUrl = image.webPath || "";
      if(imageUrl){
      this.startCropper(imageUrl, type);
      console.log("image", imageUrl)
      }else{
        console.log("No image")
      }
    }
  }
  async choosePhoto(type:string){
    if(!this.disableForm){
      const image = await Camera.pickImages({
        quality: 100,
        height: 300,
        width: 300,
        limit: 1,
      });
      const imageUrl = image.photos[0].webPath || "";
      if(imageUrl){
      this.startCropper(imageUrl, type);
      console.log("image", imageUrl)
      }else{
        console.log("No image")
      }
    }
  }

  startCropper(webPath:string, type:string){
    if(!this.disableForm){
      let isPhone = this.auth.resource.getWidth < 768;
      let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
      let h = isPhone ? this.auth.resource.getHeight + "px" : "";
      const refDialog = this.auth.resource.dialog.open(CropperComponent, {
        width: w, minWidth: "320px", maxWidth: "480px",
        height:h,
        data:{webPath:webPath, type:type},
        disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
      });
      refDialog.afterClosed().subscribe(result =>{
        console.log("cropper closed")
        if(!result.success){
          if(result.info){
            console.log(result.info);
            this.auth.resource.startSnackBar(result.info)
          }
        }else{
            this.imageUrlLogo.push(result.croppedImage);
        }
      })
    }
  }


  createStoreProduct(){
    console.log(this.storeProduct)
    this.submitFirst = true;
    this.disableForm = true;

    if(
      !this.storeProduct.storeID ||
      !this.storeProduct.productName ||
      !this.storeProduct.description ||
      !this.storeProduct.price || this.invalidRate(this.storeProduct.price) ||
      !this.storeProduct.cost || this.invalidRate(this.storeProduct.cost) ||
      this.storeProduct.price < this.storeProduct.cost ||
      !this.storeProduct.category ||
      !this.storeProduct.code 
    ){
      if(!this.storeProduct.productName){
        this.auth.resource.startSnackBar("Product name is required");
      }else{
        if(!this.storeProduct.description){
          this.auth.resource.startSnackBar("Product description is required");
        }else{
          if(!this.storeProduct.price || this.invalidRate(this.storeProduct.price)){
            this.auth.resource.startSnackBar( !this.storeProduct.price ? "Market price is required":"Market price must be a number.");
          }else{
            if(!this.storeProduct.cost || this.invalidRate(this.storeProduct.cost)){
              this.auth.resource.startSnackBar( !this.storeProduct.price ? "Selling price is required":"Selling price must be a number.");
            }else{
              if(this.storeProduct.price < this.storeProduct.cost){
                this.auth.resource.startSnackBar("Selling price must be greater or equal to Market price.");
              }else{
                if(!this.storeProduct.category){
                  this.auth.resource.startSnackBar("Product category is required");
                }else{
                  if(!this.storeProduct.code){
                    this.auth.resource.startSnackBar("Product code is required");
                  }else{
                    this.auth.resource.startSnackBar("Invalid Fields");
                  }
                }
              }
            }
          }
        }
      }
      this.disableForm = false;
    }else{
      this.addNewProduct();
    }
  }

  addNewProduct(){
    this.auth.addProduct(this.storeProduct, this.imageUrlLogo).then((ref:any) => {
      this.auth.resource.startSnackBar("The new product been created.");
      if(this.enableDirect){
        this.dialogRef.close({id:ref.id})
      }else{
        this.auth.resource.router.navigate(["/dash"])
      }
      //if(!addNewLoc){
        //this.auth.resource.router.navigate(["/store/create-campaign"])
        // go to next route (create campaign)
      //}else{
        //this.resetRoute()
        //this.auth.resource.router.navigate(["/store/create-location"])
        // create new location redirect
      //}
    }).catch(err => {
      console.log(err)
    })
  }

invalidRate(rate:number){ const newNum  = new FormControl(rate, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }
invalidPhone(phone:string){ const newNum  = new FormControl(phone, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }


}


