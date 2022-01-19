import { Injectable } from '@angular/core';
import { user, responsePg } from '../models/models';
import { infoData } from 'src/assets/infoData';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getInfo(): user[]{
    return infoData;
  }

  getInfoPaginated(pageSize: number, numberPage: number): responsePg {
    let response: user[] = [];
    if(numberPage == 0 ){
      for (let index = 0; index < pageSize; index++) {
        const element = infoData[index];
        response.push(element)
      }
    }else{
      for (let index = pageSize * numberPage; index < pageSize * (numberPage + 1); index++) {
        const element = infoData[index];
        response.push(element)
      }
    }
    return {
      data : response,
      length: infoData.length,
      pageSize,
      numberPage
    };
  }
}
