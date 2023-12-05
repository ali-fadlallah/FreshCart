import { createContext, useState } from "react";


export let TokenContext = createContext(null);

export default function TokenContextProvider({ children }) {

    const [token, settoken] = useState(null)

    return <TokenContext.Provider value={{ token, settoken }}>

        {children}
    </TokenContext.Provider>

}


