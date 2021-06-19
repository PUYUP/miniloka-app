import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss'],
})
export class ListingMapComponent implements OnInit {
  @Input('latitude') latitude: any;
  @Input('longitude') longitude: any;

  @ViewChild('map', { static: true }) map: ElementRef;

  selectedLatitude: string;
  selectedLongitude: string;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  private initMap(): void {
    let mymap = L.map(this.map.nativeElement, {
      center: [this.latitude, this.longitude],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 40,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(mymap);

    var marker = new L.marker([this.latitude, this.longitude], {
      draggable: true,
      autoPan: true,
    }).addTo(mymap);

    const onDragEnd = (e: any) => {
      this.selectedLatitude = e.target._latlng.lat;
      this.selectedLongitude = e.target._latlng.lng;
    };
    marker.on('dragend', onDragEnd);

    const onMapClick = (e: any) => {
      marker.setLatLng(e.latlng);

      this.selectedLatitude = e.latlng.lat;
      this.selectedLongitude = e.latlng.lng;
    };
    mymap.on('click', onMapClick);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      latitude: this.selectedLatitude,
      longitude: this.selectedLongitude,
    });
  }
}
