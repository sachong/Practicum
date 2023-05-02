import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { Location } from "src/app/models/location";
import { HeatmapService } from "src/app/services/heatmap.service";



declare const HeatmapOverlay: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: 'heatmap.component.html',
})
export class HeatmapComponent implements OnInit{
  private map: any;
  @Input() fileData: any;
  lat = 31.771019705843575;
  lng = -106.50449515146555;
  zoom = 16;
  isLoading: boolean = false;
  locations: Location [] = []
  dates: Date [] = []

  constructor(private heatmapService: HeatmapService){}

  ngOnInit(): void {
    this.getLocation();
    this.initMap();
  }
  

  getLocation(){
    this.heatmapService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //TODO: change filedata ondatechange and onlocationchange
  //obtain location change and or date change from heatmap
  onLocationChange(event: any) {
    const locationId = parseInt(event.target.value);
    const selectedLocation = this.locations.find(location => location.id === locationId);
    if (selectedLocation) {
      this.lat = selectedLocation.latitude;
      this.lng = selectedLocation.longitude;
      this.zoom = selectedLocation.zoom;
    }
  }


  
  onDateChange(event: any) {
    const locationId = parseInt(event.target.value);
    const selectedLocation = this.locations.find(location => location.id === locationId);
    if (selectedLocation) {
      this.lat = selectedLocation.latitude;
      this.lng = selectedLocation.longitude;
      this.zoom = selectedLocation.zoom;
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['fileData'] && this.fileData) {
      this.initMap();
    }
  }

  onMapReady(map: google.maps.Map) {
    
  }
  
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 31.771019705843575, -106.50449515146555 ],
      zoom: 16
    });

    this.fileData = {
      "data": [
        {"lat": 31.771019705843575, "lng": -106.50449515146555, "count": 8},
        {"lat": 31.771019705843570, "lng": -106.50449515146550, "count": 11},
        {"lat": 31.771019705843579, "lng": -106.50449515146542, "count": 7},
        {"lat": 31.771019705843583, "lng": -106.50449515146548, "count": 8},
        {"lat": 31.771019705843578, "lng": -106.50449515146530, "count": 4},
        {"lat": 31.771019705843559, "lng": -106.50449515146533, "count": 6},
        {"lat": 31.771019705843588, "lng": -106.50449515146561, "count": 7} 
      ]
    }

    // Initialising tiles to the map by using openstreetmap
    // Setting zoom levels
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
      // property below responsible for colorization of heat layer
      "useLocalExtrema": true,
      // here we need to assign property value which represent lat in our data
      latField: 'lat',
      // here we need to assign property value which represent lng in our data
      lngField: 'lng',
      // here we need to assign property value which represent valueField in our data
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