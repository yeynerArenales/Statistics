import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(
    private infoSvc: InfoService
  ) { }

  ngOnInit(): void {
    this.showGraphic()
  }

  getInfo() {
    let data = this.infoSvc.getInfoForChart();
    return {
      names: Object.keys(data),
      values: Object.values(data)
    }
  }

  showGraphic() {
    let { names, values } = this.getInfo()
    var chartDom = document.getElementById('chart')!;
    var myChart = echarts.init(chartDom, 'dark');
    var option = {
      title: {
        text: 'Usuarios por Años de experiencia (Usuarios - Años)',
        left: 'center'
      },
      tooltip: {},
      legend: {
        data: ['']
      },
      xAxis: {
        data: names
      },
      yAxis: {},
      series: [
        {
          name: 'Años',
          type: 'bar',
          data: values
        }
      ]
    };

    myChart.setOption(option)
  }
}
