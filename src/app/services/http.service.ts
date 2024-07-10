import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string = environment.apiUrl;
  constructor( private http: HttpClient) {
  }
  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`, {params});
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, body);
  }

  delete<T>(path: string, body: any): Observable<T>{
    return this.http.delete<T>(`${this.apiUrl}/${path}`, {body});
  }

  deleteAll<T>(path: string): Observable<T>{
    return this.http.delete<T>(`${this.apiUrl}/${path}`);
  }

  getBlob(path: string, params?: HttpParams): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiUrl}/${path}`, {params, observe: 'response', responseType: 'blob'});
  }

  getOuter<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(path, {params});
  }

  postOuter<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.post<T>(path, {params});
  }
}
