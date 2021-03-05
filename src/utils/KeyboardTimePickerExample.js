import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker ,DatePicker} from "@material-ui/pickers";
// import DatePicker from "react-datepicker";


import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export function KeyboardTimePickerExample(props) {
  const [selectedTime, handleTimeChange] = useState(props.value);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        placeholder="00:00 AM"
        mask="__:__ _M"
        value={selectedTime}
        onChange={(time) => {
          handleTimeChange(time);
          props.showTime(time);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export function KeyboardDatePickerExample({ value, showDate }) {
  const [selectedDate, handleDateChange] = useState(value);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // inputVariant="outlined"
        placeholder="10/10/2018"
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
          showDate(date);
        }}
        format="yyyy/MM/dd"
      />
    </MuiPickersUtilsProvider>
  );
}
export function YearPicker({setDays}) {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        views={["year"]}
        defaultValue={""}
        value={selectedDate}
        onChange={(val)=>{
          handleDateChange(val);
          setDays(state=>({...state,year:val.toString().split(" ")[3]}))
        }}
      />

    
</MuiPickersUtilsProvider>
  );
}
export function MonthPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd"
        margin="normal"
        id="date-picker-inline"
       
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
       */}
     <DatePicker
        // variant="inline"
        // openTo="month"
        views={["month"]}
        // label="Year and Month"
        // helperText="Start from year selection"
        value={selectedDate}
        onChange={handleDateChange}
      />
    
</MuiPickersUtilsProvider>
  );
}

// export default YearMonthPicker;