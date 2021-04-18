import fetch from "node-fetch";
import { join } from "path";
import { People } from "./models/types";

const BASE_URL = "https://swapi.dev/";

type Resources = {
  people: "people";
  starships: "starships";
  species: "species";
};

export class APIService {
  constructor() {
    //No need for API key because the API is open
  }

  private async callAPI<T>(path: string): Promise<T> {
    const parsed = new URL(path, BASE_URL);
    const res = await fetch(parsed);
    return res.json();
  }

  public fetchData = (resource: string, objectId: string) =>
    this.callAPI<People>(`/api/${resource}/${objectId}`);

  public fetchFullResource = (resource: string) =>
    this.callAPI<People>(`/api/${resource}`);
}

const API_BASE = new APIService();
