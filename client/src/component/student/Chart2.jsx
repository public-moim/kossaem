import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts'
function Chart2({chartData}) { 
  
  return (
    
<ResponsiveContainer  width="90%" height="100%">
        <RadarChart
        cx="50%" cy="50%" outerRadius="80%" data={chartData}
        padding={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}>
            <PolarGrid />
          <PolarAngleAxis dataKey="level" />
          <PolarRadiusAxis />
            <Radar  dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
        
    </ResponsiveContainer>
    
    
  )
}

export default Chart2
