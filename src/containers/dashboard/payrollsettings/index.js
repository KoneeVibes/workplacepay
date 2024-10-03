import { Layout } from "../layout";
import { PayrollSettingsWrapper } from "./styled";
// import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";

export const PayrollSettings = () => {
  return (
    <Layout title={"Payroll Settings"}>
      <PayrollSettingsWrapper>
        <div style={{ padding: "20px" }}>
          <h1>Payroll Variables</h1>
          <h2>Select the applicable variables for the user</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h2 style={{ color: "blue" }}>Earning</h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div className="flexRows">
                <label htmlFor="amount">Basic</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BaseInput
                    type="number"
                    id="amount"
                    defaultValue=""
                    style={{
                      border: "1px solid black",
                      padding: "0",
                      borderRadius: "7px",
                      width: "4rem",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "3%",
                      pointerEvents: "none",
                      background: "white",
                      padding: "0 5px",
                      borderLeft: "1px solid black",
                    }}
                  >
                    %
                  </span>
                </div>
                <div>
                  <BaseInput
                    type="radio"
                    id="option1"
                    name="option"
                    value="option1"
                    checked
                  />
                </div>
              </div>

              <div className="flexRows">
                <label htmlFor="options">housing</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    id="options"
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px 5px 0px",
                      borderRight: "none",
                      // appearance: "none",
                      paddingRight: "10px", // Space for the symbol
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                    }}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      left: "100%",
                      pointerEvents: "none",
                      background: "white",
                      padding: "3px 0",
                      paddingLeft: ".2rem",
                      paddingRight: "1.2rem",
                      border: "1px solid black",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                    }}
                  >
                    %
                  </span>
                </div>

                <div>
                  <input
                    type="radio"
                    id="option1"
                    name="option"
                    value="option1"
                    checked
                  />
                </div>
              </div>

              <div className="flexRows">
                <label htmlFor="options">Transport</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    id="options"
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px 5px 0px",
                      borderRight: "none",
                      // appearance: "none",
                      paddingRight: "10px", // Space for the symbol
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                    }}
                  >
                    <option value="option1"></option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      left: "100%",
                      pointerEvents: "none",
                      background: "white",
                      padding: "3px 0",
                      paddingLeft: ".2rem",
                      paddingRight: "1.2rem",
                      border: "1px solid black",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                    }}
                  >
                    %
                  </span>
                </div>

                <div>
                  <input
                    type="radio"
                    id="option1"
                    name="option"
                    value="option1"
                    checked
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
