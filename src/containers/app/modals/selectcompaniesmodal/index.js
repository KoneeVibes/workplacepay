import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { SelectCompaniesModalWrapper } from "./styled";
import { Context } from "../../../../context";
import { BaseSelect } from "../../../../components/form/select/styled";
import { BaseButton } from "../../../../components/button/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
// import { ButtonContainer, button } from "./styled";

export const SelectCompaniesModal = ({ height, width }) => {
  const { isSelectCompaniesModalOpen, setIsSelectCompaniesModalOpen } =
    useContext(Context);
  const [matches, setMatches] = useState(false);

  const [setIsOpen] = useState(true);
  const [companies, setCompanies] = useState("Select Company");

  const handleCloseModal = () => {
    setIsSelectCompaniesModalOpen(false);
  };
  const handleChange = (e) => setCompanies(e.target.value);
  const handleSubmit = () => {
    console.log("selected Company:", companies);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.screen.availWidth < 425);
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
      width={matches ? "60%" : width || "50%"}
    >
      <SelectCompaniesModalWrapper>
        {/* Newton your code should go under this line */}
        {/* <div>
          <div className="modal-overlay">
            <div className="modal">
              <h2>List Of Companies</h2>
              <select>
                <option>Company 1</option>
                <option>Company 2</option>
                <option>Company 3</option>
              </select>
              <div className="modal-actions">
                <button className="cancel-btn">Cancel</button>
                <button onClick={() => {}} className="ok-btn">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <BaseFieldSet>
          <label>List Of Companies</label>
          <BaseSelect value={companies} onChange={handleChange}>
            <option value="Select Company" hidden>
              Select Company
            </option>
            <option value="company1">Company 1</option>
            <option value="company2">Company 2</option>
            <option value="company3">Company 3</option>
          </BaseSelect>
        </BaseFieldSet>
        <Row>
          <BaseButton onClick={handleCloseModal} variant="cancel">
            Cancel
          </BaseButton>
          <BaseButton onClick={handleSubmit} variant="ok">
            Ok
          </BaseButton>
        </Row>
      </SelectCompaniesModalWrapper>
    </BaseModal>
  );
};
