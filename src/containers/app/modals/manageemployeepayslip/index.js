import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { ManageEmployeePayslipModalWrapper } from "./styled";
import { Label, Span } from "../../../../components/typography/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { Column } from "../../../../components/flex/styled";

export const ManageEmployeePayslipModal = ({ activePayslipId, payroll, setPayroll, height, width, variables }) => {
    const { isManageEmployeeModalOpen, setIsManageEmployeeModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [formDetails, setFormDetails] = useState({
        variable: " ",
        amount: ""
    });

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!isManageEmployeeModalOpen) {
            setFormDetails({
                variable: " ",
                amount: ""
            });
        }
    }, [isManageEmployeeModalOpen])

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        return setIsManageEmployeeModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // to dismiss any entry that is not a number
        // from populating the amount field
        if (name === "amount" && isNaN(value)) {
            return;
        };
        setFormDetails((prev) => {
            let updatedAmount = "";
            if (name === "variable" && value.trim()) {
                const foundPayslip = payroll.find(p => p.payslipId === activePayslipId);
                if (foundPayslip) {
                    const foundVariable = foundPayslip.payrollVariables.find(v => v.setupVariableId === Number(value));
                    if (foundVariable) {
                        updatedAmount = foundVariable.value || "0";
                    };
                };
            };
            return {
                ...prev,
                [name]: value,
                ...(name === "variable" ? { amount: updatedAmount } : {}),
            };
        });
    };

    const handlePayslipUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPayroll(prevPayslips =>
            prevPayslips.map(payslip => {
                if (payslip.payslipId === activePayslipId) {
                    const updatedVariables = payslip.payrollVariables.map(variable => {
                        if ((Number(variable.setupVariableId) === Number(formDetails.variable))) {
                            return { ...variable, value: parseFloat(formDetails.amount) };
                        };
                        return variable;
                    });
                    return { ...payslip, payrollVariables: updatedVariables };
                };
                return payslip;
            })
        );
        return setIsManageEmployeeModalOpen(false);
    };

    return (
        <BaseModal
            open={isManageEmployeeModalOpen}
            onClose={handleCloseModal}
            className={"manage-employee-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <ManageEmployeePayslipModalWrapper
                onSubmit={handlePayslipUpdate}
            >
                <div
                    className="close-modal-button-area"
                >
                    <BaseButton
                        className="close-modal-button"
                        width={matches ? "-webkit-fill-available" : "fit-content"}
                        onClick={handleCloseModal}
                    >
                        <Span>X</Span>
                    </BaseButton>
                </div>
                <Column
                    gap={"calc(var(--flexGap)/2)"}
                >
                    <BaseFieldSet>
                        <Label>Select Variable</Label>
                        <BaseSelect
                            name="variable"
                            value={formDetails.variable}
                            onChange={handleChange}
                        >
                            <option
                                value=""
                            >
                                Choose Variable
                            </option>
                            {variables?.map((variable, index) => (
                                <option
                                    key={index}
                                    value={variable.setupVariableId}
                                >
                                    {variable.name}
                                </option>
                            ))}
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Cash Amount</Label>
                        <BaseInput
                            type="text"
                            name="amount"
                            value={formDetails.amount}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                </Column>
                <div className="submit-button-area">
                    <BaseButton
                        type="submit"
                        backgroundcolor={"#4E57BB"}
                        width={matches ? "-webkit-fill-available" : "fit-content"}
                    >
                        <Span>Update</Span>
                    </BaseButton>
                </div>
            </ManageEmployeePayslipModalWrapper>
        </BaseModal>
    )
}