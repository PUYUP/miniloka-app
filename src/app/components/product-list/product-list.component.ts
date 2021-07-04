import { Component, Input, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Delete,
  Get,
  GetLoadMore,
} from 'src/app/store/actions/product.actions';
import { AppState } from 'src/app/store/reducers';
import {
  SelectProduct,
  SelectProducts,
} from 'src/app/store/selectors/product.selectors';
import { ProductListEditorComponent } from '../product-list-editor/product-list-editor.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input('listing_uuid') listing_uuid: string;
  @Input('visibility') visibility: string;

  products$: Observable<any>;

  loadMoreEvent: any;
  next: string;
  previous: string;

  constructor(
    private store: Store<AppState>,
    private platform: Platform,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  async presentProductEditor(item: any = null) {
    const modal = await this.modalController.create({
      component: ProductListEditorComponent,
      backdropDismiss: false,
      componentProps: {
        listing_uuid: this.listing_uuid,
        item: item,
      },
    });

    await modal.present();
  }

  async presentDeleteConfirm(item: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah yakin ingin menghapus?',
      buttons: [
        {
          text: 'Yakin',
          handler: () => {
            this.store.dispatch(Delete({ uuid: item.uuid }));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentActionSheet(item: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tindakan',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil-outline',
          handler: () => {
            this.presentProductEditor(item);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentDeleteConfirm(item);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  ngOnInit() {
    this.store.dispatch(Get({ listing_uuid: this.listing_uuid }));
    this.products$ = this.store.pipe(select(SelectProducts));
    this.products$.subscribe((res) => {
      this.next = res?.next;
      this.previous = res?.previous;

      if (this.loadMoreEvent) {
        if (res?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }
    });
  }

  addProduct() {
    this.presentProductEditor();
  }

  showTool(item: any) {
    this.presentActionSheet(item);
  }

  refresh() {
    this.store.dispatch(Get({ listing_uuid: this.listing_uuid }));
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(GetLoadMore({ next: this.next, isLoadMore: true }));
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }
}
