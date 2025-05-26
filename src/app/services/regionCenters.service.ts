import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";

@Injectable({ providedIn: 'root' })
export class RegionCenterService {

  get Regions(): any {
    return [
      { label: "Canada", value: "Canada", color: "navy", centers: this.Canada_Centers },
      { label: "Mid West", value: "Midwest", color: "#7C4585", centers: this.Midwest_Centers },
      { label: "North East", value: "Northeast", color: "#C95792", centers: this.NorthEast_Centers },
      { label: "South East", value: "Southeast", color: "brown", centers: this.SouthEast_Centers },
      { label: "South West", value: "Southwest", color: "#F8B55F", centers: this.SouthWest_Centers },
      { label: "West", value: "West", color: "#3D365C", centers: this.West_Centers },
      // { label: "Unknown", value: "Unknown", color: "black" },
    ];
  }

  GetCentersForRegion(regionName: string | undefined){
    switch (regionName) {
      case "Canada":
        return this.Canada_Centers;
        break;

        case "Northeast":
          return this.NorthEast_Centers;
          break;
  
        case "Southeast":
          return this.SouthEast_Centers;
          break;

        case "Southwest":
          return this.SouthWest_Centers;
          break;

        case "West":
          return this.West_Centers;
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
      { label: "Barrie", value: "Barrie", region: "Canada" },
      { label: "Brandon", value: "Brandon", region: "Canada" },
      { label: "Calgary", value: "Calgary", region: "Canada" },
      { label: "Cambridge", value: "Cambridge", region: "Canada" },
      { label: "Edmonton", value: "Edmonton", region: "Canada" },
      { label: "Fort McMurray", value: "Fort McMurray", region: "Canada" },
      { label: "Halifax", value: "Halifax", region: "Canada" },
      { label: "Hamilton", value: "Hamilton", region: "Canada" },
      { label: "Montreal", value: "Montreal", region: "Canada" },
      { label: "MoveAddress CAN", value: "MoveAddress CAN", region: "Canada" },
      { label: "Niagara Falls", value: "Niagara Falls", region: "Canada" },
      { label: "North Bay", value: "North Bay", region: "Canada" },
      { label: "Ottawa", value: "Ottawa", region: "Canada" },
      { label: "Prince Albert", value: "Prince Albert", region: "Canada" },
      { label: "Regina", value: "Regina", region: "Canada" },
      { label: "Saskatoon", value: "Saskatoon", region: "Canada" },
      { label: "Scarborough", value: "Scarborough", region: "Canada" },
      { label: "Sudbury", value: "Sudbury", region: "Canada" },
      { label: "Thompson", value: "Thompson" },
      { label: "Thunder Bay", value: "Thunder Bay", region: "Canada" },
      { label: "Toronto", value: "Toronto" },
      { label: "Vancouver", value: "Vancouver", region: "Canada" },
      { label: "Windsor", value: "Windsor", region: "Canada" },
      { label: "Winnipeg", value: "Winnipeg", region: "Canada" },
    ];
  }

  get Midwest_Centers(): any {
    return [
      { label: "Bloomington", value: "Bloomington", region: "Midwest" },
      { label: "Chicago", value: "Chicago", region: "Midwest" },
      { label: "Cincinnati", value: "Cincinnati", region: "Midwest" },
      { label: "Cleveland", value: "Cleveland", region: "Midwest" },
      { label: "Columbus OH", value: "Columbus OH", region: "Midwest" },
      { label: "Crystal Lake", value: "Crystal Lake", region: "Midwest" },
      { label: "Dayton", value: "Dayton", region: "Midwest" },
      { label: "Des Moines", value: "Des Moines", region: "Midwest" },
      { label: "Detroit", value: "Detroit", region: "Midwest" },
      { label: "Evansville", value: "Evansville", region: "Midwest" },
      { label: "Indianapolis", value: "Indianapolis", region: "Midwest" },
      { label: "Iowa City", value: "Iowa City", region: "Midwest" },
      { label: "Kalamazoo", value: "Kalamazoo", region: "Midwest" },
      { label: "Kansas City", value: "Kansas City", region: "Midwest" },
      { label: "Lexington", value: "Lexington", region: "Midwest" },
      { label: "Louisville", value: "Louisville", region: "Midwest" },
      { label: "Milwaukee", value: "Milwaukee", region: "Midwest" },
      { label: "Minneapolis", value: "Minneapolis", region: "Midwest" },
      { label: "Munster", value: "Munster", region: "Midwest" },
      { label: "Pittsburgh", value: "Pittsburgh", region: "Midwest" },
      { label: "St. Louis", value: "St. Louis", region: "Midwest" },
      { label: "Sterling heights", value: "Sterling heights", region: "Midwest" },
      { label: "Wichita", value: "Wichita", region: "Midwest" },
    ]
  }

  get NorthEast_Centers(): any {
    return [
      { label: "Albany NY", value: "Albany NY", region: "Northeast" },
      { label: "Allentown", value: "Allentown", region: "Northeast" },
      { label: "Altoona", value: "Altoona", region: "Northeast" },
      { label: "Atlantic City", value: "Atlantic City", region: "Northeast" },
      { label: "Barre/Vermont", value: "Barre/Vermont", region: "Northeast" },
      { label: "Boston", value: "Boston", region: "Northeast" },
      { label: "Cherry Hill", value: "Cherry Hill", region: "Northeast" },
      { label: "Clifton", value: "Clifton", region: "Northeast" },
      { label: "Delaware", value: "Delaware", region: "Northeast" },
      { label: "Dover", value: "Dover", region: "Northeast" },
      { label: "Downingtown", value: "Downingtown", region: "Northeast" },
      { label: "Edison", value: "Edison", region: "Northeast" },
      { label: "Groton", value: "Groton", region: "Northeast" },
      { label: "Hagerstown", value: "Hagerstown", region: "Northeast" },
      { label: "Hartford", value: "Hartford", region: "Northeast" },
      { label: "Jersey City", value: "Jersey City", region: "Northeast" },
      { label: "Lansdale", value: "Lansdale", region: "Northeast" },
      { label: "Long Island", value: "Long Island", region: "Northeast" },
      { label: "Morgantown", value: "Morgantown", region: "Northeast" },
      { label: "New Haven", value: "New Haven", region: "Northeast" },
      { label: "New York", value: "New York", region: "Northeast" },
      { label: "Northern Virginia", value: "Northern Virginia", region: "Northeast" },
      { label: "Parsippany", value: "Parsippany", region: "Northeast" },
      { label: "Paughkeepsie", value: "Paughkeepsie", region: "Northeast" },
      { label: "Philadelphia", value: "Philadelphia", region: "Northeast" },
      { label: "Portland ME", value: "Portland ME", region: "Northeast" },
      { label: "Richmond", value: "Richmond", region: "Northeast" },
      { label: "Roanoke", value: "Roanoke", region: "Northeast" },
      { label: "Robbinsville", value: "Robbinsville", region: "Northeast" },
      { label: "Rochester", value: "Rochester", region: "Northeast" },
      { label: "Salisbury", value: "Salisbury", region: "Northeast" },
      { label: "Scranton", value: "Scranton", region: "Northeast" },
      { label: "South Boston", value: "South Boston", region: "Northeast" },
      { label: "Springfield", value: "Springfield", region: "Northeast" },
      { label: "State College", value: "State College", region: "Northeast" },
      { label: "Staunton", value: "Staunton", region: "Northeast" },
      { label: "Syracuse", value: "Syracuse", region: "Northeast" },
      { label: "Utica", value: "Utica", region: "Northeast" },
      { label: "Virginia Beach", value: "Virginia Beach", region: "Northeast" },
      { label: "Waldorf", value: "Waldorf", region: "Northeast" },
      { label: "Warrington", value: "Warrington", region: "Northeast" },
      { label: "Washington DC", value: "Washington DC", region: "Northeast" },
      { label: "Westborough", value: "Westborough", region: "Northeast" },
      { label: "Westchester", value: "Westchester", region: "Northeast" },
    ];
  }

  get SouthEast_Centers(): any {
    return [
      { label: "Albany GA", value: "Albany GA", region: "Southeast" },
      { label: "Asheville", value: "Asheville", region: "Southeast" },
      { label: "Atlanta", value: "Atlanta", region: "Southeast" },
      { label: "Augusta", value: "Augusta", region: "Southeast" },
      { label: "Birmingham", value: "Birmingham", region: "Southeast" },
      { label: "Calhoun", value: "Calhoun", region: "Southeast" },
      { label: "Charleston", value: "Charleston", region: "Southeast" },
      { label: "Charlotte", value: "Charlotte", region: "Southeast" },
      { label: "Chattanooga", value: "Chattanooga", region: "Southeast" },
      { label: "Columbia SC", value: "Columbia SC", region: "Southeast" },
      { label: "Columbia TN", value: "Columbia TN", region: "Southeast" },
      { label: "Columbus GA", value: "Columbus GA", region: "Southeast" },
      { label: "Dothan", value: "Dothan", region: "Southeast" },
      { label: "Fayetteville NC", value: "Fayetteville NC", region: "Southeast" },
      { label: "Florence", value: "Florence", region: "Southeast" },
      { label: "Fort Myers", value: "Fort Myers", region: "Southeast" },
      { label: "Gainesville", value: "Gainesville", region: "Southeast" },
      { label: "Greensboro", value: "Greensboro", region: "Southeast" },
      { label: "Greenville NC", value: "Greenville NC", region: "Southeast" },
      { label: "Greenville SC", value: "Greenville SC", region: "Southeast" },
      { label: "Huntsville", value: "Huntsville", region: "Southeast" },
      { label: "Jackson TN", value: "Jackson TN", region: "Southeast" },
      { label: "Jacksonville", value: "Jacksonville", region: "Southeast" },
      { label: "Kennesaw", value: "Kennesaw", region: "Southeast" },
      { label: "Knoxville", value: "Knoxville", region: "Southeast" },
      { label: "Melbourne", value: "Melbourne", region: "Southeast" },
      { label: "Memphis", value: "Memphis", region: "Southeast" },
      { label: "Miami", value: "Miami", region: "Southeast" },
      { label: "Mobile", value: "Mobile", region: "Southeast" },
      { label: "Montgomery", value: "Montgomery", region: "Southeast" },
      { label: "Myrtle Beach", value: "Myrtle Beach", region: "Southeast" },
      { label: "Nashville", value: "Nashville", region: "Southeast" },
      { label: "Orangeburg", value: "Orangeburg", region: "Southeast" },
      { label: "Orlando", value: "Orlando", region: "Southeast" },
      { label: "Perry", value: "Perry", region: "Southeast" },
      { label: "Raleigh", value: "Raleigh", region: "Southeast" },
      { label: "Rocky Mount", value: "Rocky Mount", region: "Southeast" },
      { label: "Savannah", value: "Savannah", region: "Southeast" },
      { label: "Tallahassee", value: "Tallahassee", region: "Southeast" },
      { label: "Tampa", value: "Tampa", region: "Southeast" },
    ];
  }

  get SouthWest_Centers(): any {
    return [
      { label: "Austin", value: "Austin", region: "Southwest" },
      { label: "Beaumont", value: "Beaumont", region: "Southwest" },
      { label: "Carrizo Spring", value: "Carrizo Spring", region: "Southwest" },
      { label: "Clear Lake", value: "Clear Lake", region: "Southwest" },
      { label: "Corpus Christi", value: "Corpus Christi", region: "Southwest" },
      { label: "Dallas", value: "Dallas", region: "Southwest" },
      { label: "Denver", value: "Denver", region: "Southwest" },
      { label: "Fayetteville AR", value: "Fayetteville AR", region: "Southwest" },
      { label: "Houston", value: "Houston", region: "Southwest" },
      { label: "Jackson", value: "Jackson", region: "Southwest" },
      { label: "Little Rock", value: "Little Rock", region: "Southwest" },
      { label: "Longview", value: "Longview", region: "Southwest" },
      { label: "Lubbock", value: "Lubbock", region: "Southwest" },
      { label: "Midland", value: "Midland", region: "Southwest" },
      { label: "New Orleans", value: "New Orleans", region: "Southwest" },
      { label: "Oklahoma City", value: "Oklahoma City", region: "Southwest" },
      { label: "San Antonio", value: "San Antonio", region: "Southwest" },
      { label: "Tulsa", value: "Tulsa", region: "Southwest" },
    ]
  }

  get West_Centers(): any {
    return [
      { label: "Bakersfield", value: "Bakersfield", region: "West" },
      { label: "Barstow", value: "Barstow", region: "West" },
      { label: "Boise", value: "Boise", region: "West" },
      { label: "Eugene", value: "Eugene", region: "West" },
      { label: "Fresno", value: "Fresno", region: "West" },
      { label: "Las Vegas", value: "Las Vegas", region: "West" },
      { label: "Los Angeles", value: "Los Angeles", region: "West" },
      { label: "Phoenix", value: "Phoenix", region: "West" },
      { label: "Portland", value: "Portland", region: "West" },
      { label: "Reno", value: "Reno", region: "West" },
      { label: "Sacramento", value: "Sacramento", region: "West" },
      { label: "Salt Lake City", value: "Salt Lake City", region: "West" },
      { label: "San Diego", value: "San Diego", region: "West" },
      { label: "San Francisco", value: "San Francisco", region: "West" },
      { label: "San Jose", value: "San Jose", region: "West" },
      { label: "Seattle", value: "Seattle", region: "West" },
      { label: "SF Valley", value: "SF Valley", region: "West" },
      { label: "Tracy", value: "Tracy", region: "West" },
      { label: "Tucson", value: "Tucson", region: "West" },
    ]
  }
}
