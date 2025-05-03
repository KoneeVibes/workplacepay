import { Context } from "../../../../context";
import { useContext, useEffect, useRef, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { DepartmentBulkUploadModalWrapper } from "./styled";
import Cookies from "universal-cookie";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { bulkDepartmentUploadService } from "../../../../utils/apis/department/bulkUpload";

export const DepartmentBulkUploadModal = ({ height, width, setIsSuccessModalOpen }) => {
    const cookies = new Cookies();
    const { TOKEN, COMPANY_ID } = cookies.getAll() ?? {};

    const fileInputRef = useRef(null);
    const { isDepartmentBulkUploadModalOpen, setIsDepartmentBulkUploadModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDetails, setFormDetails] = useState({
        csvFile: "",
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

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        return setIsDepartmentBulkUploadModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, files, value, type } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleBulkUpload = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);
        setIsLoading(true);
        const formData = new FormData();
        formData.append(`File`, formDetails.csvFile);
        try {
            const response = await bulkDepartmentUploadService(TOKEN, formData, COMPANY_ID);
            if (response.status === "Success") {
                setIsLoading(false);
                setIsDepartmentBulkUploadModalOpen(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setIsSuccessModalOpen(true);
            } else {
                setIsLoading(false);
                setError("Bulk upload failed. Please check your credentials and try again.");
                console.error("Bulk upload failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Bulk upload failed. ${error.message}`);
            console.error("Bulk upload failed:", error);
        }
    };

    return (
        <BaseModal
            open={isDepartmentBulkUploadModalOpen}
            onClose={handleCloseModal}
            className={"department-bulk-upload-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <DepartmentBulkUploadModalWrapper
                onSubmit={handleBulkUpload}
            >
                <div
                    className="close-modal-button-area"
                >
                    <BaseButton
                        className="close-modal-button"
                        onClick={handleCloseModal}
                    >
                        <Span>X</Span>
                    </BaseButton>
                </div>
                <div
                    className="modal-header"
                >
                    <legend>Bulk Upload</legend>
                    <P>Upload the formatted CSV below.</P>
                </div>
                <div>
                    <BaseFieldSet>
                        <Label>Upload File</Label>
                        <BaseInput
                            type="file"
                            name="csvFile"
                            ref={fileInputRef}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                </div>
                <div className="submit-button-area">
                    {error && <P style={{ color: "red" }}>{error}</P>}
                    <BaseButton
                        type="submit"
                        backgroundcolor={"#4E57BB"}
                        width={matches ? "-webkit-fill-available" : "fit-content"}
                    >
                        {isLoading ? (
                            <DotLoader size={20} color="white" className="dotLoader" />
                        ) : (
                            <Span>Upload</Span>
                        )}
                    </BaseButton>
                </div>
            </DepartmentBulkUploadModalWrapper>
        </BaseModal>
    )
}