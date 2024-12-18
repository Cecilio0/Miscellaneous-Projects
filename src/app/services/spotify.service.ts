import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiURL = 'https://api.spotify.com/v1';

  constructor(private httpClient: HttpClient) { }

  getTopTracks(userId: string): void {
    this.httpClient.get(`${this.apiURL}/users/${userId}/top-tracks`)
  }
}
