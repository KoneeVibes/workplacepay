import styled from "styled-components";

export const SelectCompaniesModalWrapper = styled("form")(() => {
  return {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--flexGap)/2)",
    "& legend": {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: "24px",
      textAlign: "center",
      paddingInline: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& select": {
      padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
      fontWeight: "400",
    },
    "& .action-buttons-row": {
      gap: "calc(var(--flexGap)/3)",
      "& div": {
        flex: 1,
        overflow: "hidden"
      },
      "& span": {
        display: "inline-block",
        width: "100%",
      },
      "@media screen and (max-width: 550px)": {
        flexDirection: "column",
      }
    }
  };
});
