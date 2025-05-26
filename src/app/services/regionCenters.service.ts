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
      { label: "Albany GA", value: "Albany GA" },
      { label: "Asheville", value: "Asheville" },
      { label: "Atlanta", value: "Atlanta" },
      { label: "Augusta", value: "Augusta" },
      { label: "Birmingham", value: "Birmingham" },
      { label: "Calhoun", value: "Calhoun" },
      { label: "Charleston", value: "Charleston" },
      { label: "Charlotte", value: "Charlotte" },
      { label: "Chattanooga", value: "Chattanooga" },
      { label: "Columbia SC", value: "Columbia SC" },
      { label: "Columbia TN", value: "Columbia TN" },
      { label: "Columbus GA", value: "Columbus GA" },
      { label: "Dothan", value: "Dothan" },
      { label: "Fayetteville NC", value: "Fayetteville NC" },
      { label: "Florence", value: "Florence" },
      { label: "Fort Myers", value: "Fort Myers" },
      { label: "Gainesville", value: "Gainesville" },
      { label: "Greensboro", value: "Greensboro" },
      { label: "Greenville NC", value: "Greenville NC" },
      { label: "Greenville SC", value: "Greenville SC" },
      { label: "Huntsville", value: "Huntsville" },
      { label: "Jackson TN", value: "Jackson TN" },
      { label: "Jacksonville", value: "Jacksonville" },
      { label: "Kennesaw", value: "Kennesaw" },
      { label: "Knoxville", value: "Knoxville" },
      { label: "Melbourne", value: "Melbourne" },
      { label: "Memphis", value: "Memphis" },
      { label: "Miami", value: "Miami" },
      { label: "Mobile", value: "Mobile" },
      { label: "Montgomery", value: "Montgomery" },
      { label: "Myrtle Beach", value: "Myrtle Beach" },
      { label: "Nashville", value: "Nashville" },
      { label: "Orangeburg", value: "Orangeburg" },
      { label: "Orlando", value: "Orlando" },
      { label: "Perry", value: "Perry" },
      { label: "Raleigh", value: "Raleigh" },
      { label: "Rocky Mount", value: "Rocky Mount" },
      { label: "Savannah", value: "Savannah" },
      { label: "Tallahassee", value: "Tallahassee" },
      { label: "Tampa", value: "Tampa" },
    ];
  }

  get SouthWest_Centers(): any {
    return [
      { label: "Austin", value: "Austin" },
      { label: "Beaumont", value: "Beaumont" },
      { label: "Carrizo Spring", value: "Carrizo Spring" },
      { label: "Clear Lake", value: "Clear Lake" },
      { label: "Corpus Christi", value: "Corpus Christi" },
      { label: "Dallas", value: "Dallas" },
      { label: "Denver", value: "Denver" },
      { label: "Fayetteville AR", value: "Fayetteville AR" },
      { label: "Houston", value: "Houston" },
      { label: "Jackson", value: "Jackson" },
      { label: "Little Rock", value: "Little Rock" },
      { label: "Longview", value: "Longview" },
      { label: "Lubbock", value: "Lubbock" },
      { label: "Midland", value: "Midland" },
      { label: "New Orleans", value: "New Orleans" },
      { label: "Oklahoma City", value: "Oklahoma City" },
      { label: "San Antonio", value: "San Antonio" },
      { label: "Tulsa", value: "Tulsa" },
    ]
  }

  get West_Centers(): any {
    return [
      { label: "Bakersfield", value: "Bakersfield" },
      { label: "Barstow", value: "Barstow" },
      { label: "Boise", value: "Boise" },
      { label: "Eugene", value: "Eugene" },
      { label: "Fresno", value: "Fresno" },
      { label: "Las Vegas", value: "Las Vegas" },
      { label: "Los Angeles", value: "Los Angeles" },
      { label: "Phoenix", value: "Phoenix" },
      { label: "Portland", value: "Portland" },
      { label: "Reno", value: "Reno" },
      { label: "Sacramento", value: "Sacramento" },
      { label: "Salt Lake City", value: "Salt Lake City" },
      { label: "San Diego", value: "San Diego" },
      { label: "San Francisco", value: "San Francisco" },
      { label: "San Jose", value: "San Jose" },
      { label: "Seattle", value: "Seattle" },
      { label: "SF Valley", value: "SF Valley" },
      { label: "Tracy", value: "Tracy" },
      { label: "Tucson", value: "Tucson" },
    ]
  }
}
