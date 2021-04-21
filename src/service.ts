import fetch from "node-fetch";
import { join } from "path";
import { People, APIResponse, Film, Planet } from "./models/types";

const BASE_URL = "https://swapi.dev/";

export class APIService {
  constructor() {
    //No need for API key because the API is open
  }

  //This method is the most generic one,
  //where I fetch the data based on a full string.
  private async _callAPI<T>(path: string): Promise<T> {
    const res = await fetch(path);
    return res.json();
  }

  //This method basically extends the _ version, and calls it
  //with the BASE_URL variable, allowing me to access different paths of the API
  //with specific IDs etc.
  private async callAPI<T>(path: string): Promise<T> {
    const parsed = new URL(path, BASE_URL);
    return this._callAPI<T>(parsed.toString());
  }

  //Method to fetch a specific resource with ID
  public fetchData = (resource: string, objectId: string) =>
    this.callAPI<APITypeMap>(`/api/${resource}/${objectId}`);

  //Method to fetch the full list of the resource with an APIResponse type.
  public fetchResources = <K extends keyof APITypeMap>(resource: K) =>
    this.callAPI<APIResponse<APITypeMap[K]>>(`/api/${resource}`);

  //Fetches a single resource with a full string.
  //Made this primarily to access the objects through the strings
  //of other API resources (ResourceFetcher component)
  public fetchResource = <K extends keyof APITypeMap>(path: string) =>
    this._callAPI<APITypeMap[K]>(path);
}

//A sort of singleton to access the API since I am not using appContext.
//instead of making a new everytime, I access it from here.
export const api = new APIService();

//Used to map the different types from my types.ts.
export interface APITypeMap {
  people: People;
  film: Film;
  planet: Planet;
}
