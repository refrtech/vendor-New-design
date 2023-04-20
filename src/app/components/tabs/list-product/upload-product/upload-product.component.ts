import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

  import * as XLSX from 'xlsx';
  type AOA = any[][];

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent implements OnInit {

  dataX: AOA = [[1, 2], [3, 4]];

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  storeData = {
    uid:"", sid:"", 
    // cat:"", 
    productCat:<string[]> [],
    // email:"", phone:""
  }
  makeChanges = true;



  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<UploadProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userID: string;
      storeID: string;
      // cat:string;
      productCat: string[];
      // email: string;
      // phone: string;
    }
  ) { 
    this.storeData = {
      uid:data.userID, 
      sid:data.storeID,
      productCat:data.productCat
    }

    this.makeChanges = false;
  }

  ngOnInit(): void {
  }

  invalidRate(rate:number){ const newNum  = new FormControl(rate, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }
  //invalidPhone(phone:string){ const newNum  = new FormControl(phone, [ Validators.pattern('^[0-9]+$') ]); return newNum.invalid; }
  
  onFileChange(evt: any) {
    this.makeChanges = true;

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      const productData: any[] = []
      //this.data = data;
      let isProper = true;
      console.log("whone: ", data)
      const uid = data[0][2];
      const emailORphone = data[0][4];
      const sid = data[1][2];
      const cat = data[1][4];

    if(!uid || !emailORphone || !sid || !cat){
      isProper = false;
      console.log("Invalid Fields");
      this.dialogRef.close()
    }else{




      for (let p = 0; p < data.length; p++) {
        //const element = data[p];
        if(p > 11 && data[p][0] == (p - 11) ){


          const storeProduct = {
            storeID:sid,
            by: uid,
            productName:data[p][1],
            description:data[p][2],
            //quantity: 3
            category:data[p][4],
            price:data[p][5],
            cost:data[p][6],
            code:data[p][7],

            content: cat == "food_and_beverages" ? (data[p][8] == "VEG" ? true: false) : true, //
            // for food only
            warranty: cat == "electronics" ? (data[p][9] == "YES" ? true: false) : true, //
            // for electronics only

            variants:<any[]>[],
            // set up later step
          }

          const variant = {
            type:data[p][10] || "",
            name:data[p][11] || ""
          }

          if(variant.type && variant.name){
            if( !productData.includes((m:any) => storeProduct.productName == m.productName) ){
              // put varients in productData
              console.log("NO INCLUDES")
              storeProduct.variants.push(variant)
            }else{
              // put varients in productData
              console.log("INCLUDES")
              let c = productData.findIndex(z => z.productName == storeProduct.productName)
              if( c >= 0){
                productData[c].variants.push(variant)
              }
            }
          }

          if(
      !storeProduct.storeID ||
      !storeProduct.productName ||
      !storeProduct.description ||
      !storeProduct.price || this.invalidRate(storeProduct.price) ||
      !storeProduct.cost || this.invalidRate(storeProduct.cost) ||
      storeProduct.price < storeProduct.cost ||
      !storeProduct.category ||
      !storeProduct.code 
          ){
            console.log("Invalid: ", storeProduct)
            isProper = false;

            if(!storeProduct.productName){
              console.log("Product name is required");
            }else{
              if(!storeProduct.description){
                console.log("Product description is required");
              }else{
                if(!storeProduct.price || this.invalidRate(storeProduct.price)){
                  console.log( !storeProduct.price ? "Market price is required":"Market price must be a number.");
                }else{
                  if(!storeProduct.cost || this.invalidRate(storeProduct.cost)){
                    console.log( !storeProduct.price ? "Selling price is required":"Selling price must be a number.");
                  }else{
                    if(storeProduct.price < storeProduct.cost){
                      console.log("Selling price must be greater or equal to Market price.");
                    }else{
                      if(!storeProduct.category){
                        console.log("Product category is required");
                      }else{
                        if(!storeProduct.code){
                          console.log("Product code is required");
                        }else{
                          console.log("Invalid Fields");
                        }
                      }
                    }
                  }
                }
              }
            }
            
          }else{
            if( !productData.includes((m:any) => storeProduct.productName == m.productName) ){
              productData.push(storeProduct);
            }
          }


        }

        if( data.length == (p+1) ){ 
          if(!isProper){
            let mes = "Document not proper.";
            console.log(mes)
            this.dialogRef.close()
          }else{
            this.dataX = productData; 
            console.log(this.dataX);
            this.dialogRef.close( this.dataX )
          }
        }
      }
      
    }


    };
    reader.readAsBinaryString(target.files[0]);
  }

  setUpFile(uid:string){
    console.log("storeINFO")
    if(!this.storeData.sid){
      this.auth.resource.startSnackBar("No store id provided.")
    }else{
      this.auth.getStore(this.storeData.sid).pipe(take(1)).subscribe((storeINFO:any) => {
        console.log("storeINFO: ", storeINFO)
        if(!storeINFO){
            this.auth.resource.startSnackBar("No store with such uid exist.")
          }else{
          
          if(uid !== storeINFO.by){
            this.auth.resource.startSnackBar("Something went wrong..")
          }else{

            const storeX = {
              uid:storeINFO.by, 
              sid:storeINFO.id,
              cat: storeINFO.cat,
              proCat: storeINFO.proCat, subCat: storeINFO.subCat,

              //productCat: this.storeData.productCat, 
              email:storeINFO.email, phone:storeINFO.phone
            }
            console.log(storeX)
            this.export(storeX.uid, storeX.sid, storeX.cat, storeX.email, storeX.phone)
          }
          
        }
      })
    }
  }



  export(uid: string, sid: string, cat: string, email: string, phone: string): void {    
    const sample: AOA = [
    [
        null,
        "uid",
        uid,
        "Contact",
        phone,
        email
    ],
    [
        null,
        "sid",
        sid,
        "Store Category",
        cat
    ],
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Food Only",
        "Electronix Only",
        "optional",
        "optional"
    ],
    [
        null,
        "Name",
        "Description",
        "Quantity",
        "Category",
        "MRP",
        "Discounted Price",
        "HSN / SAC Code",
        "Contents",
        "Warranty",
        "Variant type",
        "Variant name",
        "Image URL 1",
        "Image URL 2",
        "Image URL 3"
    ],
    [
        null,
        null,
        null,
        "FALSE / Number",
        null,
        null,
        null,
        null,
        "VEG/NON-VEG",
        "YES/NO"
    ],
    [
        "Some examples"
    ],
    [
        "eg 1. Common with Variants",
        "Haircut",
        "demo description",
        null,
        "Hair",
        99,
        100,
        null,
        null,
        null,
        "Hair",
        "Normal",
        "img/hair-haircut1.jpeg",
        "img/hair-haircut2.jpeg",
        "img/hair-haircut3.jpeg"
    ],
    [
        null,
        "Haircut",
        null,
        null,
        "Hair",
        null,
        null,
        null,
        null,
        null,
        "Hair",
        "Special"
    ],
    [
        "eg 2. Electronix",
        "Smartphone",
        "demo description",
        null,
        "Electronics",
        99,
        100,
        null,
        null,
        "YES"
    ],
    [
        "eg 3. Food",
        "Cake",
        "demo description",
        null,
        "Food",
        99,
        100,
        null,
        "VEG"
    ],
    [],
    [
        "Start from next line…"
    ],
    [
        1,
        "Product name",
        "some description",
        false,
        "some category",
        0,
        0,
        "hsn-code",
        "VEG",
        "YES",
        "type",
        "name"
    ],
    [
        2
    ],
    [
        3
    ],
    [],
    [],
    [],
    [],
    []
];

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sample);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const fileName: string = 'Refr-Product-Sheet.xlsx';
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

}
