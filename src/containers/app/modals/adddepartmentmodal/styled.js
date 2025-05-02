import styled from "styled-components";

export const AddDepartmentModalWrapper = styled("div")(() => {
    return {
        "& .option": {
            cursor: "pointer",
            padding: "calc(var(--cardPadding) / 4) calc(var(--cardPadding) / 2)",
            "& p": {
                marginBlock: 0
            },
            "&:hover": {
                backgroundColor: "#8A90DC",
                "& p": {
                    color: "#FFFFFF",
                }
            },
            "&:first-child": {
                borderBottom: "1px solid #000000",
            },
        },
        "& .bulk-upload": {
            gap: 0,
            "& .bulk-upload-header": {
                cursor: "pointer",
                padding: "calc(var(--cardPadding) / 4) calc(var(--cardPadding) / 2)",
                "& p": {
                    marginBlock: 0
                },
            },
            "& .bulk-upload-options": {
                display: "none",
                gap: 0,
            },
            "&:hover > .bulk-upload-header": {
                borderRight: "1px solid #000000",
            },
            "&:hover > .bulk-upload-options": {
                display: "block",
            }
        },
    }
})