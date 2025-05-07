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

  get NorthEast_Centers(): any {
    return [
      { label: "Albany NY", value: "Albany NY" },
      { label: "Allentown", value: "Allentown" },
      { label: "Altoona", value: "Altoona" },
      { label: "Atlantic City", value: "Atlantic City" },
      { label: "Barre/Vermont", value: "Barre/Vermont" },
      { label: "Boston", value: "Boston" },
      { label: "Cherry Hill", value: "Cherry Hill" },
      { label: "Clifton", value: "Clifton" },
      { label: "Delaware", value: "Delaware" },
      { label: "Dover", value: "Dover" },
      { label: "Downingtown", value: "Downingtown" },
      { label: "Edison", value: "Edison" },
      { label: "Groton", value: "Groton" },
      { label: "Hagerstown", value: "Hagerstown" },
      { label: "Hartford", value: "Hartford" },
      { label: "Jersey City", value: "Jersey City" },
      { label: "Lansdale", value: "Lansdale" },
      { label: "Long Island", value: "Long Island" },
      { label: "Morgantown", value: "Morgantown" },
      { label: "New Haven", value: "New Haven" },
      { label: "New York", value: "New York" },
      { label: "Northern Virginia", value: "Northern Virginia" },
      { label: "Parsippany", value: "Parsippany" },
      { label: "Paughkeepsie", value: "Paughkeepsie" },
      { label: "Philadelphia", value: "Philadelphia" },
      { label: "Portland ME", value: "Portland ME" },
      { label: "Richmond", value: "Richmond" },
      { label: "Roanoke", value: "Roanoke" },
      { label: "Robbinsville", value: "Robbinsville" },
      { label: "Rochester", value: "Rochester" },
      { label: "Salisbury", value: "Salisbury" },
      { label: "Scranton", value: "Scranton" },
      { label: "South Boston", value: "South Boston" },
      { label: "Springfield", value: "Springfield" },
      { label: "State College", value: "State College" },
      { label: "Staunton", value: "Staunton" },
      { label: "Syracuse", value: "Syracuse" },
      { label: "Utica", value: "Utica" },
      { label: "Virginia Beach", value: "Virginia Beach" },
      { label: "Waldorf", value: "Waldorf" },
      { label: "Warrington", value: "Warrington" },
      { label: "Washington DC", value: "Washington DC" },
      { label: "Westborough", value: "Westborough" },
      { label: "Westchester", value: "Westchester" },
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
