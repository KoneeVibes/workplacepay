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

export const ManageEmployeePayslipModal = ({ activeEmployeeId, employees, setEmployees, height, width, variables }) => {
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
        if (name === "amount" && isNaN(value)) return;

        setFormDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmployeeUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const variableName = formDetails.variable.trim();
        const amount = formDetails.amount.trim() || "0";

        if (!variableName) return;

        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => {
                const isActive = emp.employeeId === activeEmployeeId;
                const payrollVariables = Array.isArray(emp.payrollVariables) ? [...emp.payrollVariables] : [];

                const existingVarIndex = payrollVariables.findIndex(
                    (v) => v.name === variableName
                );

                if (existingVarIndex !== -1) {
                    if (isActive) {
                        payrollVariables[existingVarIndex].value = amount;
                    }
                } else {
                    payrollVariables.push({
                        name: variableName,
                        value: isActive ? amount : "0",
                    });
                }
                return {
                    ...emp,
                    payrollVariables,
                };
            })
        );
        setFormDetails({ variable: "", amount: "" });
        setIsManageEmployeeModalOpen(false);
    };

    const capitalizeWords = (str) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <BaseModal
            open={isManageEmployeeModalOpen}
            onClose={handleCloseModal}
            className={"manage-employee-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <ManageEmployeePayslipModalWrapper
                onSubmit={handleEmployeeUpdate}
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
                                    value={capitalizeWords(variable.name)}
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