import { Component, OnInit } from "@angular/core";
import { FlightPlan , FlightPlanCommand } from '../../models/flight-plan.model'
import { FlightPlanService } from '../../services/flight-plan.service';
import { Location } from "src/app/models/location";
import { MapService } from "src/app/services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  lat = 31.77333;
  lng = -106.50410;
  zoom = 16;
  isLoading = false;
  locations: Location[] = [];
  loc: number;
  markers: { lat: number; lng: number; draggable: boolean }[] = [];

  constructor(
    private flightPlanService: FlightPlanService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.mapService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onMapClick(event: any) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true,
    });
  }

  onMapReady(map: google.maps.Map) {}

  onMarkerDragEnd(markerIndex: number, event: any) {
    this.markers[markerIndex] = {
      ...this.markers[markerIndex],
      lat: event.coords.lat,
      lng: event.coords.lng,
    };
  }


  generateFlightPlan(){
    const flightplan: FlightPlan = {
      locationID: this.loc,
      flightPlan: [],
    };

    for (const marker of this.markers) {
      flightplan.flightPlan.push({
        latitude: marker.lat,
        longitude: marker.lng,
        altitude: 10,
      });
    } // Add missing closing brace

    this.isLoading = true;

    this.flightPlanService.saveFlightPlan(flightplan).subscribe(
      (response) => {
        console.log("Flight plan saved:", response);
        this.isLoading = false;
        this.clearMap();
      },
      (error) => {
        console.error("Error saving flight plan:", error);
        this.isLoading = false;
      }
    );
  }

  executeFlight() {
   
    const flightplan: FlightPlan = {
      locationID: this.loc,
      flightPlan: [],
    };

    for (const marker of this.markers) {
      flightplan.flightPlan.push({
        latitude: marker.lat,
        longitude: marker.lng,
        altitude: 10,
      });
    } // Add missing closing brace

    this.isLoading = true;

    this.flightPlanService.executeFlightPlan(flightplan).subscribe(
      (response) => {
        console.log("Flight plan saved:", response);
        this.isLoading = false;
        this.clearMap();
      },
      (error) => {
        console.error("Error saving flight plan:", error);
        this.isLoading = false;
      }
    );
  }

  resetMapCenter() {
    this.lat = 31.75253099985997;
    this.lng = -106.40242909183934;
  }

  clearMap() {
    this.markers = [];
    this.resetMapCenter();
    this.zoom = 16;
  }

 

  onLocationChange(event: any) {
    const locationId = parseInt(event.target.value);
    const selectedLocation = this.locations.find(location => location.id === locationId);
    this.loc = locationId;
    if (selectedLocation) {
      this.lat = selectedLocation.latitude;
      this.lng = selectedLocation.longitude;
      this.zoom = selectedLocation.zoom;
    }
  }
}