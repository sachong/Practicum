export interface FlightPlanCommand {
  latitude: number;
  longitude:number;
  altitude: number;
  }
  
  export interface FlightPlan {
    flightPlan: FlightPlanCommand[];
    locationID: number;
  }