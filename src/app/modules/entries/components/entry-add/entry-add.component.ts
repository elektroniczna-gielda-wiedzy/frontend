import { Component, ViewChild,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { EntryType, stringToEntryType , EntryHttpService, Category, CategoryHttpService} from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Location } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
  categories: Category[] = [];

  selectedFile: File | undefined;
  constructor(private readonly route: ActivatedRoute, private fb: FormBuilder, private _location: Location, private entryService: EntryHttpService , private categoryService: CategoryHttpService) { }

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
      'title': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'categories': [null, [Validators.required]]
      
    });
    this.categoryService.getCategories().subscribe(
      category => {
        this.categories = category.result
        console.log(category.result)
      }
    )
    
  
  }
  selectCategory(){
    (this.form.value.categories)
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  backClicked() {
    this._location.back();
  }

  createNewEntry(){
    if(this.entryType){
    this.entryService.createEntry({ entry_type_id: this.entryType , title: this.form.value.title , content: this.form.value.content , categories: this.form.value.categories , image: this.selectedFile?.toString()})
        .subscribe((response) => {
          console.log( response.result);
        });
    }
  }
}