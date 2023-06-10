import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { EntryType, stringToEntryType } from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Location } from '@angular/common';
@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.scss']
})
export class EntryAddComponent {
  entryType: EntryType | null = null;
  entryTypeString: string | null = null;
  form: FormGroup = new FormGroup({});
  hide = true;


  selectedFile: File | undefined;
  constructor(private readonly route: ActivatedRoute, private fb: FormBuilder, private _location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      first()
    ).subscribe(
      paramMap => {
        const entryType = paramMap.get('entryType');
        if (entryType) {
          this.entryType = stringToEntryType(entryType);
          this.entryTypeString = entryType
        }
      }
    );
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      details: [null, [Validators.required]]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  backClicked() {
    this._location.back();
  }
}