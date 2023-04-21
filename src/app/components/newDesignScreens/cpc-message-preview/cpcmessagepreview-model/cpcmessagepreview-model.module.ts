import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpcmessagepreviewModelRoutingModule } from './cpcmessagepreview-model-routing.module';
import { CpcMessagePreviewComponent } from '../cpc-message-preview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CpcMessagePreviewComponent],
  imports: [
    CommonModule,
    CpcmessagepreviewModelRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CpcmessagepreviewModelModule { }
