import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableLoaderComponent } from './components/table-loader/table-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    MainViewComponent,
    NavbarComponent,
    TableLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
