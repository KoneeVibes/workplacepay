import styled from "styled-components";
import { Row } from "../../../../components/flex/styled";

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
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
            borderRadius: "8px",
            fontWeight: "400",
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
        "& .employeeForm textarea": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "-webkit-fill-available",
            fontWeight: "400",
        },
        "& .add-new-employee-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            padding: "var(--cardPadding)",
            borderRadius: "1rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        "& .switch-column": {
            gap: "calc(var(--flexGap)/3)",
            "& .switch": {
                position: "relative",
                display: "inline-block",
                width: "60px",
                height: "34px",
            },
            "& .pension-check": {
                opacity: 0,
                width: 0,
                height: 0,
            },
            "& .slider": {
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#CCCCCC",
                transition: ".4s",
            },
            "& .slider::before": {
                position: "absolute",
                content: '""',
                height: "26px",
                width: "26px",
                left: "4px",
                bottom: "4px",
                backgroundColor: "white",
                transition: ".4s",
            },
            "& .pension-check:checked + .slider": {
                backgroundColor: "#4E57BB"
            },
            "& .pension-check:focus + .slider": {
                boxShadow: "0 0 1px #4E57BB"
            },
            "& .pension-check:checked + .slider:before": {
                transform: "translateX(26px)",
            },
            "& .slider.round": {
                borderRadius: "34px"
            },
            "& .slider.round::before": {
                borderRadius: "50%",
            },
        },
        "@media screen and (min-width: 425px)": {
            "& .switch-column": {
                gap: "calc(var(--flexGap))",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }
        },
        "@media screen and (min-width: 768px)": {
            "& .submit-column": {
                flexDirection: "row",
                justifyContent: "space-between"
            },
            "& .employeeForm": {
                padding: "calc(var(--cardPadding) * 2)",
            },
        },
        "@media screen and (min-width: 1280px)": {
            "& .employeeForm button": {
                marginTop: "calc(var(--sectionMargin))",
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