import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://spotty-emus-happen.loca.lt'
})

export default Api