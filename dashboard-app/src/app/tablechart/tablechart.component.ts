import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CubejsClient } from "@cubejs-client/ngx";
import { Subject } from "rxjs";
import * as moment from "moment";
import {
  isQueryPresent,
  PivotConfig as TPivotConfig,
  Query,
  ResultSet,
} from '@cubejs-client/core';
import { TableComponent } from 'smart-webcomponents-angular/table';

@Component({
  selector: 'app-tablechart',
  templateUrl: './tablechart.component.html',
  styles: [
  ]
})
export class TablechartComponent implements OnInit {

  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  sorting = {
    enabled: true,
    mode: 'one'
  }

  filtering: {
    enabled: true,
    filterRow: {
      visible: true
    }
  }
  columnDefs = [
    { field: 'TSData.projectname', sortable: true, filter: true },
    { field: 'TSData.monthyear', sortable: true, filter: true },
    { field: 'TSData.IntEquivalent', sortable: true, filter: true }
  ];
  columnDefs1 = [
    { field: 'Name', sortable: true, filter: true },
    { field: 'Age', sortable: true, filter: true },
    { field: 'Contact', sortable: true, filter: true }
  ];

  UserData = [{
    Name: "Arpita",
    Age: 21,
    Contact: 9822360555
  },
  {
    Name: "Anuja",
    Age: 20,
    Contact: 9146885987
  },
  {
    Name: "Saurabh",
    Age: 22,
    Contact: 8087889404
  }, {
    Name: "Tanvi",
    Age: 21,
    Contact: 78941258633
  }, {
    Name: "Nikhil",
    Age: 20,
    Contact: 9871236664
  }, {
    Name: "Yash",
    Age: 23,
    Contact: 9635744489
  },
  {
    Name: "Nikita",
    Age: 20,
    Contact: 99367451236
  },
  {
    Name: "Arti",
    Age: 25,
    Contact: 9604161299
  },
  {
    Name: "Anuj",
    Age: 23,
    Contact: 9563214785
  },
  {
    Name: "Anvi",
    Age: 21,
    Contact: 7752369845
  },


  ];
  chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];
  chartLabels3: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];


  columns = [
    {
      label: 'Name', dataField: 'Name'
    },
    {
      label: 'Age', dataField: 'Age'
    },
    { label: 'Contact', dataField: 'Contact' },
    // { label: 'Product', dataField: 'productName' },
    // { label: 'Quantity', dataField: 'quantity', align: 'right', cellsAlign: 'right', },
    // { label: 'Delivery Date', dataField: 'date', align: 'right', cellsAlign: 'right', cellsFormat: 'd' },
    // { label: 'Unit Price', dataField: 'price', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
    // { label: 'Total', dataField: 'total', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' }
  ]

  MonthYear: any;
  @Input() chartType;
  @Input() query;
  @Input() title;
  chartLabels1: any;
  Color: any;
  piedata : any ;
  pielabel : any ;
  type : "radialBar"; 
  constructor(private cubejs: CubejsClient) { }

  public chartData;
  chartData1;
  public chartLabels = [];
  public chartOptions: any = {
    legend: {
      position: "top",
      align: "start",
    },
    title: {
      text: 'SA Taxi Charts.',
      display: true,
      fontSize : 40,
      fontStyle : 'bold',
      
    },
    responsive: true,
    noFillChartOptions : true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  Details: any;
  defaultColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
  };
  public chartColors: any = [
    {
      borderColor: "#4D5360",
      backgroundColor: "#949FB1"
    }
  ];
  public chartColors1: any = [
    {
      borderColor: "white",
      backgroundColor: "#949FB1"
    }
  ];

  private querySubject;
  ready = false;
  total: any;
  count: any;
  page: number = 1;
  ArrayData: any;
  chartType1 = 'line'
  chartType2 = 'pie'
  chartType3 = 'doughnut'
  MonthYear1: any
  private dateFormatter = ({ y }) => moment(y);

  //Transform data for visualization
  commonSetup(resultSet) {
    debugger;
    this.chartData = resultSet.seriesNames().map(({ key, title }) => ({
      data: resultSet.backwardCompatibleData[0],//resultSet.chartPivot().map((element) => element[key]),
      label: title

    }));
    // if (resultSet.backwardCompatibleData.length > 0)
    //   this.chartLabels = resultSet.chartPivot().map(this.dateFormatter) //resultSet.backwardCompatibleData["TSData.projectname"]//[1]//resultSet.chartPivot().map()chartPivot().map(this.dateFormatter);
    this.chartLabels.length = 0;
    for (let i = resultSet.backwardCompatibleData[0].length - 1; i >= 0; i--) {
      this.chartLabels.push(resultSet.backwardCompatibleData[0][i]["TSData.projectname"]);
    }
    this.Details = this.chartData[0].data;
    //console.log("Details : ", this.Details)//, "this.chartLabels", this.chartLabels
    // console.log("chartdata : ", this.chartData, "query : ", this.query)
    // console.log("this.resultChanged = ", this.resultChanged)
    this.total = this.Details.reduce((sum: any, item: { [x: string]: any; }) => sum + item["TSData.IntEquivalent"], 0);
    this.count = Object.keys(this.Details).length
    // this.ArrayData = JSON.stringify(this.Details);
    //console.log(`User : ${this.User}`)

    this.chartData1 = resultSet.series().map((item) => {
      return {
        label: item.title,
        data: item.series.map(({ value }) => value),
        stack: 'a',
      };
    });
    this.chartLabels1 = resultSet.chartPivot().map((row) => row.x);

    this.piedata = resultSet.series().map((item) => {
      return {
        label: item.title,
        data: item.series.map(({ value }) => value),
        stack: 'a',
      };
    });;
    this.pielabel = resultSet.chartPivot().map((row) => row.x);
    // this.chartLabels1 = this.chartLabels//resultSet.chartPivot().map(this.dateFormatter);
    // this.chartData1 = resultSet.seriesNames().map(({ key, title }) => ({
    //   data: resultSet.chartPivot().map((element) => element[key]),
    //   label: title
    // })); 
    console.log("chartdata1 : ", this.chartData1, "\n this.chartLabels1", this.chartLabels1)//,  
  }
  resultChanged(resultSet) {
    this.commonSetup(resultSet);
    this.ready = true;
  }
  ngOnInit(): void {

    console.log("oninit query : ", this.query)
    this.querySubject = new Subject();

    this.resultChanged = this.resultChanged.bind(this);
    this.cubejs
      .watch(this.querySubject)
      .subscribe(this.resultChanged, (err) => console.log("HTTP Error", err));

    this.querySubject.next(this.query);

  }
  filterdata(resultset) {
    console.log(resultset)
    this.chartData1 = resultset.series().map((item) => {
      console.log(item)
      return {
        label: item.title,
        data: item.series.map(({ value }) => {
          if (value in this.chartLabels1)
            value;
        }),
        stack: 'a',
      };
    });
  }
  Search() {

    if (this.MonthYear == "") {
      this.ngOnInit();
    }
    else {
      {

        this.Details = this.Details.filter((res: any) => {
          console.log(` res.MonthYear ${res["TSData.monthyear"]}`)
          return res["TSData.monthyear"].toLocaleLowerCase().match(this.MonthYear.toLocaleLowerCase());
        })
        this.total = this.Details.reduce((sum, item) => sum + item["TSData.IntEquivalent"], 0);
        this.count = Object.keys(this.Details).length
      }
    }
  }

  Search1() {

    if (this.MonthYear1 == "") {
      this.ngOnInit();
    }
    else {
      {
        this.chartLabels1 = this.chartLabels1.filter((res: any) => {
          //console.log(`this.chartData1 ${this.chartData1} \n res.MonthYear ${res["TSData.monthyear"]}`)
          return res.toLocaleLowerCase().match(this.MonthYear1.toLocaleLowerCase());
        })
        console.log(`this.chartLabels1 ${this.chartLabels1} \n chartdata1 ${this.chartData1[0]}`)
        //this.filterdata(this)
        // this.chartData1 = this.chartData1.filter((res: any) => {
        //   console.log(`this.chartData1 ${this.chartData1} \n res.MonthYear ${res}`)
        //   return res.match(this.MonthYear1.toLocaleLowerCase());
        // })

      }
    }
  }
  

  Search2() {

    if (this.Color == "") {
      this.ngOnInit();
      // this.setdata();
      console.log(`chartLabels = ${this.pielabel} \n chartDatasets = ${this.piedata[0].data} \n `)
    }
    else {

      console.log(`chartLabels = ${this.pielabel} \n chartDatasets = ${this.piedata[0].data} \n `)
      var arryobj = {}
      this.pielabel.forEach((keyname, index) => {
        console.log(`keyName = ${keyname}\n`)

        this.piedata[0].data.forEach((value, index1) => {
          if (index == index1)
            arryobj[keyname] = value;
          //arryobj.push({keyname : value}) //{red:500}
        });
      });
      var globalData = [] 
      this.pielabel = this.pielabel.filter((res: any) => {
          return res.toLocaleLowerCase().match(this.Color.toLocaleLowerCase());
      })
      console.log(`labels = ${this.pielabel}`)
      
      for (var key of Object.keys(arryobj)) {
        console.log(key + " => " + arryobj[key] + "\n")
        this.pielabel.forEach(element => {
          if (element == key) {
            globalData.push(arryobj[key]) 
          }
        });
      }
      // console.log(`chartLabels3 = ${this.chartLabels3} \n chartDatasets = ${this.chartDatasets[0].data} \n `)
      // var arryobj = {}
      // this.chartLabels3.forEach((keyname, index) => {
      //   console.log(`keyName = ${keyname}\n`)

      //   this.chartDatasets[0].data.forEach((value, index1) => {
      //     if (index == index1)
      //       arryobj[this.chartLabels3[index]] = value;
      //     //arryobj.push({keyname : value}) //{red:500}
      //   });
      // });
      // console.log(`arryobj = ${arryobj["Red"]}\n`)
      // var globalData = [] // [500] // [red]
      // this.chartLabels3 = this.chartLabels3.filter((res: any) => {
      //   return res.toLocaleLowerCase().match(this.Color.toLocaleLowerCase());
      // })
      // console.log(`labels = ${this.chartLabels3}`)

      // for (var key of Object.keys(arryobj)) {
      //   console.log(key + " => " + arryobj[key] + "\n")
      //   this.chartLabels3.forEach(element => {
      //     if (element == key) {
      //       globalData.push(arryobj[key]) // (red:500)
      //     }
      //   });
      // }
      
      this.piedata[0].data = globalData;
      console.log(`globalData = ${globalData}`)
      // for(let value of arryobj){
      //   this.chartLabels3.forEach(element => {
      //       if(element == arryobj[value]){
      //         globalData.push(Object.values(value)) // (red:500)
      //       }
      //   });
      // };
    }
  }
  setdata() {
    this.chartDatasets = [
      { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
    ];
    this.chartLabels3 = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  }

  key: string = 'TSData.monthyear';
  reverse: boolean = false;
  sortTable(key: string) {
    this.key = key;
    console.log(`Key ${this.key}`)
    this.reverse = !this.reverse;
    console.log(`reverse ${this.reverse}`)
  }

  roundoff(val: any) {
    return Math.round(val * 100) / 100;
  }

  string(val: any) {
    return val.toString();
  }
}
