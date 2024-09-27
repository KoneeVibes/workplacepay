import styled from "styled-components";

export const PayrollSettingsWrapper = styled("div")(() => {
  return {
    // Newton your CSS should go in below this line
    ".SelectContainer": {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    "& .select": {
      padding: "5px 30px 5px 5px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      appearance: "none",
      background: "white",
      backgroundSize: "10px",
    },
  };
});
