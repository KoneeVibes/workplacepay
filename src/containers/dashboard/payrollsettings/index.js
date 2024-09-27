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

          <div style={{ marginTop: "20px" }}>
            <h3>Earnings</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="earnings" style={{ marginRight: "10px" }}>
                Earnings:
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <select
                  id="earnings"
                  style={{ border: "none", outline: "none", padding: "5px" }}
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  {/* Add more options as needed */}
                </select>
                <span
                  style={{
                    padding: "0 10px",
                    borderLeft: "1px solid #ccc",
                    whiteSpace: "nowrap",
                  }}
                >
                  %
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                id="radio1"
                name="earningsOption"
                value="option1"
              />
              <label htmlFor="radio1" style={{ marginLeft: "10px" }}>
                Option 1
              </label>
              <input
                type="radio"
                id="radio2"
                name="earningsOption"
                value="option2"
                style={{ marginLeft: "20px" }}
              />
              <label htmlFor="radio2">Option 2</label>
            </div>
          </div>
        </div>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
