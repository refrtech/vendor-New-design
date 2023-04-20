import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { AddProductComponent } from '../../store-create/add-product/add-product.component';
import { UploadProductComponent } from './upload-product/upload-product.component';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CropperComponent } from 'src/app/placeholders/cropper/cropper.component';
import { FormControl, Validators } from '@angular/forms';
import { DependencyService } from 'src/app/services/dependency.service';
import { Router } from '@angular/router';

// import * as XLSX from 'xlsx';
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  userID = "";
  storeID = "";
  productID = "";
  userData:User | undefined;
  productCat: string[]= [];
  store$: Observable<any> = of();
  product$: Observable<any[]> = of();
  editProduct:any = null;
  makingChanges = false;
  storeProduct = {
    storeID:"", by:"",
    productName:"",
    description:"",
    price:<number><unknown>undefined,
    cost:<number><unknown>undefined,
    quota:<number><unknown>undefined,
    category:"",
    code:"",
    variants:<any[]>[],
    warranty:true,
    content:true,
    //exchange:true,
  }

  productCurrent = {
    productName:"",
    description:"",
    price:<number><unknown>undefined,
    cost:<number><unknown>undefined,
    quota:<number><unknown>undefined,
    category:"",
    code:"",
    variants:<any[]>[],
    warranty:true,
    content:true,
    //exchange:true,
  };

  submitFirst = false;
  disableForm = false;
  imageUrlLogo:any[] = [];
  imageUrlLogoBurn:any[] = [];
  choose = {
    size:"",
    color:"",
    material:"",
    titles: <string[]>[],
    title:"", about:"",
    //COD: false
  }

  categoryList:any[] = []

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public router:Router,
    public dependancy:DependencyService
    ) { 
      this.dependancy.activeroute = this.router.url;
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        this.userID = mine.uid;
        this.userData = mine;
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
            this.storeID = mine.storeLoc[0];

          if(mine.storeCam?.length > 0){
            this.execute(mine);
          }else{
            console.log("CREATE CAMP")
            // GO TO CREATE CAMP
            //this.auth.resource.router.navigate(["/store/create-campaign"]);
          }
        }else{
          console.log("CREATE STORE")
          // GO TO CREATE STORE
          //this.auth.resource.router.navigate(["/store/create-location"]);
        }
      }
      
    })
  }





  createNew(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(AddProductComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      height:h,
      data:{enableDirect:true},
      disableClose: true,
      panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref =>{
      if(ref.id){
        if(this.userData){
          this.execute(this.userData);
        }
      }
    })
    //this.auth.resource.router.navigate(["/store/add-product"])
  }

  startEditor(product:any){
    if(!product.id){

    }else{
    this.productID = product.id;
    this.editProduct = product;

    this.storeProduct = {
      storeID:product["sid"], by:product["by"],
  
      productName:product["title"],
      description:product["description"],
      price:product["price"],
      cost:product["cost"],
      category:product["category"],
      code:product["code"],
      variants:product["variants"],
  
      warranty:product["warranty"],
      content:product["content"],

      quota:product["quota"] || 0,
      //exchange:true,
    }

    this.productCurrent = {
  
      productName:product["title"],
      description:product["description"],
      price:product["price"],
      cost:product["cost"],
      category:product["category"],
      code:product["code"],
      variants:product["variants"],
  
      warranty:product["warranty"],
      content:product["content"],

      quota:product["quota"] || 0,
      //exchange:true,
    }
    if(product["banners"].length > 0){
      this.imageUrlLogo = product["banners"]
    }

    }
  }

  execute(mine:User){


    //this.productID = product["id"];
    this.auth.getStoreByID( this.storeID ).then(storeRef => {
      const store:any = storeRef.exists() ? storeRef.data() : null;
      if(!store){

      }else{
        this.storeID = store["id"];
        this.store$ = of(store);
        this.getProductList(mine.uid);

      }
    })
  }

  getProductList(uid:string){
    this.product$ = this.auth.getAllMyProductByUID(uid) //.pipe(take(1));
    this.product$.pipe(take(1)).subscribe(p => {
      if(!p || p.length == 0){
        this.productCat = [];
      }else{
        this.productCat = [];
        for (let i = 0; i < p.length; i++) {
          if(!this.productCat.includes(p[i].category)){
            this.productCat.push(p[i].category)
          }
        }
      }
    })
  }

  createBulk(productList: any[]){
    let w = (this.auth.resource.getWidth - 16) + "px";
    let h = (this.auth.resource.getHeight - 16) + "px";
    console.log(this.userID, this.storeID, this.productCat)

    if(this.userID && this.storeID){
    const refDialog = this.auth.resource.dialog.open(UploadProductComponent, {
      width: w, maxWidth: "480px",
      height: h, maxHeight: "340px",
      data:{
        userID: this.userID,
        storeID: this.storeID,
        //cat:,
        productCat: this.productCat,
      },
      disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
    })
    refDialog.afterClosed().subscribe(ref =>{
      if(!ref){

      }else{
        this.auth.resource.startSnackBar("Creating " + ref.length + " Products...");
        console.log("MANHANDLE: ", ref, productList)

        if(productList){
          if(productList.length == 0){
            this.startBulkUpload(ref);
          }else{
        let newALL = true;

    for (let i = 0; i < ref.length; i++) {
      const element = ref[i];

      if( productList.findIndex((p:any) => {
        let x = element.productName == p.title;
        console.log("GIRL", element.productName, p.title, x);
        return x;
      }) >= 0 ){
        newALL = false;
        console.log("MATCH")
      }

      if( ref.length == (i+1) ){
        if(!newALL){
          this.auth.resource.startSnackBar("Products with same name already exist.");
        }else{
          this.startBulkUpload(ref);
        }
      }

    }
          }
        }
      }
    })
    }

  }


  startBulkUpload(data:any[]){
    const products = [];

    console.log(data)

    for (let p = 0; p < data.length; p++) {
      const storeProduct = data[p];
      this.addNewProduct(storeProduct)
      .then((ref:any) => {
        this.auth.resource.startSnackBar("The new product been created.");
      }).catch(err => {
        console.log(err)
      }).finally(() => {

      if(data.length == (p+1) ){
        if(this.userData){
          this.execute(this.userData);
        }
      }
      })
    }

  }

  addNewProduct(storeProduct:any){
    return this.auth.addProduct(storeProduct, [])
  }

  reqEx(id:string){
    this.makingChanges = true;
    this.auth.reqBurn(id).then(() => {
      this.makingChanges = false;
    })
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
      console.log(v.title, title) //?.toLowerCase().toLowerCase()
      return v.title == title && v.type == type;
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
        data:{webPath:webPath, type:'logo'},
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

if( type == 'logo'){
          this.auth.addProductBanners(this.productID, result.croppedImage ).then(ref => {
            if(!ref || !ref.success){
              this.auth.resource.startSnackBar("Upload Failed!");
              this.disableForm = false;
            }else{
              //this.storeBannersList.push(ref.url)
              this.imageUrlLogo.push(ref.url);

              // if(this.storeBannersList.length == 1){
              //   this.storeBannersActive = this.storeBannersList[0];
              // }
              this.auth.resource.startSnackBar("Product Pics Update Under Review!");
              this.disableForm = false;
            }
          });
}
/*
if( type == 'logoBurn'){
          this.master.addProductBurnBanners(this.productID, result.croppedImage ).then(ref => {
            if(!ref || !ref.success){
              this.auth.resource.startSnackBar("Upload Failed!");
              this.disableForm = false;
            }else{
              //this.storeBannersList.push(ref.url)
              this.burnProduct.pics.push(ref.url);
              if(this.burnProduct.pics.length == 1){
                this.burnProduct.pic = ref.url;
              }

              // if(this.storeBannersList.length == 1){
              //   this.storeBannersActive = this.storeBannersList[0];
              // }
              this.auth.resource.startSnackBar("Product Pics Update Under Review!");
              this.disableForm = false;
            }
          });
}
*/
            //this.imageUrlLogo.push(result.croppedImage);
        }
      })
    }
    
  }

  removeProductBanner( type:string, resultImage:string ){
    
    this.disableForm = true;
/*
if( type == 'logo'){
    this.auth.removeProductBanners(this.productID, resultImage ).then(() => {
      //this.storeBanner = resultImage;
      const ind = this.imageUrlLogo.indexOf(resultImage);
      this.imageUrlLogo.splice( ind, 1 );
      // if(this.storeBannersList.length > 0){
      //   this.storeBannersActive = this.storeBannersList[0];
      // }else{
      //   this.storeBannersActive = "";
      // }
      this.auth.resource.startSnackBar("Pic removed.");
      this.disableForm = false;
      //this.auth.resource.last.enable();
    });
}

if( type == 'logoBurn'){
  this.master.removeProductBurnBanners(this.productID, resultImage ).then(() => {
    //this.storeBanner = resultImage;
    const ind = this.imageUrlLogo.indexOf(resultImage);
    this.imageUrlLogo.splice( ind, 1 );
    // if(this.storeBannersList.length > 0){
    //   this.storeBannersActive = this.storeBannersList[0];
    // }else{
    //   this.storeBannersActive = "";
    // }
    this.auth.resource.startSnackBar("Pic removed.");
    this.disableForm = false;
    //this.auth.resource.last.enable();
  });
}
*/
  
}


invalidRate(rate:number){ const newNum  = new FormControl(rate, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }
invalidPhone(phone:string){ const newNum  = new FormControl(phone, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }
  get checkIfCan(){
    return this.storeProduct.productName == this.productCurrent.productName &&
    this.storeProduct.description == this.productCurrent.description &&
    this.storeProduct.price == this.productCurrent.price &&
    this.storeProduct.cost == this.productCurrent.cost &&
    this.storeProduct.category == this.productCurrent.category &&
    this.storeProduct.code == this.productCurrent.code &&
    //this.storeProduct.variants.toString() == this.productCurrent.variants.toString() &&
    
    this.storeProduct.warranty == this.productCurrent.warranty &&
    this.storeProduct.content == this.productCurrent.content &&

    this.storeProduct.quota == this.productCurrent.quota;
  }
  
  updateStoreProduct(){
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
      this.updateProduct();
    }
  }
  

updateProduct(){
  // this.imageUrlLogo
  this.auth.updateProduct(this.productID, this.storeProduct).then((ref:any) => {
    this.auth.resource.startSnackBar("The product has been updated.");
    this.disableForm = false;
    // if(this.enableDirect){
    //   //this.dialogRef.close({id:ref.id})
    // }else{
    //   this.auth.resource.router.navigate(["/dash"])
    // }
  }).catch(err => {
    console.log(err)
  })
}


  
}
