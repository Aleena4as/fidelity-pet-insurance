import axios from 'axios';

const Stagging = 'https://fidelity.bluelogic.ai/api/core';
const Production = 'https://mybuddy.fidelityunited.ae/api/core';

const productionServer = false;
export default axios.create({
   baseURL: productionServer ? Production : Stagging,
   headers: {
      'Content-Type': 'application/json',
   },
});
