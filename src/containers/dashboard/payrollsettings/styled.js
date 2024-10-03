import styled from "styled-components";

export const PayrollSettingsWrapper = styled("row")(() => {
  return {
    // Newton your CSS should go in below this line
    ".flexRows": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "5rem",
    },
    "& form": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1rem",
    },
    "&.inputDivs": {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    "&.basic": {
      border: "1px solid black",
      padding: "0",
      borderRadius: "7px",
      width: "4rem",
    },
    "&.perSpan": {
      position: "absolute",
      left: "17.5%",
      pointerEvents: "none",
      background: "white",
      padding: ".1rem",
      border: "1px solid black",
      borderRight: "none",
    },
    "& .label": {
      fontWeight: "600",
      fontSize: "1.1rem",
      lineHeight: "2rem",
      color: "#000000",
    },
    "& #option1": {
      transform: "scale(2)",
    },
  };
});
