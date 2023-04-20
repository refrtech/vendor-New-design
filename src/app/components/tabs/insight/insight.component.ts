import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.scss']
})
export class InsightComponent implements OnInit {
  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //firstRowIsData: true,
    options: {'title': 'Tasks'},
  };


  public columnChart: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Country', 'Performance', 'Profits'],
      ['Germany', 700, 1200],
      ['USA', 300, 600],
      ['Brazil', 400, 500],
      ['Canada', 500, 1000],
      ['France', 600, 1100],
      ['RU', 800, 1000]
    ],
    options: {
      title: 'Countries',
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true
      }
    }
  };


  public timelineChart: GoogleChartInterface = {
    chartType: GoogleChartType.Timeline,
    dataTable: [
      ['Name', 'From', 'To'],
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
    ]
 };

 public geoChart: GoogleChartInterface = {
  chartType: GoogleChartType.GeoChart,
  dataTable: [
    ['Country', 'Population (2019)'],
    ['Austria',	8858775],
    ['Belgium',	11467923],
    ['Bulgaria', 7000039],
    ['Croatia',	4076246],
    ['Cyprus',	875898],
    ['Czech Republic', 10649800],
    ['Denmark',	5806081],
    ['Estonia',	1324820],
    ['Finland',	5517919],
    ['France',	67028048],
    ['Germany',	83019214],
    ['Greece',	10722287],
    ['Hungary',	9797561],
    ['Ireland',	4904226],
    ['Italy',	60359546],
    ['Latvia', 1919968],
    ['Lithuania',	2794184],
    ['Luxembourg', 613894],
    ['Malta',	493559],
    ['Netherlands',	17282163],
    ['Poland', 37972812],
    ['Portugal', 10276617],
    ['Romania',	19401658],
    ['Slovakia', 5450421],
    ['Slovenia', 2080908],
    ['Spain',	46934632],
    ['Sweden', 10230185],
  ],
  options: {
    region: '150', // Europe
    colorAxis: {colors: ['#ffc107', '#fd7e14', '#dc3545']},
    backgroundColor: '#9cf',
    datalessRegionColor: '#f8f9fa',
    defaultColor: '#6c757d',
  }
};

public lineChart: GoogleChartInterface = {
  chartType: GoogleChartType.LineChart,
  dataTable: [
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ],
  options: {title: 'Company Performance'}
};

  constructor() { }

  ngOnInit(): void {
  }

}
