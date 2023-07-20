import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-storesetting',
  templateUrl: './storesetting.component.html',
  styleUrls: ['./storesetting.component.scss'],
})
export class StoresettingComponent implements OnInit {
  store$: Observable<any> = of();
  storeId: string = '';
  db: any = [];
  submitForm: any;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.auth.user$.pipe(take(1)).subscribe((mine) => {
      this.auth
        .getMyStore(mine.uid) //.pipe(take(1))
        .subscribe((storeRef: any) => {
          console.log('storeId', storeRef);
          this.storeId = storeRef[0].id;
          this.store$ = of(storeRef);
          if (storeRef[0]) {
            console.log('store', storeRef[0]);
            this.http
              .get('https://backend-staging.refr.club/category')
              .subscribe((categories: any) => {
                console.log('categories', categories);
                this.auth.getCategoryList().subscribe((firbaseCategories) => {
                  const firebaseCategory: any = firbaseCategories.find(
                    (fc: any) => fc.id === storeRef[0].cat
                  );
                  console.log('firbaseCategory', firebaseCategory);
                  const category = categories.find(
                    (c: any) =>
                      String(c.title).toLocaleLowerCase().trim() ===
                      String(firebaseCategory.title).toLocaleLowerCase().trim()
                  );
                  console.log('category', category);

                  const firebaseSubCategory = firebaseCategory.items.find(
                    (fsc: any) => fsc.id === storeRef[0].subCat
                  );
                  console.log('firebaseSubCategory', firebaseSubCategory);

                  this.http
                    .get(
                      `https://backend-staging.refr.club/category/${category._id}/subcategory`
                    )
                    .subscribe((subcategories: any) => {
                      const subCategory = subcategories.find(
                        (sb: any) =>
                          String(sb.title).trim().toLocaleLowerCase() ===
                          String(firebaseSubCategory.name)
                            .trim()
                            .toLocaleLowerCase()
                      );
                      console.log('subCategory', subCategory);

                      this.http
                        .get(
                          `https://backend-staging.refr.club/questionnaire/category/${category._id}/subcategory/${subCategory._id}`
                        )
                        .subscribe((questionnaires: any) => {
                          console.log(questionnaires);
                          const formKeyGenerator: any = {};
                          questionnaires.forEach(
                            (question: any) =>
                              (formKeyGenerator[question._id] = '')
                          );
                          this.submitForm =
                            this.formBuilder.group(formKeyGenerator);
                          this.db = questionnaires;
                        });
                    });
                });
              });
          }
        });
    });
  }

  onSubmit(value: any): void {
    let keys = Object.keys(value);
    let values = Object.values(value);
    let subobj: any[] = [];
    for (let i = 0; i < keys.length; i++) {
      subobj.push({
        question: keys[i],
        answer: values[i],
        firebaseStoreId: this.storeId,
      });
    }
    this.SubmitAns(subobj)
  }

  ngOnInit(): void {}

  async SubmitAns(postdata:any) {
    try {
      const response = await fetch('https://backend-staging.refr.club/questionnaire/answer', {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok && response.status == 201) {
        this.auth.resource.startSnackBar("Thanks for submitting ")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
}
