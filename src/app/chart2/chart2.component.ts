import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Component } from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrl: './chart2.component.css',
  imports: [BaseChartDirective]

})
export class Chart2Component {

  // pieChartData!: ChartData<ChartType, number[], string>;
  // pieChartLabels: string[] = [];
  // constructor(private http : HttpClient)   { }
  // ngOnInit(): void {
  // this.http.get<any>('http://localhost:8087/contrat/countByProduit').subscribe(data => {
  //   console.log("this is data from BE :", data);
  //   this.pieChartLabels = Object.keys(data); 
  //   this.pieChartData = {
  //     labels: this.pieChartLabels,
  //     datasets: [
  //       {
  //         data: Object.values(data),
  //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey'],
  //         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey'],
  //       },
  //     ],
  //   };
  // });

  // }

  lineChartData!: ChartData<'line'>;
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8087/contrat/countByProduit').subscribe(data => {
      console.log("this is data from BE:", data);
      this.lineChartLabels = Object.keys(data); 
      console.log("this is data line chart from BE:", data);
      this.lineChartData = {
        labels: this.lineChartLabels,
        datasets: [
          {
            data: Object.values(data),
            label: 'Nombre de contrats',
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54,162,235,0.2)',
            fill: true,
          },
        ],
      };
    });
  }

}
