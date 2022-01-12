import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contractBetAbi, contractBetAddress, daiAbi, yoTokenAddress } from "../constants/constants";

const AppContext = createContext({});

export function AppWrapper({ children })
{

    const [etherWeb3, setEtherWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [token, setToken] = useState(null);
    const [contranctBet, setContranctBet] = useState(null);
    const initialValue = [];
    const [predicts, setPredicts] = useState(initialValue)
    

    useEffect(async () =>
    {
        let _etherWeb3 = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (_etherWeb3)
        {
            setEtherWeb3(_etherWeb3);
            let addresses = await _etherWeb3.listAccounts();
            setAddress(addresses[0])
            
            const contract = new ethers.Contract(yoTokenAddress, daiAbi, _etherWeb3)
            setToken(contract)
            const contractBet = new ethers.Contract(contractBetAddress, contractBetAbi, _etherWeb3)
            setContranctBet(contractBet)
        }

        ethereum.on("accountsChanged", (addresses) =>
        {
            setAddress(addresses[0])
        })
        values
    }, [])

    const values = useMemo(() =>
    {

        return {
            connect: async () =>
            {
                try
                {
                    await etherWeb3.send("eth_requestAccounts", []);
                    let addresses = await etherWeb3.listAccounts()

                    setAddress(addresses[0])

                    console.log("useMemo Context: ")

                } catch {
                    location.reload()
                }

            },
            address: address,
            contranctBet: contranctBet

        }
    }, [address, token, contranctBet])

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext()
{
    return useContext(AppContext);
}