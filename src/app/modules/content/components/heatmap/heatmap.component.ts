import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import * as leaflet from 'leaflet';
import 'heatmap.js';


declare const HeatmapOverlay: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit{


  private map: any;
  @Input() fileData: any;

  ngOnInit() {
    // this.initMap();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['fileData'] && this.fileData) {
      this.initMap();
    }
  }

  private initMap(): void {
    console.log(typeof this.fileData);

    this.map = leaflet.map('map', {
      center: [ 31.774168520545583, -106.4987887495057 ],
      zoom: 16
    });

    // Initialising tiles to the map by using openstreetmap
    // Setting zoom levels
    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Adding tiles to the map
    tiles.addTo(this.map);

    // Setting up heat layer config

    const heatLayerConfig = {
      "radius": .001,
      "maxOpacity": .8,
      "scaleRadius": true,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };

    // Initialising heat layer and passing config
    const heatmapLayer = new HeatmapOverlay(heatLayerConfig);

    //Passing data to a layer
    heatmapLayer.setData(this.fileData);

    //Adding heat layer to a map
    heatmapLayer.addTo(this.map);
  }
}