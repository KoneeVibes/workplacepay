import { useContext } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { RunPayrollModalWrapper } from "./styled";
import { P } from "../../../../components/typography/styled";

export const RunPayrollModal = ({ handleActionItemClick }) => {
    const { isRunPayrollModalOpen, setIsRunPayrollModalOpen } =
        useContext(Context);

    const handleCloseModal = () => {
        setIsRunPayrollModalOpen(false);
    };

    return (
        <BaseModal
            open={isRunPayrollModalOpen}
            onClose={handleCloseModal}
            className={"run-payroll-modal"}
            height={"auto"}
            width={"100%"}
        >
            <RunPayrollModalWrapper>
                <div
                    className="option"
                    onClick={(e) => handleActionItemClick(e, "with-employer")}
                >
                    <P>Run with employer</P>
                </div>
                <div className="separate"></div>
                <div
                    className="option"
                    onClick={(e) => handleActionItemClick(e, "without-employer")}
                >
                    <P>Run without employer</P>
                </div>
            </RunPayrollModalWrapper>
        </BaseModal>
    )
}