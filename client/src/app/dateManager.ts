import { NodeWithI18n } from '@angular/compiler'

export function habitEnded(date:Date){
   return removeTime(new Date())>removeTime(date)
}

export function removeTime(date:Date):Date{
   return new Date(date.toDateString())
}

export function getStreak(history){
   let streak = 0;
   let prev;
   let maxStreak=0;
   for (let i=0;i<history.length;i++){
      const h  = removeTime(history[i].date).valueOf()
      if (!prev){
         streak+=1;
      }
      else {
         const delta = h - prev;
         if ( delta<=(1000*60*60*24)){
            streak+=1
            
         }
         else {
            streak=1;
           
         }
      }
      if (streak>maxStreak){
         maxStreak = streak
      }
      prev = h
   }
   return maxStreak;
}

export function datesEqual(d1,d2){
   return d1.valueOf()==d2.valueOf()
}

export function getDateString(GMTString){
   const date = new Date(GMTString).toISOString()
   return date.substr(0,date.indexOf('T'))
}

export function getHistory(startDate,history){
   const timeRange = []
   let curr = removeTime(startDate).valueOf()
   const now = removeTime(new Date()).valueOf()
   const historyDate = history.map(({date})=>removeTime(date).valueOf())
   let i=0;
   while (curr<=now){
      let found = false;
      while(i<history.length){
         if (historyDate[i]==curr){
            found=true;
            break;
         }
         else if (historyDate[i]>curr){
            break;
         }
         i+=1;
      }
      if (found){
         timeRange.push({date:new Date(curr),completed:true,dateTime:history[i].date})
      }
      else {
         timeRange.push({date:new Date(curr),completed:false})
      }
      curr+=1000*60*60*24
   }
   console.log(timeRange)
   return timeRange
}