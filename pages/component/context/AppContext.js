import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contractBetAbi, contractBetAddress, tokenAbi, yoTokenAddress } from "../constants/constants";

const AppContext = createContext({});

export function AppWrapper({ children }) {

    const [etherWeb3, setEtherWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [tokenBusd, setTokenBusd] = useState(null);
    const [contranctBet, setContranctBet] = useState(null);
    const [signer, setSigner] = useState(null);
    const [modalError, setModalError] = useState(false);
    const [switchNetwork, setSwitchNetwork] = useState(false);

    useEffect(async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
                }).then(() => {
                    console.log("Correct Net");
                    setSwitchNetwork(true);
                });
            } catch (error) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x97',
                                    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
            }

        } else {
            console.error("Not Install Metamask");
        }
    })

    useEffect(async () => {

        if (window.ethereum) {
            let _etherWeb3 = new ethers.providers.Web3Provider(window.ethereum, "any");
            await _etherWeb3.send("eth_requestAccounts", []).then(() => {
                console.log("eth_requestAccounts");
                setEtherWeb3(_etherWeb3);
                checkSwitchNetwork();
            }).catch(() => {
                console.log("No Login");
            });
        } else {
            console.error("Not Install Metamask");
        }
    }, [])

    useEffect(async () => {
        console.log("etherWeb3, ", etherWeb3);
        if (etherWeb3 && switchNetwork) {
            let addresses = await etherWeb3.listAccounts();
            var url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
            const provider = new ethers.providers.JsonRpcProvider(url);

            setAddress(addresses[0])
            setSigner(etherWeb3.getSigner())

            const contract = new ethers.Contract(yoTokenAddress, tokenAbi, provider)
            setTokenBusd(contract)
            const contractBet = new ethers.Contract(contractBetAddress, contractBetAbi, provider)
            setContranctBet(contractBet)

            ethereum.on("accountsChanged", (addresses) => {
                setAddress(addresses[0])
            })
            values
        }

    }, [etherWeb3, switchNetwork])

    const values = useMemo(() => {

        return {
            connect: async () => {
                try {
                    await etherWeb3.send("eth_requestAccounts", []);
                    let addresses = await etherWeb3.listAccounts()

                    setAddress(addresses[0])

                    console.log("useMemo Context: ")

                } catch {
                    location.reload()
                }

            },
            isShowError: (bool) => {
                setModalError(bool);
            },
            modalError: modalError,
            signer: signer,
            address: address,
            contranctBet: contranctBet,
            tokenBusd: tokenBusd

        }
    }, [address, tokenBusd, contranctBet, modalError])

    const checkSwitchNetwork = async () => {

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
            }).then(() => {
                console.log("Correct Net");
                setSwitchNetwork(true);
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x61',
                                rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                            },
                        ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}