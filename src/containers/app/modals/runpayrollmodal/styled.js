import styled from "styled-components";

export const RunPayrollModalWrapper = styled("div")(() => {
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
            }
        },
        "& .separate": {
            height: "2px",
            width: "100%",
            backgroundColor: "#D3D3D3",
        },
    }
})