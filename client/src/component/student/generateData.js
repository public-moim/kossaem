function frequencyData(length,record,data,dates){
    let chart_data = []
    for (var i = 0; i < length; i++) {
      let count = 0;
      
      for (var j =0; j < record ; j++){
        
        if ((new Date(data[j].date)).toLocaleDateString() === dates[i].toLocaleDateString()){
count=count+1

        }else
        count=count
      }

      


      chart_data.push({
        days: dates[i].toLocaleDateString(),
        quiz: count
      })
    }

    return chart_data

}

function correctRate(length,record,data,dates,chart_data){
    let correctRate_data = []

    for (var i = 0; i < length; i++) {
        let count = 0;


        for (var j = 0; j < record; j++) {
           
            if (chart_data[i].days === (new Date(data[j].date)).toLocaleDateString()) {
                
                if (data[j].result === 'correct') {
                    count = count + 1

                } else
                    count = count
            }
           
        }
       
        
        


        if (chart_data[i].quiz === 0) {
            correctRate_data.push({
                days: dates[i].toLocaleDateString(),
                quiz: 0
            })
            
        } else {
            correctRate_data.push({
                days: dates[i].toLocaleDateString(),
                quiz: count / chart_data[i].quiz
            })

            
        }

      }

    return correctRate_data
}


function attendanceData(attendance,year){
    let data=[]
    let month=[0, 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11]

    for (var i=0; i< 12 ; i++){
        let count=0
        for (var j=0; j<attendance.length;j++){
            
            if(new Date(attendance[j].login_time).getMonth() === month[i]){
                count=count+1
                
                }
                else{
                    count=count
                }

        }
        

        data.push({
            days: month[i],
            count: count,
            quiz: Math.round(count/ new Date(year,month[i],0).getDate()*100)
        })
    }



    return data
}

function radarData(data,category,record){
let radarData = []
let levelstr = ["1", "2","3","4","5","6"] 

for (var i=0;i< levelstr.length ;i++){
    let count_level=0
    let count_correct=0
    for (var j=0;j<record;j++){
        
        if (data[j].category===category && data[j].type===levelstr[i]){
            count_level=count_level+1
            
            if (data[j].result==='correct'){
                count_correct=count_correct+1
                
            }
            
            
            
        }

    }

    

    if (count_level===0){
        radarData.push({
            level: levelstr[i]+ '급',
            score:0
        })
    } else{
        radarData.push({
            level: levelstr[i]+ '급',
            score:Math.round(count_correct/count_level*100)
        })
    }

    

}
return radarData

}

export {frequencyData,correctRate, attendanceData, radarData}