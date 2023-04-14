import React from 'react'
import {AreaChart, Area, ResponsiveContainer,Tooltip} from 'recharts'
function Chart1({chartData}) {
    
    let data_length =0
   
   
  
  return (
    
<ResponsiveContainer width={'100%'} height={50}>
        <AreaChart
        width={200}
        height={60}
        data={chartData}
        margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}>
            <Tooltip />
            <Area type='monotone' dataKey="quiz" stroke="#8884d8" fill="#8884d8"/>
        </AreaChart>
        
    </ResponsiveContainer>
    
    
  )
}

export default Chart1
