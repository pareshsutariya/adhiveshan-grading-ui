import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";
import { Center } from "../models/center";

@Injectable({ providedIn: 'root' })
export class RegionCenterService {

  get Regions(): any {
    return [
      { label: "Canada", value: "Canada", color: "navy" },
      { label: "North East", value: "Northeast", color: "#C95792" },
      { label: "South East", value: "Southeast", color: "brown" },
      { label: "South West", value: "Southwest", color: "#F8B55F" },
      { label: "West", value: "West", color: "#3D365C" },
      { label: "Mid West", value: "Midwest", color: "#7C4585" },
      { label: "Unknown", value: "Unknown", color: "black" },
    ];
  }
}
