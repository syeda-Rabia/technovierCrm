import React, {Component} from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class QuarterlyLead_chart extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{
                labels:[
                    // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],
                    '0','10','20','30','40','50','60','70','80','90','100','110','120','130','140','150'],


                datasets:[
                    
                    {
                        label:'Leads Assign',
                        data:[
                            0,20,40,60,40,80,60,70,60,40,70,100,40,60,80,40,60,40,20
                        ],
                        backgroundColor:[
                            '',
                            '#D3AF40',
                            '#2B5989',
                             '#7D418A',
                            '#5CAC77',
                             '#B80E4E',
                            '#7182A2',
                             '#D3AF40',
                            '#2B5989',
                             '#7D418A',
                            '#5CAC77',
                             '#544CF9',
                            '#7182A2',
                             '#D3AF40',
                            '#2B5989',
                             '#7D418A',
                             '#5CAC77'
                        ]
                    }
                ]
            }
        }
    }
    render(){
        return(
            <div className="barchart">
              <Bar
              
  data={this.state.chartData}
  width={100}
  height={300}
  options={{ maintainAspectRatio: false }}
/>

            </div>
        )
    }
}
export default QuarterlyLead_chart;