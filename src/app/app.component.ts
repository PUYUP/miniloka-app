import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isApp: boolean = true;

  constructor(private platform: Platform) {
    if (!this.platform.is('cordova')) {
      this.isApp = false;
    }
  }
}
