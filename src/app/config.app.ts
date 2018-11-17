import { TranslateService } from '@ngx-translate/core';
import { HostListener } from '@angular/core';

export class AppConfig {

    constructor(private translate?: TranslateService) {
        this.translate.setDefaultLang('en');
    }
    setLanguage(language) {
        this.translate.use(language);
    }
}
