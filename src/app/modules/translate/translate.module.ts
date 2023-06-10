import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [TranslateModule, MatButtonModule],
  exports: [TranslateModule, LanguageSelectorComponent],
})
export class AppTranslateModule {}
