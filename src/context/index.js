import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false);
    const [isSideNavigationOpen, setIsSideNavigationOpen] = useState(false);
    const [isAddEmployeeSuccessModalOpen, setIsAddEmployeeSuccessModalOpen] = useState(false);
    const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);

    return (
        <Context.Provider value={{
            isMenuOpen,
            setIsMenuOpen,
            isPaymentFormModalOpen,
            setIsPaymentFormModalOpen,
            isSideNavigationOpen,
            setIsSideNavigationOpen,
            isAddEmployeeSuccessModalOpen,
            setIsAddEmployeeSuccessModalOpen,
            isGetStartedModalOpen,
            setIsGetStartedModalOpen
        }}>
            {children}
        </Context.Provider>
    )
}