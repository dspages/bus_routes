import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class BoardingsChart extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="chart-box">
        {this.props.selectedStop ? <BarChart width={600} height={500} data={[this.props.selectedStop]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="cross_street"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Legend layout="vertical"/>
         <Bar dataKey="boardings" fill="#aa2222" />
         <Bar dataKey="alightings" fill="#2222aa" />
        </BarChart> : null}
      </div>
    );
  }
}

export default BoardingsChart;
