import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false);
    const [isSideNavigationOpen, setIsSideNavigationOpen] = useState(false);
    const [isAddEmployeeSuccessModalOpen, setIsAddEmployeeSuccessModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isSelectCompaniesModalOpen, setIsSelectCompaniesModalOpen] = useState(true);

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
            isResetPasswordModalOpen,
            setIsResetPasswordModalOpen,
            isSelectCompaniesModalOpen,
            setIsSelectCompaniesModalOpen
        }}>
            {children}
        </Context.Provider>
    )
}