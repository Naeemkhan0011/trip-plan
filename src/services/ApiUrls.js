import config from '../config';

const BASE_API_URL = `http://ec2-52-66-186-107.ap-south-1.compute.amazonaws.com:2083` ;
export default {
  GET_PRODUCT_URL: `${BASE_API_URL}/inventory/getProducts`,
  VIEW_PRODUCT_URL: `${BASE_API_URL}inventory/getProducts`,
  
};
