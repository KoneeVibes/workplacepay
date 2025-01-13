import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { SelectCompaniesModalWrapper } from "./styled";
import { Context } from "../../../../context";

export const SelectCompaniesModal = ({ height, width }) => {
    const {
        isSelectCompaniesModalOpen,
        setIsSelectCompaniesModalOpen
    } = useContext(Context);
    const [matches, setMatches] = useState(false);

    const handleCloseModal = () => {
        setIsSelectCompaniesModalOpen(false);
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
            open={isSelectCompaniesModalOpen}
            onClose={handleCloseModal}
            className={"select-companies-modal"}
            height={height || "auto"}
            width={matches ? "60%" : width || "50%"}
        >
            <SelectCompaniesModalWrapper>
                {/* Newton your code should go under this line */}

            </SelectCompaniesModalWrapper>
        </BaseModal>
    )
}