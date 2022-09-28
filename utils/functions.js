import api from './request';
import moment from 'moment';
export const submitForm = (event, submitPath, data) => {
   event.preventDefault();
   localStorage.setItem('user', { logged: true });
   validateEmail(data['email']) && validatePassword(data['password']) ? true : false;
};

const validateEmail = email => {
   const email_reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const result = email_reg.test(email.toLowerCase());
   return result;
};
const validatePassword = password => {
   const pass_reg = /^[A-Za-z]\w{7,}$/;
   const result = pass_reg.test(password);
   return result;
};

export const dateToDBFormat = date => {
   let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;

   return [year, month, day].join('-');
};

export const checkSmallDate = selectedDate => {
   if ((selectedDate = Date.now())) {
      return true;
   }
   if (selectedDate < Date.now()) {
      return false;
   }

   return true;
};

export const calculateWeekDiff = dob => {
   var todayis = moment().format('YYYY-MM-DD');
   var a = moment(todayis, 'YYYY-MM-DD');
   var b = moment(dob, 'YYYY-MM-DD');
   var weekDiff = a.diff(b, 'week');
   return weekDiff;
};

