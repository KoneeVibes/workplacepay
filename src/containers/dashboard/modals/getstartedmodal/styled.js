import styled from "styled-components";

export const GetStartedModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        ".payment-modal-title": {
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            "& h2": {
                fontFamily: "Inter",
                fontWeight: 800,
                fontSize: "32px",
                marginBlock: 0,
            },
            "button": {
                width: "auto",
                padding: "1rem",
            },
        },
        "& .receipt-title>svg":{
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
        },
        "& .receipt-title>h2":{
            textAlign:"center",
        },
        "p":{
            textAlign:"center",
        },
        ".otp-container":{
            display: 'flex',
            gap: 'calc(var(--cardPadding) * 2)',
            marginTop: 'var(--sectionMargin)',
            marginBottom:'var(--sectionMargin)',
            justifyContent: 'center',
        },
        ".otp-container>input":{
            width: '50px',
            height: '50px',
            fontSize: '24px',
            textAlign: 'center',
        }
    }
})