import { Component } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) { }

}
