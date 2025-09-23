import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPI {
  http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }
}
