import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Photo} from './photo';
import { PhotoDetail } from './photo-detail';
import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;
const photos = '/photos';

@Injectable()
export class PhotoService {

   /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
   constructor(private http: HttpClient) {}

   /**
   * Returns the Observable object containing the list of editorials retrieved from the API
   * @returns The list of books in real time
   */
   getPhotos(): Observable<Photo[]> {
       return this.http.get<Photo[]>(API_URL + photos);
   }

    /**
    * Returns the Observable object with the details of an author retrieved from the API
    * @returns The author details
    */
   getPhotoDetail(photoId): Observable<PhotoDetail> {
    return this.http.get<PhotoDetail>(API_URL + photos + '/' + photoId);
}
}