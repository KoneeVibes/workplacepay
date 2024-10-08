import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const AddNewEmployeeWrapper = styled("div")(() => {
    return {
        // IBK your CSS should go in below this line
        gap: "calc(var(--flex-gap)/2)",
       "& .employeeForm": {
            overflow: "hidden",
            padding: "calc(var(--basic-padding)) 0 calc(var(--basic-padding) * 2) calc(var(--basic-padding) * 2)",
            "& form": {
                display: "flex",
                flexDirection: "column",
                gap: "calc(var(--flex-gap)/2)",
            },
        },
        "& .employeeForm input, & .employeeForm select": {
            padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
            borderRadius: "8px",
        },
        "& .employeeForm label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000"
        },
        "& .employeeForm fieldset": {
            flex: 1,
            overflow: "hidden",
            display: "flex",
            gap: "calc(var(--flexGap)/8)",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "@media screen and (min-width: 1440px)": {
            "& .employeeForm button": {
                marginLeft: "auto",
                marginTop: "calc(var(--sectionMargin))",
                width: "fit-content",
            }
        },

    }
})

export const AddNewEmployeeRow = styled(Row)(() => {
    return {
        justifyContent: "space-between",
        "@media screen and (max-width: 1280px)": {
            gap: "calc(var(--flex-gap)/1)",
            flexDirection: "column",
        },
    };
});