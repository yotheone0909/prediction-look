import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext({});

export function AppWrapper({ children }) {

    const [etherWeb3, setEtherWeb3] = useState(null);
    const [address, setAddress] = useState(null)

    useEffect(async () => {
        let _etherWeb3 = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (_etherWeb3) {
            setEtherWeb3(_etherWeb3);
            let addresses = await _etherWeb3.listAccounts();
            setAddress(addresses[0])
        }

        ethereum.on("accountsChanged", (addresses) => {
            setAddress(addresses[0])
        })
    }, [])

    const values = useMemo(() => {
        return {
            connect: async () => {
                try {
                    await etherWeb3.send("eth_requestAccounts", []);
                    let addresses = await etherWeb3.listAccounts()

                    setAddress(addresses[0])
                } catch {
                    location.reload()
                }

            },
            address: address,
            etherWeb3: etherWeb3
        }
    }, [address])

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}