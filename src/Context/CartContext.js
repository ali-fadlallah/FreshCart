import axios from "axios";
import { TokenContext } from "./UserToken";

const { createContext, useContext, useState } = require("react");


export let CartContext = createContext(null);


export default function CartContextProvider({ children }) {


    let { token } = useContext(TokenContext)

    const baseURL = "https://ecommerce.routemisr.com/api/";

    const headers = { token: token };


    async function addtocart(productId) {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.post(`${baseURL}v1/cart`, { productId }, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    async function getCart() {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.get(`${baseURL}v1/cart`, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    async function deleteItem(productId) {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.delete(`${baseURL}v1/cart/${productId}`, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    async function updateCartQuantity(productId, count) {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.put(`${baseURL}v1/cart/${productId}`, { count }, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    async function checkout(cartid, shippingAddress) {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.post(`${baseURL}v1/orders/checkout-session/${cartid}`, { shippingAddress }, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    async function clearCart() {

        //axios.post(`${baseURL}v1/cart`, {"Ele gowa body"},{"Ele gowa el headers"})

        return axios.delete(`${baseURL}v1/cart`, { headers })
            .then(response => response)
            .catch(errors => errors)

    }

    const [numCartItems, setnumCartItems] = useState(0);

    return <CartContext.Provider value={{ addtocart, getCart, deleteItem, clearCart, updateCartQuantity, checkout, numCartItems, setnumCartItems }}>

        {children}

    </CartContext.Provider>

}