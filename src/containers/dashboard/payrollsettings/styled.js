import styled from "styled-components";

export const PayrollSettingsWrapper = styled("div")(() => {
  return {
    // Newton your CSS should go in below this line
    ".flexRows": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "5rem",
    },
  };
});
