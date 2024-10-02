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
                // flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="amount">Amount:</label>
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
                    borderRadius: "5px",
                    width: "4rem",
                    marginLeft: "2rem",
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
              <div style={{ marginLeft: "2rem" }}>
                <BaseInput
                  type="radio"
                  id="option1"
                  name="option"
                  value="option1"
                  checked
                />
              </div>
              <label
                htmlFor="options"
                style={{ marginLeft: "20px", marginRight: "10px" }}
              >
                Choose an option:
              </label>
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
                    padding: "5px 20px 5px 5px",
                    marginLeft: "10px",
                    appearance: "none",
                    paddingRight: "30px", // Space for the symbol
                  }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    pointerEvents: "none",
                    background: "white",
                    padding: "0 5px",
                  }}
                >
                  %
                </span>
              </div>

              <div style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  id="option1"
                  name="option"
                  value="option1"
                  checked
                />
              </div>
            </form>
          </div>
        </div>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
