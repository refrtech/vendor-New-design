import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-customattributescreen',
  templateUrl: './customattributescreen.component.html',
  styleUrls: ['./customattributescreen.component.scss']
})
export class CustomattributescreenComponent {

  message:string = `
  Hey 👋
  I highly recommend 'Store Name' for its highlights.
  
  Click the link below to use my recommendation & get rewarded on your purchase!
  
   https://refrclub.com/yourstore 
  REFR- Discover the best through friends`;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  attributeCtrl = new FormControl();
  filteredattribute: Observable<string[]>;
  attribute: string[] = [' Testing attribute one'];
  allFruits: string[] = [' Testing attribute one', ' Testing attribute one', ' Testing attribute one', ' Testing attribute one', ' Testing attribute one'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;


  constructor() { 
    this.filteredattribute = this.attributeCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit(): void {
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.attribute.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.attributeCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.attribute.indexOf(fruit);

    if (index >= 0) {
      this.attribute.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.attribute.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.attributeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
