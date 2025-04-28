import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false);
    const [isSideNavigationOpen, setIsSideNavigationOpen] = useState(false);
    const [isAddEmployeeSuccessModalOpen, setIsAddEmployeeSuccessModalOpen] = useState(false);
    const [isUpdateEmployeeSuccessModalOpen, setIsUpdateEmployeeSuccessModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isSelectCompaniesModalOpen, setIsSelectCompaniesModalOpen] = useState(false);
    const [isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen] = useState(false);
    const [isRunPayrollModalOpen, setIsRunPayrollModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [isPlansAndPricingModalOpen, setIsPlansAndPricingModalOpen] = useState(false);
    const [isEmployeeBulkUploadModalOpen, setIsEmployeeBulkUploadModalOpen] = useState(false);

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
            isUpdateEmployeeSuccessModalOpen,
            setIsUpdateEmployeeSuccessModalOpen,
            isResetPasswordModalOpen,
            setIsResetPasswordModalOpen,
            isSelectCompaniesModalOpen,
            setIsSelectCompaniesModalOpen,
            isPayslipDetailsModalOpen,
            setIsPayslipDetailsModalOpen,
            isRunPayrollModalOpen,
            setIsRunPayrollModalOpen,
            isPlansAndPricingModalOpen,
            setIsPlansAndPricingModalOpen,
            isAddEmployeeModalOpen,
            setIsAddEmployeeModalOpen,
            isEmployeeBulkUploadModalOpen,
            setIsEmployeeBulkUploadModalOpen,
        }}>
            {children}
        </Context.Provider>
    )
}