import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }

  search(query, type, maxResults, pageToken) {
    if (pageToken) {
      return this.http.get(`${this.searchUrl}?type=${type}&q=${query}&maxResults=${maxResults}&pageToken=${pageToken}`);
    } else {
      return this.http.get(`${this.searchUrl}?type=${type}&q=${query}&maxResults=${maxResults}`);
    }
  }

}