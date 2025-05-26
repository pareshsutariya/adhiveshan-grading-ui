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
      { label: "Barrie", value: "Barrie", region: "Canada", color: "navy", },
      { label: "Brandon", value: "Brandon", region: "Canada", color: "navy", },
      { label: "Calgary", value: "Calgary", region: "Canada", color: "navy", },
      { label: "Cambridge", value: "Cambridge", region: "Canada", color: "navy", },
      { label: "Edmonton", value: "Edmonton", region: "Canada", color: "navy", },
      { label: "Fort McMurray", value: "Fort McMurray", region: "Canada", color: "navy", },
      { label: "Halifax", value: "Halifax", region: "Canada", color: "navy", },
      { label: "Hamilton", value: "Hamilton", region: "Canada", color: "navy", },
      { label: "Montreal", value: "Montreal", region: "Canada", color: "navy", },
      { label: "MoveAddress CAN", value: "MoveAddress CAN", region: "Canada", color: "navy", },
      { label: "Niagara Falls", value: "Niagara Falls", region: "Canada", color: "navy", },
      { label: "North Bay", value: "North Bay", region: "Canada", color: "navy", },
      { label: "Ottawa", value: "Ottawa", region: "Canada", color: "navy", },
      { label: "Prince Albert", value: "Prince Albert", region: "Canada", color: "navy", },
      { label: "Regina", value: "Regina", region: "Canada", color: "navy", },
      { label: "Saskatoon", value: "Saskatoon", region: "Canada", color: "navy", },
      { label: "Scarborough", value: "Scarborough", region: "Canada", color: "navy", },
      { label: "Sudbury", value: "Sudbury", region: "Canada", color: "navy", },
      { label: "Thompson", value: "Thompson", region: "Canada", color: "navy", },
      { label: "Thunder Bay", value: "Thunder Bay", region: "Canada", color: "navy", },
      { label: "Toronto", value: "Toronto", region: "Canada", color: "navy", },
      { label: "Vancouver", value: "Vancouver", region: "Canada", color: "navy", },
      { label: "Windsor", value: "Windsor", region: "Canada", color: "navy", },
      { label: "Winnipeg", value: "Winnipeg", region: "Canada", color: "navy", },
    ];
  }

  get Midwest_Centers(): any {
    return [
      { label: "Bloomington", value: "Bloomington", region: "Midwest", color: "#7C4585" },
      { label: "Chicago", value: "Chicago", region: "Midwest", color: "#7C4585" },
      { label: "Cincinnati", value: "Cincinnati", region: "Midwest", color: "#7C4585" },
      { label: "Cleveland", value: "Cleveland", region: "Midwest", color: "#7C4585" },
      { label: "Columbus OH", value: "Columbus OH", region: "Midwest", color: "#7C4585" },
      { label: "Crystal Lake", value: "Crystal Lake", region: "Midwest", color: "#7C4585" },
      { label: "Dayton", value: "Dayton", region: "Midwest", color: "#7C4585" },
      { label: "Des Moines", value: "Des Moines", region: "Midwest", color: "#7C4585" },
      { label: "Detroit", value: "Detroit", region: "Midwest", color: "#7C4585" },
      { label: "Evansville", value: "Evansville", region: "Midwest", color: "#7C4585" },
      { label: "Indianapolis", value: "Indianapolis", region: "Midwest", color: "#7C4585" },
      { label: "Iowa City", value: "Iowa City", region: "Midwest", color: "#7C4585" },
      { label: "Kalamazoo", value: "Kalamazoo", region: "Midwest", color: "#7C4585" },
      { label: "Kansas City", value: "Kansas City", region: "Midwest", color: "#7C4585" },
      { label: "Lexington", value: "Lexington", region: "Midwest", color: "#7C4585" },
      { label: "Louisville", value: "Louisville", region: "Midwest", color: "#7C4585" },
      { label: "Milwaukee", value: "Milwaukee", region: "Midwest", color: "#7C4585" },
      { label: "Minneapolis", value: "Minneapolis", region: "Midwest", color: "#7C4585" },
      { label: "Munster", value: "Munster", region: "Midwest", color: "#7C4585" },
      { label: "Pittsburgh", value: "Pittsburgh", region: "Midwest", color: "#7C4585" },
      { label: "St. Louis", value: "St. Louis", region: "Midwest", color: "#7C4585" },
      { label: "Sterling heights", value: "Sterling heights", region: "Midwest", color: "#7C4585" },
      { label: "Wichita", value: "Wichita", region: "Midwest", color: "#7C4585" },
    ]
  }

  get NorthEast_Centers(): any {
    return [
      { label: "Albany NY", value: "Albany NY", region: "Northeast", color: "#C95792", },
      { label: "Allentown", value: "Allentown", region: "Northeast", color: "#C95792", },
      { label: "Altoona", value: "Altoona", region: "Northeast", color: "#C95792", },
      { label: "Atlantic City", value: "Atlantic City", region: "Northeast", color: "#C95792", },
      { label: "Barre/Vermont", value: "Barre/Vermont", region: "Northeast", color: "#C95792", },
      { label: "Boston", value: "Boston", region: "Northeast", color: "#C95792", },
      { label: "Cherry Hill", value: "Cherry Hill", region: "Northeast", color: "#C95792", },
      { label: "Clifton", value: "Clifton", region: "Northeast", color: "#C95792", },
      { label: "Delaware", value: "Delaware", region: "Northeast", color: "#C95792", },
      { label: "Dover", value: "Dover", region: "Northeast", color: "#C95792", },
      { label: "Downingtown", value: "Downingtown", region: "Northeast", color: "#C95792", },
      { label: "Edison", value: "Edison", region: "Northeast", color: "#C95792", },
      { label: "Groton", value: "Groton", region: "Northeast", color: "#C95792", },
      { label: "Hagerstown", value: "Hagerstown", region: "Northeast", color: "#C95792", },
      { label: "Hartford", value: "Hartford", region: "Northeast", color: "#C95792", },
      { label: "Jersey City", value: "Jersey City", region: "Northeast", color: "#C95792", },
      { label: "Lansdale", value: "Lansdale", region: "Northeast", color: "#C95792", },
      { label: "Long Island", value: "Long Island", region: "Northeast", color: "#C95792", },
      { label: "Morgantown", value: "Morgantown", region: "Northeast", color: "#C95792", },
      { label: "New Haven", value: "New Haven", region: "Northeast", color: "#C95792", },
      { label: "New York", value: "New York", region: "Northeast", color: "#C95792", },
      { label: "Northern Virginia", value: "Northern Virginia", region: "Northeast", color: "#C95792", },
      { label: "Parsippany", value: "Parsippany", region: "Northeast", color: "#C95792", },
      { label: "Paughkeepsie", value: "Paughkeepsie", region: "Northeast", color: "#C95792", },
      { label: "Philadelphia", value: "Philadelphia", region: "Northeast", color: "#C95792", },
      { label: "Portland ME", value: "Portland ME", region: "Northeast", color: "#C95792", },
      { label: "Richmond", value: "Richmond", region: "Northeast", color: "#C95792", },
      { label: "Roanoke", value: "Roanoke", region: "Northeast", color: "#C95792", },
      { label: "Robbinsville", value: "Robbinsville", region: "Northeast", color: "#C95792", },
      { label: "Rochester", value: "Rochester", region: "Northeast", color: "#C95792", },
      { label: "Salisbury", value: "Salisbury", region: "Northeast", color: "#C95792", },
      { label: "Scranton", value: "Scranton", region: "Northeast", color: "#C95792", },
      { label: "South Boston", value: "South Boston", region: "Northeast", color: "#C95792", },
      { label: "Springfield", value: "Springfield", region: "Northeast", color: "#C95792", },
      { label: "State College", value: "State College", region: "Northeast", color: "#C95792", },
      { label: "Staunton", value: "Staunton", region: "Northeast", color: "#C95792", },
      { label: "Syracuse", value: "Syracuse", region: "Northeast", color: "#C95792", },
      { label: "Utica", value: "Utica", region: "Northeast", color: "#C95792", },
      { label: "Virginia Beach", value: "Virginia Beach", region: "Northeast", color: "#C95792", },
      { label: "Waldorf", value: "Waldorf", region: "Northeast", color: "#C95792", },
      { label: "Warrington", value: "Warrington", region: "Northeast", color: "#C95792", },
      { label: "Washington DC", value: "Washington DC", region: "Northeast", color: "#C95792", },
      { label: "Westborough", value: "Westborough", region: "Northeast", color: "#C95792", },
      { label: "Westchester", value: "Westchester", region: "Northeast", color: "#C95792", },
    ];
  }

  get SouthEast_Centers(): any {
    return [
      { label: "Albany GA", value: "Albany GA", region: "Southeast", color: "brown", },
      { label: "Asheville", value: "Asheville", region: "Southeast", color: "brown", },
      { label: "Atlanta", value: "Atlanta", region: "Southeast", color: "brown", },
      { label: "Augusta", value: "Augusta", region: "Southeast", color: "brown", },
      { label: "Birmingham", value: "Birmingham", region: "Southeast", color: "brown", },
      { label: "Calhoun", value: "Calhoun", region: "Southeast", color: "brown", },
      { label: "Charleston", value: "Charleston", region: "Southeast", color: "brown", },
      { label: "Charlotte", value: "Charlotte", region: "Southeast", color: "brown", },
      { label: "Chattanooga", value: "Chattanooga", region: "Southeast", color: "brown", },
      { label: "Columbia SC", value: "Columbia SC", region: "Southeast", color: "brown", },
      { label: "Columbia TN", value: "Columbia TN", region: "Southeast", color: "brown", },
      { label: "Columbus GA", value: "Columbus GA", region: "Southeast", color: "brown", },
      { label: "Dothan", value: "Dothan", region: "Southeast", color: "brown", },
      { label: "Fayetteville NC", value: "Fayetteville NC", region: "Southeast", color: "brown", },
      { label: "Florence", value: "Florence", region: "Southeast", color: "brown", },
      { label: "Fort Myers", value: "Fort Myers", region: "Southeast", color: "brown", },
      { label: "Gainesville", value: "Gainesville", region: "Southeast", color: "brown", },
      { label: "Greensboro", value: "Greensboro", region: "Southeast", color: "brown", },
      { label: "Greenville NC", value: "Greenville NC", region: "Southeast", color: "brown", },
      { label: "Greenville SC", value: "Greenville SC", region: "Southeast", color: "brown", },
      { label: "Huntsville", value: "Huntsville", region: "Southeast", color: "brown", },
      { label: "Jackson TN", value: "Jackson TN", region: "Southeast", color: "brown", },
      { label: "Jacksonville", value: "Jacksonville", region: "Southeast", color: "brown", },
      { label: "Kennesaw", value: "Kennesaw", region: "Southeast", color: "brown", },
      { label: "Knoxville", value: "Knoxville", region: "Southeast", color: "brown", },
      { label: "Melbourne", value: "Melbourne", region: "Southeast", color: "brown", },
      { label: "Memphis", value: "Memphis", region: "Southeast", color: "brown", },
      { label: "Miami", value: "Miami", region: "Southeast", color: "brown", },
      { label: "Mobile", value: "Mobile", region: "Southeast", color: "brown", },
      { label: "Montgomery", value: "Montgomery", region: "Southeast", color: "brown", },
      { label: "Myrtle Beach", value: "Myrtle Beach", region: "Southeast", color: "brown", },
      { label: "Nashville", value: "Nashville", region: "Southeast", color: "brown", },
      { label: "Orangeburg", value: "Orangeburg", region: "Southeast", color: "brown", },
      { label: "Orlando", value: "Orlando", region: "Southeast", color: "brown", },
      { label: "Perry", value: "Perry", region: "Southeast", color: "brown", },
      { label: "Raleigh", value: "Raleigh", region: "Southeast", color: "brown", },
      { label: "Rocky Mount", value: "Rocky Mount", region: "Southeast", color: "brown", },
      { label: "Savannah", value: "Savannah", region: "Southeast", color: "brown", },
      { label: "Tallahassee", value: "Tallahassee", region: "Southeast", color: "brown", },
      { label: "Tampa", value: "Tampa", region: "Southeast", color: "brown", },
    ];
  }

  get SouthWest_Centers(): any {
    return [
      { label: "Austin", value: "Austin", region: "Southwest", color: "#F8B55F", },
      { label: "Beaumont", value: "Beaumont", region: "Southwest", color: "#F8B55F", },
      { label: "Carrizo Spring", value: "Carrizo Spring", region: "Southwest", color: "#F8B55F", },
      { label: "Clear Lake", value: "Clear Lake", region: "Southwest", color: "#F8B55F", },
      { label: "Corpus Christi", value: "Corpus Christi", region: "Southwest", color: "#F8B55F", },
      { label: "Dallas", value: "Dallas", region: "Southwest", color: "#F8B55F", },
      { label: "Denver", value: "Denver", region: "Southwest", color: "#F8B55F", },
      { label: "Fayetteville AR", value: "Fayetteville AR", region: "Southwest", color: "#F8B55F", },
      { label: "Houston", value: "Houston", region: "Southwest", color: "#F8B55F", },
      { label: "Jackson", value: "Jackson", region: "Southwest", color: "#F8B55F", },
      { label: "Little Rock", value: "Little Rock", region: "Southwest", color: "#F8B55F", },
      { label: "Longview", value: "Longview", region: "Southwest", color: "#F8B55F", },
      { label: "Lubbock", value: "Lubbock", region: "Southwest", color: "#F8B55F", },
      { label: "Midland", value: "Midland", region: "Southwest", color: "#F8B55F", },
      { label: "New Orleans", value: "New Orleans", region: "Southwest", color: "#F8B55F", },
      { label: "Oklahoma City", value: "Oklahoma City", region: "Southwest", color: "#F8B55F", },
      { label: "San Antonio", value: "San Antonio", region: "Southwest", color: "#F8B55F", },
      { label: "Tulsa", value: "Tulsa", region: "Southwest", color: "#F8B55F", },
    ]
  }

  get West_Centers(): any {
    return [
      { label: "Bakersfield", value: "Bakersfield", region: "West", color: "#3D365C", },
      { label: "Barstow", value: "Barstow", region: "West", color: "#3D365C", },
      { label: "Boise", value: "Boise", region: "West", color: "#3D365C", },
      { label: "Eugene", value: "Eugene", region: "West", color: "#3D365C", },
      { label: "Fresno", value: "Fresno", region: "West", color: "#3D365C", },
      { label: "Las Vegas", value: "Las Vegas", region: "West", color: "#3D365C", },
      { label: "Los Angeles", value: "Los Angeles", region: "West", color: "#3D365C", },
      { label: "Phoenix", value: "Phoenix", region: "West", color: "#3D365C", },
      { label: "Portland", value: "Portland", region: "West", color: "#3D365C", },
      { label: "Reno", value: "Reno", region: "West", color: "#3D365C", },
      { label: "Sacramento", value: "Sacramento", region: "West", color: "#3D365C", },
      { label: "Salt Lake City", value: "Salt Lake City", region: "West", color: "#3D365C", },
      { label: "San Diego", value: "San Diego", region: "West", color: "#3D365C", },
      { label: "San Francisco", value: "San Francisco", region: "West", color: "#3D365C", },
      { label: "San Jose", value: "San Jose", region: "West", color: "#3D365C", },
      { label: "Seattle", value: "Seattle", region: "West", color: "#3D365C", },
      { label: "SF Valley", value: "SF Valley", region: "West", color: "#3D365C", },
      { label: "Tracy", value: "Tracy", region: "West", color: "#3D365C", },
      { label: "Tucson", value: "Tucson", region: "West", color: "#3D365C", },
    ]
  }
}
