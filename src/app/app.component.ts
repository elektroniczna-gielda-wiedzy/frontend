import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from './modules/translate/language.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  titleSubscription?: Subscription;

  constructor(
    private languageService: LanguageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.languageService.init(environment.defaultLanguage);

    this.titleSubscription = this.languageService.languageChange.subscribe(
      () => {
        const translatedTitle = this.languageService.translate('app.title');
        this.titleService.setTitle(translatedTitle);
      }
    );
  }

  ngOnDestroy(): void {
    this.languageService.destroy();

    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
