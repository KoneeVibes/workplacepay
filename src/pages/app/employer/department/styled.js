import styled from "styled-components";

export const DepartmentWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading": {
            padding: "var(--cardPadding)",
            paddingBottom: "0",
            marginBlockEnd: "var(--sectionMargin)",
            "& h3": {
                marginBlock: 0,
            },
        },
        "& .departments-table": {
            overflow: "auto",
            "& tr:not(:last-of-type)": {
                borderBottom: "1px solid #000000"
            },
            "& .drop-down": {
                position: "absolute",
                boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
                paddingInlineStart: 0,
                listStyleType: "none",
                backgroundColor: "#FFFFFF",
                borderRadius: "0.25rem",
                zIndex: 1,
                overflow: "hidden",
                "& li": {
                    padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)/4)",
                    "&:hover": {
                        backgroundColor: "#4E57BB"
                    }
                }
            }
        },
        "& th": {
            color: "#FFFFFF",
            background: "#4E57BB",
            minWidth: "50px",
        },
        "& th:not(:last-of-type)": {
            width: "90%",
            minWidth: "200px",
        },
        "& td": {
            border: "none"
        },
        "& td:last-of-type": {
            borderLeft: "1px solid #000000"
        },
        "& .add-department-modal": {
            position: "fixed",
            top: "var(--topNavHeight)",
            right: "var(--cardPadding)",
            maxWidth: "250px",
            zIndex: 10,
            backgroundColor: "#FFFFFF",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        "& .department-bulk-upload-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
            "@media screen and (max-width: 768px)": {
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                transform: "unset",
                borderRadius: "unset"
            }
        },
    }
})