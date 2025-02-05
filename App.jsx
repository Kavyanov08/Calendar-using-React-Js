import { useState } from 'react'
import './App.css'

const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const months=['January','February','March','April','May','June','July','August','September','October','November','December']

function App() {
  const[selecteddate,setSelecteddate]=useState(new Date())

  const daysinmonth=()=>{
    const daysarray=[]
    const firstday=new Date(selecteddate.getFullYear(),selecteddate.getMonth(),1)
    const lastday=new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,0)
    for(let i=0;i<firstday.getDay();i++){
      daysarray.push(null)
    }
    for(let i=1;i<=lastday.getDate();i++){
      daysarray.push(new Date(selecteddate.getFullYear(),selecteddate.getMonth(),i))
    }
    return daysarray
  }
  const issameday=(date1,date2)=>{
    return date1.getDate()===date2.getDate()&&date1.getMonth()===date2.getMonth()&&date1.getFullYear()===date2.getFullYear()
  }
  daysinmonth()
  const handlechangemonth=(e)=>{
    const newmonth=parseInt(e.target.value,10)
    setSelecteddate(new Date(selecteddate.getFullYear(),newmonth,1))
  }
  const handlechangeyear=(e)=>{
    const newyear=parseInt(e.target.value,10)
    setSelecteddate(new Date(newyear,selecteddate.getMonth(),1))
  }
  return (
    <>
      <div className="calendar">
        <div className="header">
          <button onClick={()=>{
            setSelecteddate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()-1,1))
          }}>{'<'}</button>
          <select value={selecteddate.getMonth()} onChange={handlechangemonth}>
            {months.map((month,index)=>(
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select value={selecteddate.getFullYear()} onChange={handlechangeyear}>
            {Array.from({length:10},(_,i)=>
              selecteddate.getFullYear() -5+i).map((year)=>
              (<option key={year} value={year}>{year}</option>)
            )}
          </select>
          <button  onClick={()=>{
            setSelecteddate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,1))
          }}>{'>'}</button>
        </div>
        <div className="daysofweek">
          {days.map((day)=>(
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {daysinmonth().map((day,index)=>(
            <div  key={index} className={day?(issameday(day,new Date())?'day current':'day'):'empty'}>{day?day.getDate():''}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
