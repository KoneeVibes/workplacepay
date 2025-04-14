import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { PayslipDetailsModalWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";

export const PayslipDetailsModal = ({ height, width }) => {
    const [matches, setMatches] = useState(false);
    const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } = useContext(Context);

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setIsPayslipDetailsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 425);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BaseModal
            open={isPayslipDetailsModalOpen}
            onClose={handleCloseModal}
            className={"payslip-details-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "60%" : width || "50%"}
        >
            <PayslipDetailsModalWrapper>
                <Row>
                    <div></div>
                    <div></div>
                </Row>
                <div></div>
                <div></div>
            </PayslipDetailsModalWrapper>
        </BaseModal>
    )
}