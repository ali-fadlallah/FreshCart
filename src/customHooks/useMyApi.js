import axios from "axios";
import { useQuery } from "react-query";



export default function useMyApi(key, endPoint) {

    const baseURL = "https://ecommerce.routemisr.com/api/";

    function getData() {

        return axios.get(`${baseURL}v1/${endPoint}`);

    }

    return useQuery(key, getData)

}