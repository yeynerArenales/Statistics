import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/models';
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
  public pageSizeOptions: number[] = [ 5 , 10, 15];
  public indexPage: number = 0;

  constructor(
    private infoSvc: InfoService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    let res = this.infoSvc.getInfoPaginated(this.pageSize, this.indexPage)
    let { length, pageSize, numberPage} = res
    this.length = length
    this.pageSize = pageSize
    this.indexPage = numberPage
    this.dataSource = new MatTableDataSource<user>(res.data)
  }

  onChangePage(event: any) {
    let { pageSize, pageIndex } = event
    this.pageSize = pageSize
    this.indexPage = pageIndex
    this.getData();
  }

}
