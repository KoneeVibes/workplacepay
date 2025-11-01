import { createContext, useState } from "react";
import Cookies from "universal-cookie";

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
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
    const [isPlansAndPricingModalOpen, setIsPlansAndPricingModalOpen] = useState(false);
    const [isEmployeeBulkUploadModalOpen, setIsEmployeeBulkUploadModalOpen] = useState(false);
    const [isDepartmentBulkUploadModalOpen, setIsDepartmentBulkUploadModalOpen] = useState(false);
    const [isManageEmployeeModalOpen, setIsManageEmployeeModalOpen] = useState(false);
    const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
      const [activeCompanyId, setActiveCompanyId] = useState(() => {
    const cookie = new Cookies();
    return cookie.get("COMPANY_ID") || null;
  });

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
            isPlansAndPricingModalOpen,
            setIsPlansAndPricingModalOpen,
            isAddEmployeeModalOpen,
            setIsAddEmployeeModalOpen,
            isAddDepartmentModalOpen,
            setIsAddDepartmentModalOpen,
            isEmployeeBulkUploadModalOpen,
            setIsEmployeeBulkUploadModalOpen,
            isDepartmentBulkUploadModalOpen,
            setIsDepartmentBulkUploadModalOpen,
            isManageEmployeeModalOpen,
            setIsManageEmployeeModalOpen,
            isEditPlanModalOpen,
            setIsEditPlanModalOpen,
            activeCompanyId, setActiveCompanyId
        }}>
            {children}
        </Context.Provider>
    )
}