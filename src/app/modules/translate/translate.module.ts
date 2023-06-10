import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [TranslateModule],
  exports: [TranslateModule, LanguageSelectorComponent],
})
export class AppTranslateModule {}
