import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  @Input() polishName: string = '';
  @Input() englishName: string = '';
  @Input() isInputDisabled: boolean = false;

  @Output() polishNameChange: EventEmitter<string> = new EventEmitter();
  @Output() englishNameChange: EventEmitter<string> = new EventEmitter();

  // When polishName input changes
  onPolishNameChange(newValue: string) {
    this.polishNameChange.emit(newValue);
  }

  // When englishName input changes
  onEnglishNameChange(newValue: string) {
    this.englishNameChange.emit(newValue);
  }
}
