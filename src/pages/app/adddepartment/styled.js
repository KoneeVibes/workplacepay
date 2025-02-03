import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const AddDepartmentWrapper = styled("div")(() => {
  return {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    "& h2": {
      marginBlock: 0,
      fontSize: "24px",
    },
    "& p": {
      fontSize: "18px",
    },
    "& .departmentForm": {
      overflow: "hidden",
      padding: "var(--cardPadding)",
      "& form": {
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--flexGap) * 1.5)",
        overflow: "hidden",
      },
    },
    "& .departmentForm input, & .departmentForm select": {
      padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
    },
    "& .departmentForm label": {
      fontFamily: "Poppins",
      fontWeight: 500,
      color: "#000000",
    },
    "& .departmentForm fieldset": {
      flex: 1,
      overflow: "hidden",
      display: "flex",
      gap: "calc(var(--flexGap)/8)",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& .departmentForm address": {
      padding: "calc(var(--cardPadding)*3)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "-webkit-fill-available",
    },
    "& .add-new-department-modal": {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFFFFF",
      padding: "var(--cardPadding)",
      borderRadius: "1rem",
      boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    "@media screen and (min-width: 768px)": {
      "& .departmentForm": {
        padding: "calc(var(--cardPadding) * 2)",
      },
    },
    "@media screen and (min-width: 1280px)": {
      "& .departmentForm button": {
        marginTop: "calc(var(--sectionMargin))",
      },
    },
  };
});

export const AddDepartmentRow = styled(Row)(() => {
  return {
    justifyContent: "space-between",
    "@media screen and (max-width: 1280px)": {
      gap: "calc(var(--flexGap)*1.5)",
      flexDirection: "column",
    },
  };
});
