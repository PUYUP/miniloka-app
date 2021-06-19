import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectSecurity } from 'src/app/store/selectors/person.selectors';
import { SecurityEditorComponent } from '../security-editor/security-editor.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  security$: Observable<any>;
  security: any;

  constructor(
    private store: Store<AppState>,
    public modalController: ModalController
  ) {
    this.security$ = this.store.pipe(select(SelectSecurity));
    this.security$.subscribe((payload: any) => {
      this.security = payload;
    });
  }

  ngOnInit() {}

  async presentEditor() {
    const modal = await this.modalController.create({
      component: SecurityEditorComponent,
      componentProps: { data: this.security },
      backdropDismiss: false,
    });

    await modal.present();
  }

  showEditor() {
    this.presentEditor();
  }
}
