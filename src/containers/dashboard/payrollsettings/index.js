import { Layout } from "../layout";
import { PayrollSettingsWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";

export const PayrollSettings = () => {
  return (
    <Layout title={"Payroll Settings"}>
      <PayrollSettingsWrapper>
        <h1>Payroll Variables</h1>
        <h2>Select the applicable variables for the user</h2>

        <h2 style={{ color: "#4E57BB", fontSize: "2rem", fontWeight: "600" }}>
          Earning
        </h2>
        <form>
          <div className="flexRows">
            <label className="label" htmlFor="Basic">
              Basic
            </label>
            <div className="inputDivs">
              <BaseInput
                type="number"
                className="basic"
                defaultValue=""
                style={{
                  border: "1px solid black",
                  padding: "0",
                  borderRadius: "7px",
                  width: "4rem",
                  height: "1.5rem",
                  marginLeft: "2.3rem",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "22%",
                  pointerEvents: "none",
                  background: "white",
                  padding: ".1rem",
                  border: "1px solid black",
                  borderRight: "none",
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
                style={{
                  marginLeft: "1.4rem",
                }}
                checked
              />
            </div>
          </div>

          <div className="flexRows">
            <label className="label" htmlFor="housing">
              Housing
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
                  padding: "5px 5px 5px 0px",
                  borderRight: "none",
                  paddingRight: "10px",
                  borderTopLeftRadius: "7px",
                  borderBottomLeftRadius: "7px",
                  marginLeft: ".5rem",
                }}
              >
                <option value="" hidden></option>
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
            <label className="label" htmlFor="Transport">
              Transport
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
                  padding: "5px 5px 5px 0px",
                  borderRight: "none",
                  // appearance: "none",
                  paddingRight: "10px", // Space for the symbol
                  borderTopLeftRadius: "7px",
                  borderBottomLeftRadius: "7px",
                }}
              >
                <option value="" hidden></option>
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
            <label className="label" htmlFor="housing">
              Housing
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
                  padding: "5px 5px 5px 0px",
                  borderRight: "none",
                  paddingRight: "10px",
                  borderTopLeftRadius: "7px",
                  borderBottomLeftRadius: "7px",
                  marginLeft: ".5rem",
                }}
              >
                <option value="" hidden></option>
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
            <label className="label" htmlFor="Overtime">
              Overtime
            </label>

            <div>
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                style={{
                  marginLeft: "10.7rem",
                }}
                checked
              />
            </div>
          </div>

          <div className="flexRows">
            <label className="label" htmlFor="Bonus">
              Bonus
            </label>

            <div>
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                style={{
                  marginLeft: "12.3rem",
                }}
                checked
              />
            </div>
          </div>

          <div className="flexRows">
            <label className="label" htmlFor="Other">
              Other
            </label>

            <div>
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                style={{
                  marginLeft: "12.5rem",
                }}
                checked
              />
            </div>
          </div>
        </form>
        <br></br>
        <br></br>
        <h2 style={{ color: "#4E57BB", fontSize: "2rem", fontWeight: "600" }}>
          Deductions
        </h2>
        <form>
          <div className="flexRows">
            <label className="label">Employer Pension Contribution</label>
            <div className="inputDivs">
              <BaseInput
                type="number"
                className="basic"
                defaultValue="10"
                style={{
                  border: "1px solid black",
                  padding: "0",
                  borderRadius: "7px",
                  width: "4rem",
                  height: "1.5rem",
                  marginLeft: "2.3rem",
                  color: "black",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "42%",
                  pointerEvents: "none",
                  background: "white",
                  padding: ".1rem",
                  border: "1px solid black",
                  borderRight: "none",
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
                style={{
                  marginLeft: "1.4rem",
                }}
                checked
              />
            </div>
          </div>

          <div className="flexRows">
            <label className="label">Employee Pension Contribution</label>
            <div className="inputDivs">
              <BaseInput
                type="number"
                className="basic"
                defaultValue="8"
                style={{
                  border: "1px solid black",
                  padding: "0",
                  borderRadius: "7px",
                  width: "4rem",
                  height: "1.5rem",
                  marginLeft: "2.3rem",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "42%",
                  pointerEvents: "none",
                  background: "white",
                  padding: ".1rem",
                  border: "1px solid black",
                  borderRight: "none",
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
                style={{
                  marginLeft: "1.2rem",
                }}
                checked
              />
            </div>
          </div>

          <div className="flexRows">
            <label className="label" htmlFor="Transport">
              PAYE
            </label>

            <div>
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                style={{
                  marginLeft: "26rem",
                }}
                checked
              />
            </div>
          </div>
          <div className="flexRows">
            <label className="label" htmlFor="Transport">
              Others
            </label>

            <div>
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                style={{
                  marginLeft: "25.2rem",
                }}
                checked
              />
            </div>
          </div>
          <BaseButton
            type="submit"
            backgroundcolor={"#4E57BB"}
            width={"fit-content"}
            style={{
              marginLeft: "75%",
            }}
          >
            Save
          </BaseButton>
        </form>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
