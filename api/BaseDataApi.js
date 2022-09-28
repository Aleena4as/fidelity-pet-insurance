import axios from '@/utils/request';

const baseformApi = '/form-fields';
export const fetchBaseData = () => {
   axios(baseformApi, {
      method: 'GET',
   }).then(response => {
      if (response.status === 200) {
         return [response.data.data, null];
      }
   });
};
