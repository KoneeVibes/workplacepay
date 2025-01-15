import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { SelectCompaniesModalWrapper } from "./styled";
import { Context } from "../../../../context";

export const SelectCompaniesModal = ({ height, width }) => {
  const { isSelectCompaniesModalOpen, setIsSelectCompaniesModalOpen } =
    useContext(Context);
  const [matches, setMatches] = useState(false);

  const handleCloseModal = () => {
    setIsSelectCompaniesModalOpen(false);
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
        <div>
          <button onClick={toggleModal}>List Of Companies</button>
          {isOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>List Of Companies</h2>
                <select value={comany} onChange={handleListOfCompanies}>
                  <option value={company1}>Company 1</option>
                  <option value={company2}>Company 2</option>
                  <option value={company3}>Company 3</option>
                </select>
                <div className="modal-actions">
                  <button onClick={toggleModal} className="cancel-btn">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toggleModal();
                      alert(`Company set to: ${company}`);
                    }}
                    className="ok-btn"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SelectCompaniesModalWrapper>
    </BaseModal>
  );
};
