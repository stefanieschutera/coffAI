import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class MaterialModule {}
