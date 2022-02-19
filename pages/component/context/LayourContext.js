import { createContext, useContext, useMemo, useState } from "react";

const LayoutContextProvider = createContext({});

export function LayoutContext({ children }) {

    const [modalError, setModalError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    console.log("modalError", modalError);
    console.log("isLoading", isLoading);

    const values = useMemo(() => {
        return {
            isShowError: (bool) => {
                setModalError(bool);
            },
            modalError: modalError,
            setLoading: setIsLoading,
            isLoading: isLoading

        }
    }, [modalError, isLoading]);

    return (
        <LayoutContextProvider.Provider value={values}>
            {children}
        </LayoutContextProvider.Provider>
    );
}

export function useLayoutContext() {
    return useContext(LayoutContextProvider);
}