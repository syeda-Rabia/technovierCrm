import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 function DatePick({setDays}) {
  const [startDate, setStartDate] = useState("");
  const months=['JAN','FEB','MAR','APR',"MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return <DatePicker  className="border-0"
  style={{border:"1px solid white"}}
  
  value={startDate}
  selected={startDate}
  onChange={(date) => {
    setStartDate(date);
    // console.log(date);
    // showDate(date);
    let m=date.toString().split(" ")[1];
    let monthNumber=months.findIndex((item)=>item.toUpperCase()==m.toUpperCase())+1;

    console.log(monthNumber,date);
    setDays(state=>({...state,month:monthNumber>10?monthNumber:"0"+monthNumber}))
  }}
  
  dateFormat="MM"
  popperClassName="some-custom-class"
  popperPlacement="left"
  popperModifiers={{
    offset: {
      enabled: true,
      offset: "5px, 10px"
    },
    preventOverflow: {
      enabled: true,
      escapeWithReference: false,
      boundariesElement: "viewport"
    }
  }}
  showMonthYearPicker
/>;
}
export function YearPicking({setDays}) {
//   const [startDate, setStartDate] = useState("");
//   // const months=['JAN','FEB','MAR','APR',"MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
//   return <DatePicker  className="zIndex-5 border border-none "
//   style={{border:"1px solid white"}}
  
//   value={startDate}
//   selected={startDate}
//   onChange={(date) => {
//     setStartDate(date);
//     console.log(date);
//     // showDate(date);
//     // let m=date.toString().split(" ")[1];
//     // let monthNumber=months.findIndex((item)=>item.toUpperCase()==m.toUpperCase())+1;

//     // setDays(state=>({...state,year:date.toString().split(" ")[3]}))
//   }}
  
//   dateFormat="YYYY"
//   popperClassName="some-custom-class"
//   popperPlacement="top"
//   popperModifiers={{
//     offset: {
//       enabled: true,
//       offset: "5px, 10px"
//     },
//     preventOverflow: {
//       enabled: true,
//       escapeWithReference: false,
//       boundariesElement: "viewport"
//     }
//   }}
//   showYearPicker
// />;
const [startDate, setStartDate] = useState("");
return (
  <DatePicker className="border-0"
  style={{border:"1px solid white"}}
    selected={startDate}
    value={startDate}
 
    onChange={(date) => {setStartDate(date)
    
      setDays(state=>({...state,year:date.toString().split(" ")[3]}))
    
    }}
    popperClassName="some-custom-class"
    popperPlacement="top"
    popperModifiers={{
      offset: {
        enabled: true,
        offset: "5px, 10px"
      },
      preventOverflow: {
        enabled: true,
        escapeWithReference: false,
        boundariesElement: "viewport"
      }
    }}
    showYearPicker
    dateFormat="yyyy"
  />
);
}

export default DatePick;
