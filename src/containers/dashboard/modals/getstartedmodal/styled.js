import styled from "styled-components";
import { Column } from "../../../../components/flex/styled";

export const GetStartedModalWrapper = styled(Column)(() => {
    return {
        gap: 0,
        overflow: "hidden",
        "& .receipt-title>svg": {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
        },
        "& .receipt-title>h2": {
            marginBlockStart: 0,
            textAlign: "center",
        },
        "& p": {
            textAlign: "center",
        },
        "& .otp-container": {
            gap: "calc(var(--flexGap)/2)",
            marginBlock: 'var(--sectionMargin)',
            overflow: "auto",
            width: "100%",
        },
        "& .otp-container>input": {
            width: '25%',
            height: '30px',
            fontSize: '24px',
            textAlign: 'center',
        },
        "& .submit-button-box": {
            "& button": {
                width: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
            },
        }
    }
})