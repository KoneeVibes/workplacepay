import { Layout } from "../layout";
import { PayrollSettingsWrapper } from "./styled";

export const PayrollSettings = () => {
  return (
    <Layout title={"Payroll Settings"}>
      <PayrollSettingsWrapper>
        {/* Newton your HTML should go in below this line */}
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
            <form style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="amount">Amount:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{ borderRight: "1px solid black", padding: "0 5px" }}
                >
                  %
                </span>
                <input
                  type="number"
                  id="amount"
                  defaultValue="20"
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    width: "50px",
                  }}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  id="option1"
                  name="option"
                  value="option1"
                />
                <label htmlFor="option1">Option 1</label>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  id="option2"
                  name="option"
                  value="option2"
                />
                <label htmlFor="option2">Option 2</label>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  id="option3"
                  name="option"
                  value="option3"
                />
                <label htmlFor="option3">Option 3</label>
              </div>
            </form>
          </div>
        </div>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
