import { Injectable } from '@angular/core';
import { user } from '../models/models';
import { infoData } from 'src/assets/infoData';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getInfo(length: number): user[]{
    let response: user[] = [];
    for (let index = 0; index < length; index++) {
      const element = infoData[index];
      response.push(element)
    }
    return infoData;
  }
}
