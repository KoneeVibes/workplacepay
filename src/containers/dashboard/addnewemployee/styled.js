import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const AddNewEmployeeWrapper = styled("div")(() => {
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
        "& .employeeForm": {
            overflow: "hidden",
            padding: "var(--cardPadding)",
            "& form": {
                display: "flex",
                flexDirection: "column",
                gap: "calc(var(--flexGap) * 1.5)",
                overflow: "hidden",
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
            color: "#000000",
        },
        "& .employeeForm fieldset": {
            flex: 1,
            overflow: "hidden",
            display: "flex",
            gap: "calc(var(--flexGap)/8)",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "& .employeeForm address":{
            padding: "calc(var(--cardPadding)*3)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "-webkit-fill-available",
        },
        "@media screen and (min-width: 768px)": {
            "& .employeeForm": {
                padding: "calc(var(--cardPadding) * 2)",
            },
        },
        "@media screen and (min-width: 1280px)": {
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
            gap: "calc(var(--flexGap)*1.5)",
            flexDirection: "column",
        },
    };
});