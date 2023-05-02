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
  lat = 31.77333
  lng = -106.50410
  zoom = 16;
  isLoading: boolean = false;
  locations: Location [] = []

  markers: { lat: number; lng: number; draggable: boolean }[] = [];

  constructor(private flightPlanService: FlightPlanService,
                private mapService: MapService) {}

  ngOnInit() {
    this.getLocation();
  }


 
  getLocation(){
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
    this.markers.push({ lat: event.coords.lat, lng: event.coords.lng, draggable: true });
  }

  onMapReady(map: google.maps.Map) {
    
  }

  onMarkerDragEnd(markerIndex: number, event: any) {
    this.markers[markerIndex] = { ...this.markers[markerIndex], lat: event.coords.lat, lng: event.coords.lng };
  }
  generateUniqueFlightPlanId(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 100000);
    return `flightPlan-${timestamp}-${randomNum}`;
  }
  generateFlightPlan() {
    const flightPlanCommands: FlightPlanCommand[] = [
      {
        waypointId: 0,
        command: 'takeoff',
        mavCommand: 22, // MAV_CMD_NAV_TAKEOFF
        parameters: {
          altitude: 10,
        },
      },
    ];
  
    // ...
    let waypointId = 1
    for (const marker of this.markers) {
      flightPlanCommands.push({
        waypointId,
        command: 'waypoint',
        mavCommand: 16, // MAV_CMD_NAV_WAYPOINT
        parameters: {
          latitude: marker.lat,
          longitude: marker.lng,
          altitude: 20,
        },
      });
  
      // ...
  
      for (let angle = 0; angle < 360; angle += 10) {
        flightPlanCommands.push({
          waypointId,
          command: 'captureImage',
          mavCommand: 2000, // Custom command
          parameters: {},
        });
  
        flightPlanCommands.push({
          waypointId,
          command: 'rotate',
          mavCommand: 115, // MAV_CMD_CONDITION_YAW
          parameters: {
            angle: 10,
          },
        });
      }
  
      waypointId += 1;
    }
  

   

    const flightPlanId = this.generateUniqueFlightPlanId();

    const flightPlan: FlightPlan = {
      flightPlanId,
      flightPlan: flightPlanCommands,
    };


    console.log('Flight Plan:', flightPlan);

    this.isLoading = true;
   
    this.flightPlanService.saveFlightPlan(flightPlan).subscribe(
      (response) => {
        console.log('Flight plan saved:', response);
        this.isLoading = false;
        this.clearMap();

      },
      (error) => {
        console.error('Error saving flight plan:', error);
        this.isLoading = false;
      }
    );
  }




  executeFlight() {
    const flightPlanCommands: FlightPlanCommand[] = [
      {
        waypointId: 0,
        command: 'takeoff',
        mavCommand: 22, // MAV_CMD_NAV_TAKEOFF
        parameters: {
          altitude: 10,
        },
      },
    ];
  
    // ...
    let waypointId = 1
    for (const marker of this.markers) {
      flightPlanCommands.push({
        waypointId,
        command: 'waypoint',
        mavCommand: 16, // MAV_CMD_NAV_WAYPOINT
        parameters: {
          latitude: marker.lat,
          longitude: marker.lng,
          altitude: 20,
        },
      });
  
      // ...
  
      for (let angle = 0; angle < 360; angle += 10) {
        flightPlanCommands.push({
          waypointId,
          command: 'captureImage',
          mavCommand: 2000, // Custom command
          parameters: {},
        });
  
        flightPlanCommands.push({
          waypointId,
          command: 'rotate',
          mavCommand: 115, // MAV_CMD_CONDITION_YAW
          parameters: {
            angle: 10,
          },
        });
      }
  
      waypointId += 1;
    }
  

   

    const flightPlanId = this.generateUniqueFlightPlanId();

    const flightPlan: FlightPlan = {
      flightPlanId,
      flightPlan: flightPlanCommands,
    };


    console.log('Flight Plan:', flightPlan);

    this.isLoading = true;
   
    this.flightPlanService.executeFlightPlan(flightPlan).subscribe(
      (response) => {
        console.log('Flight plan saved:', response);
        this.isLoading = false;
        this.clearMap();

      },
      (error) => {
        console.error('Error saving flight plan:', error);
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
    if (selectedLocation) {
      this.lat = selectedLocation.latitude;
      this.lng = selectedLocation.longitude;
      this.zoom = selectedLocation.zoom;
    }
  }
}
