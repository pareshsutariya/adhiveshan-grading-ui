import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";
import { Center } from "../models/center";

@Injectable({ providedIn: 'root' })
export class RegionCenterService {

  get Regions(): any {
    return [
      { label: "Canada", value: "Canada", color: "navy", centers: this.Canada_Centers },
      { label: "North East", value: "Northeast", color: "#C95792" },
      { label: "South East", value: "Southeast", color: "brown" },
      { label: "South West", value: "Southwest", color: "#F8B55F" },
      { label: "West", value: "West", color: "#3D365C" },
      { label: "Mid West", value: "Midwest", color: "#7C4585", centers: this.Midwest_Centers },
      { label: "Unknown", value: "Unknown", color: "black" },
    ];
  }

  GetCentersForRegion(regionName: string | undefined){
    switch (regionName) {
      case "Canada":
        return this.Canada_Centers;
        break;

        case "Midwest":
        return this.Midwest_Centers;
        break;
    
      default:
        return [];
        break;
    }
  }

  get Canada_Centers(): any {
    return [
      { label: "Barrie", value: "Barrie" },
      { label: "Brandon", value: "Brandon" },
      { label: "Calgary", value: "Calgary" },
      { label: "Cambridge", value: "Cambridge" },
      { label: "Edmonton", value: "Edmonton" },
      { label: "Fort McMurray", value: "Fort McMurray" },
      { label: "Halifax", value: "Halifax" },
      { label: "Hamilton", value: "Hamilton" },
      { label: "Montreal", value: "Montreal" },
      { label: "MoveAddress CAN", value: "MoveAddress CAN" },
      { label: "Niagara Falls", value: "Niagara Falls" },
      { label: "North Bay", value: "North Bay" },
      { label: "Ottawa", value: "Ottawa" },
      { label: "Prince Albert", value: "Prince Albert" },
      { label: "Regina", value: "Regina" },
      { label: "Saskatoon", value: "Saskatoon" },
      { label: "Scarborough", value: "Scarborough" },
      { label: "Sudbury", value: "Sudbury" },
      { label: "Thompson", value: "Thompson" },
      { label: "Thunder Bay", value: "Thunder Bay" },
      { label: "Toronto", value: "Toronto" },
      { label: "Vancouver", value: "Vancouver" },
      { label: "Windsor", value: "Windsor" },
      { label: "Winnipeg", value: "Winnipeg" },
    ];
  }
  get Midwest_Centers(): any {
    return [
      { label: "Bloomington", value: "Bloomington" },
      { label: "Chicago", value: "Chicago" },
      { label: "Cincinnati", value: "Cincinnati" },
      { label: "Cleveland", value: "Cleveland" },
      { label: "Columbus OH", value: "Columbus OH" },
      { label: "Crystal Lake", value: "Crystal Lake" },
      { label: "Dayton", value: "Dayton" },
      { label: "Des Moines", value: "Des Moines" },
      { label: "Detroit", value: "Detroit" },
      { label: "Evansville", value: "Evansville" },
      { label: "Indianapolis", value: "Indianapolis" },
      { label: "Iowa City", value: "Iowa City" },
      { label: "Kalamazoo", value: "Kalamazoo" },
      { label: "Kansas City", value: "Kansas City" },
      { label: "Lexington", value: "Lexington" },
      { label: "Louisville", value: "Louisville" },
      { label: "Milwaukee", value: "Milwaukee" },
      { label: "Minneapolis", value: "Minneapolis" },
      { label: "Munster", value: "Munster" },
      { label: "Pittsburgh", value: "Pittsburgh" },
      { label: "St. Louis", value: "St. Louis" },
      { label: "Sterling heights", value: "Sterling heights" },
      { label: "Wichita", value: "Wichita" },
    ]
  }
}
