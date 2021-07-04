import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { UpdateProfile } from 'src/app/store/actions/person.actions';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  @Input('data') data: any;

  formGroup: any = FormGroup;
  autoGrow: boolean = false;

  constructor(
    public modalController: ModalController,
    private platform: Platform,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      // Hide modal
      this.modalController
        .getTop()
        .then((v) => (v ? this.modalController.dismiss() : null));
    });
  }

  ngOnInit() {
    this.initForm();
  }

  ionViewDidEnter() {
    this.autoGrow = true;
  }

  initForm() {
    this.formGroup = this.fb.group({
      first_name: [
        this.data.first_name,
        [Validators.required, Validators.minLength(3)],
      ],
      address: [this.data.address],
    });
  }

  onSubmit() {
    this.dismiss();
    this.store.dispatch(UpdateProfile({ profile: this.formGroup.value }));
  }

  dismiss() {
    this.modalController
      .getTop()
      .then((v) =>
        v ? this.modalController.dismiss({ dimissed: true }) : null
      );
  }
}
