import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectProfile } from 'src/app/store/selectors/person.selectors';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<any>;
  profile: any;

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.profile$ = this.store.pipe(select(SelectProfile));
    this.profile$.subscribe((payload: any) => {
      this.profile = payload;
    });
  }

  ngOnInit() {}

  async presentEditor() {
    const modal = await this.modalController.create({
      component: ProfileEditorComponent,
      componentProps: { data: this.profile },
      backdropDismiss: false,
    });

    await modal.present();
  }

  showEditor() {
    this.presentEditor();
  }
}
