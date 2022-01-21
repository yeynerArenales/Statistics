import { Component, OnInit } from '@angular/core';
import { sortEvent, user } from 'src/app/models/models';
import { InfoService } from 'src/app/services/info.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'lastname', 'age', 'phoneNumber', 'engineering', 'experienceYear']
  public dataSource: any;
  public columnsAliases: any = {
    id: 'Id',
    name: 'Nombre',
    lastname: 'Apellido',
    age: 'Edad',
    phoneNumber: 'Numero de Telefono',
    engineering: 'Ingenieria',
    experienceYear: 'Años de Experiencia'
  };
  public length: number = 10;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 15];
  public indexPage: number = 0;
  public infoData: user[] = [];
  public search: string = "";

  constructor(
    private infoSvc: InfoService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    let { length, pageSize, numberPage, data } = this.infoSvc.getInfoPaginated(this.pageSize, this.indexPage)
    this.length = length
    this.pageSize = pageSize
    this.indexPage = numberPage
    this.infoData = data
    this.dataSource = new MatTableDataSource<user>(data)
  }

  onChangePage(event: any) {
    let { pageSize, pageIndex } = event
    this.pageSize = pageSize
    this.indexPage = pageIndex
    this.getData();
  }

  sortData(event: sortEvent) {
    console.log(event)
    if (event.active == 'id' && event.direction == 'asc') {
      this.infoData = this.infoData.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (event.active == 'id' && event.direction == 'desc') {
      this.infoData = this.infoData.sort((a, b) => {
        return b.id - a.id;
      });
    } else if (event.active == 'age' && event.direction == 'asc') {
      this.infoData = this.infoData.sort((a, b) => {
        return a.age - b.age;
      });
    } else if (event.active == 'age' && event.direction == 'desc') {
      this.infoData = this.infoData.sort((a, b) => {
        return b.age - a.age;
      });
    } else if (event.active == 'experienceYear' && event.direction == 'asc') {
      this.infoData = this.infoData.sort((a, b) => {
        return a.experienceYear - b.experienceYear;
      });
    } else if (event.active == 'experienceYear' && event.direction == 'desc') {
      this.infoData = this.infoData.sort((a, b) => {
        return b.experienceYear - a.experienceYear;
      });
    }
    this.dataSource = new MatTableDataSource<user>(this.infoData)
  }

  getInfoFilter(filter: string){
    let { length, pageSize, numberPage, data } = this.infoSvc.getInfoFilter(this.pageSize, this.indexPage, filter)
    this.length = length
    this.pageSize = pageSize
    this.indexPage = numberPage
    this.infoData = data
    this.dataSource = new MatTableDataSource<user>(data)
  }

  debounce(func: any, timeout = 500) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  processSearch = this.debounce(() => this.searchData());

  searchData() {
    if (this.search == '') {
      this.getData();
    } else {
      this.getInfoFilter(this.search);
    }
  }

}
