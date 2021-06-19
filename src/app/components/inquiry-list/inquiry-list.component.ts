import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Delete,
  Get,
  GetLoadMore,
} from 'src/app/store/actions/inquiry.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiries } from 'src/app/store/selectors/inquiry.selectors';
import { InquiryEditorModalComponent } from '../inquiry-editor-modal/inquiry-editor-modal.component';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
})
export class InquiryListComponent implements OnInit {
  inquiries$: Observable<any>;
  actionSheetIsOpen: boolean = false;
  inquiryEditorIsPresent: boolean = false;

  loadMoreEvent: any;
  next: string;
  previous: string;

  constructor(
    private store: Store<AppState>,
    private platform: Platform,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) {
    this.store.dispatch(Get({}));
    this.inquiries$ = this.store.pipe(select(SelectInquiries));
    this.inquiries$.subscribe((res) => {
      this.next = res?.next;
      this.previous = res?.previous;

      if (this.loadMoreEvent) {
        if (res?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }
    });

    if (this.actionSheetController.getTop() || this.modalController.getTop()) {
      this.platform.backButton.subscribeWithPriority(
        10,
        (processNextHandler) => {
          if (this.actionSheetController.getTop()) {
            this.actionSheetController.dismiss();
          }

          if (this.modalController.getTop()) {
            this.modalController.dismiss();
          }

          processNextHandler();
        }
      );
    }
  }

  ngOnInit() {}

  async presentInquiryEditor(instance: any) {
    const modal = await this.modalController.create({
      component: InquiryEditorModalComponent,
      componentProps: {
        instance: instance,
      },
      backdropDismiss: false,
    });

    await modal.present().then(() => {
      this.inquiryEditorIsPresent = true;
    });

    const { role } = await modal.onDidDismiss();
    this.inquiryEditorIsPresent = false;
  }

  // TOOLS
  async presentTool(instance: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tindakan',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this.presentInquiryEditor(instance);
          },
        },
        {
          text: 'Hapus',
          icon: 'trash-outline',
          handler: () => {
            this.delete(instance.uuid);
          },
        },
        {
          text: 'Batal',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present().then(() => {
      this.actionSheetIsOpen = true;
    });

    const { role } = await actionSheet.onDidDismiss();
    this.actionSheetIsOpen = false;
  }

  showTool(instance: any) {
    this.presentTool(instance);
  }
  // END

  delete(uuid: string) {
    this.store.dispatch(Delete({ uuid: uuid }));
  }

  refresh() {
    this.store.dispatch(Get({}));
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(GetLoadMore({ next: this.next, isLoadMore: true }));
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }
}
