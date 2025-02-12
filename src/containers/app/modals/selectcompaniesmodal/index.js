import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { SelectCompaniesModalWrapper } from "./styled";
import { Context } from "../../../../context";
import { BaseSelect } from "../../../../components/form/select/styled";
import { BaseButton } from "../../../../components/button/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { Span } from "../../../../components/typography/styled";

export const SelectCompaniesModal = ({ height, width }) => {
  const { isSelectCompaniesModalOpen, setIsSelectCompaniesModalOpen } = useContext(Context);

  const [matches, setMatches] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedCompany(value);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsSelectCompaniesModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selected Company:", selectedCompany);
  };

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.screen.availWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BaseModal
      open={isSelectCompaniesModalOpen}
      onClose={handleCloseModal}
      className={"select-companies-modal"}
      height={height || "auto"}
      width={matches ? "60%" : width || "40%"}
    >
      <SelectCompaniesModalWrapper>
        {/* Newton your code should go under this line */}
        <div>
          <legend>Select Company</legend>
        </div>
        <BaseFieldSet>
          <BaseSelect
            value={selectedCompany}
            onChange={handleChange}
          >
            <option
              value=""
              hidden
            >
              Select Company
            </option>
            <option value="company1">Company 1</option>
            <option value="company2">Company 2</option>
            <option value="company3">Company 3</option>
          </BaseSelect>
        </BaseFieldSet>
        <Row
          className="action-buttons-row"
        >
          <div>
            <BaseButton
              onClick={handleCloseModal}
            >
              <Span>Cancel</Span>
            </BaseButton>
          </div>
          <div>
            <BaseButton
              onClick={handleSubmit}
            >
              <Span>Ok</Span>
            </BaseButton>
          </div>
        </Row>
      </SelectCompaniesModalWrapper>
    </BaseModal>
  );
};
