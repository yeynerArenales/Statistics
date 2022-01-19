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
    experienceYear: 'Anos de Experiencia'
  };

  constructor(
    private infoSvc: InfoService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<user>(this.getData());
  }

  getData(){
    return this.infoSvc.getInfo()
  }

}
