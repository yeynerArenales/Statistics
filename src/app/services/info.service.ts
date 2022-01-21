import { Injectable } from '@angular/core';
import { user, responsePg } from '../models/models';
import { infoData } from 'src/assets/infoData';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getInfo(): user[] {
    return infoData;
  }

  getInfoForChart() {
    let Cinco: number = 0, Cuatro: number = 0, Tres: number = 0, Dos: number = 0, Uno: number = 0;
    infoData.forEach(item => {
      switch (item.experienceYear) {
        case 1:
          Uno += 1
          break;
        case 2:
          Dos += 1
          break;
        case 3:
          Tres += 1
          break;
        case 4:
          Cuatro += 1
          break;
        case 5:
          Cinco += 1
          break;
      }
    })
    return { Uno, Dos, Tres, Cuatro, Cinco }
  }

  getInfoForPie() {
    let informatica: number = 0, civil: number = 0, mecanica: number = 0, industrial: number = 0;
    infoData.forEach(item => {
      switch (item.engineering) {
        case 'Informatica':
          informatica += 1
          break;
        case 'Civil':
          civil += 1
          break;
        case 'Mecanica':
          mecanica += 1
          break;
        case 'Industrial':
          industrial += 1
          break;
      }
    })
    return [
      { name: "Informatica", value: informatica },
      { name: "Civil", value: civil },
      { name: "Mecanica", value: mecanica },
      { name: "Industrial", value: industrial }
    ]
  }

  getInfoPaginated(pageSize: number, numberPage: number): responsePg {
    let response: user[] = [];
    if (numberPage == 0) {
      for (let index = 0; index < pageSize; index++) {
        const element = infoData[index];
        response.push(element)
      }
    } else {
      for (let index = pageSize * numberPage; index < pageSize * (numberPage + 1); index++) {
        const element = infoData[index];
        response.push(element)
      }
    }
    return {
      data: response,
      length: infoData.length,
      pageSize,
      numberPage
    };
  }

  getInfoFilter(pageSize: number, numberPage: number, filter: string): responsePg {
    let response: user[] = [];
    if (numberPage == 0) {
      for (let index = 0; index < pageSize; index++) {
        const element = infoData[index];
        if (element.name.toLowerCase().includes(filter.toLowerCase())  ||
          element.lastname.toLowerCase().includes(filter.toLowerCase())  ||
          element.engineering.toLowerCase().includes(filter.toLowerCase()) ) {
          response.push(element)
        }
      }
    } else {
      for (let index = pageSize * numberPage; index < pageSize * (numberPage + 1); index++) {
        const element = infoData[index];
        if (element.name.toLowerCase().includes(filter.toLowerCase())  ||
          element.lastname.toLowerCase().includes(filter.toLowerCase())  ||
          element.engineering.toLowerCase().includes(filter.toLowerCase()) ) {
          response.push(element)
        }
      }
    }
    return {
      data: response,
      length: response.length,
      pageSize,
      numberPage
    };
  }
}
