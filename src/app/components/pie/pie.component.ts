import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  constructor(
    private infoSvc: InfoService
  ) { }

  ngOnInit(): void {
    this.showGraphic()
  }

  getInfo(){
    return this.infoSvc.getInfoForPie();
  }

  showGraphic(){
    var chartDom = document.getElementById('pie')!;
    var myChart = echarts.init(chartDom, 'dark');
    var option = {
      title: {
        text: 'Usuarios por Ingeniería',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['sales']
      },
      series: [
        {
          name: 'Ingeniería',
          type: 'pie',
          radius: '50%',
          data: this.getInfo(),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.setOption(option);
  }

}
