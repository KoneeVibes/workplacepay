import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const PayrollSettingsWrapper = styled("div")(() => {
  return {
    padding: "calc(var(--cardPadding) * 1)",
    backgroundColor: "#FFFFFF",
    borderRadius: "1rem",
    "& form": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1rem",
      overflow: "hidden",
    },
    "& h2": {
      marginBlock: 0,
      fontSize: "24px",
    },
    "& h3": {
      fontSize: "20px",
      fontWeight: 700,
      color: "#4E57BB"
    },
    "& p": {
      fontSize: "18px",
    },
    "& label": {
      color: "#000000",
      flex: 0.4,
    },
    "& input": {
      width: "auto",
    },
    "& select": {
      width: "auto",
    },
    "& .field-row": {
      width: "100%",
      overflow: "hidden",
      alignItems: "flex-start",
      flexDirection: "column",
    },
    "@media screen and (min-width: 768px)": {
      padding: "calc(var(--cardPadding) * 2)",
      "& .field-row": {
        alignItems: "center",
        flexDirection: "row",
      },
    }
  };
});

export const InputRow = styled(Row)(() => {
  return {
    gap: 0,
    alignItems: "center",
    border: "1px solid #000000",
    borderRadius: "1rem",
    "& input, & select": {
      width: "4rem",
      boxSizing: "border-box",
      outline: "none",
      border: "none",
      borderRight: "1px solid #000000",
      borderRadius: "1rem 0 0 1rem",
      padding: "calc(var(--cardPadding)/2)",
    },
    "& span": {
      padding: "calc(var(--cardPadding)/4)",
    }
  }
})
