import { useContext } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { AddDepartmentModalWrapper } from "./styled";
import { P } from "../../../../components/typography/styled";
import { Column, Row } from "../../../../components/flex/styled";

export const AddDepartmentModal = ({ handleActionItemClick }) => {
    const { isAddDepartmentModalOpen, setIsAddDepartmentModalOpen } =
        useContext(Context);

    const handleCloseModal = () => {
        setIsAddDepartmentModalOpen(false);
    };

    return (
        <BaseModal
            open={isAddDepartmentModalOpen}
            onClose={handleCloseModal}
            className={"add-department-modal"}
            height={"auto"}
            width={"100%"}
        >
            <AddDepartmentModalWrapper>
                <div
                    className="option"
                    onClick={(e) => handleActionItemClick(e, "single-department-upload")}
                >
                    <P>Single Department</P>
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
            </AddDepartmentModalWrapper>
        </BaseModal>
    )
}