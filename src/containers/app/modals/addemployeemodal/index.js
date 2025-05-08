import { useContext, useCallback } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { AddEmployeeModalWrapper } from "./styled";
import { P } from "../../../../components/typography/styled";
import { Column, Row } from "../../../../components/flex/styled";
import { useEffect } from "react";

export const AddEmployeeModal = ({ handleActionItemClick }) => {
    const { isAddEmployeeModalOpen, setIsAddEmployeeModalOpen } =
        useContext(Context);

    const handleCloseModal = useCallback(() => {
        setIsAddEmployeeModalOpen(false);
    }, [setIsAddEmployeeModalOpen]);

    useEffect(() => {
        const handleScroll = () => {
            handleCloseModal();
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleCloseModal]);

    return (
        <BaseModal
            open={isAddEmployeeModalOpen}
            onClose={handleCloseModal}
            className={"add-employee-modal"}
            height={"auto"}
            width={"100%"}
        >
            <AddEmployeeModalWrapper>
                <div
                    className="option"
                    onClick={(e) => handleActionItemClick(e, "single-employee-upload")}
                >
                    <P>Single Employee</P>
                </div>
                <Row
                    className="bulk-upload"
                >
                    <div
                        className="bulk-upload-header"
                    >
                        <P>Bulk Upload</P>
                    </div>
                    <Column
                        className="bulk-upload-options"
                    >
                        <div
                            className="option"
                            onClick={(e) => handleActionItemClick(e, "download-template")}
                        >
                            <P>Download Template</P>
                        </div>
                        <div
                            className="option"
                            onClick={(e) => handleActionItemClick(e, "bulk-upload")}
                        >
                            <P>Upload CSV</P>
                        </div>
                    </Column>
                </Row>
            </AddEmployeeModalWrapper>
        </BaseModal>
    )
}