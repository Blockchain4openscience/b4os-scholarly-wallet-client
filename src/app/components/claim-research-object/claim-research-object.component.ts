import { ResearchObjectsService } from 'src/app/services/research-objects.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  candidates: any[];
  source: string;
}

@Component({
  selector: 'b4os-claim-research-object',
  templateUrl: './claim-research-object.component.html',
  styleUrls: ['./claim-research-object.component.css']
})
export class ClaimResearchObjectComponent implements OnInit {
  candidates: any[];
  source: string;
  claiming = false;

  constructor(
    public dialogRef: MatDialogRef<ClaimResearchObjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private researchObjectsService: ResearchObjectsService
  ) {
    this.candidates = data.candidates;
    this.source = data.source;
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  claim(researchObjects: Array<any>) {
    this.claiming = true;
    this.researchObjectsService
      .claim(researchObjects.map(option => option.value), this.source)
      .subscribe(result => {
        this.claiming = false;
        if (result) {
          this.dialogRef.close(true);
        }
      });
  }
}
