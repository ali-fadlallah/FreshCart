import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { TokenContext } from "../Context/UserToken";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";

export default function ProtectedRoutes({ children }) {

    if (localStorage.getItem('freshCartToken')) {

        return children

    } else {

        return <Navigate to={'/login'} />
    }

}

export function Anonymous() {

    const location = useLocation();
    const currentPage = location.pathname;

    let { token } = useContext(TokenContext);

    if (currentPage == '/register') {

        return token ? <Navigate to="/" replace /> : <Register />;

    } else {

        return token ? <Navigate to="/" replace /> : <Login />;

    }

}