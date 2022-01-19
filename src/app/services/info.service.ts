import { Injectable } from '@angular/core';
import { user } from '../models/models';
import { infoData } from 'src/assets/infoData';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getInfo(): user[]{
    return infoData;
  }
}
