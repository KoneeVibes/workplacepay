import styled from "styled-components";

export const FAQWrapper = styled('div')(() => {
    return {
        padding: "0 var(--pagePadding)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& h2": {
            textAlign: "center",
        },
        "& .faq-item": {
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "60%",
            borderBottom: "1px solid #808080",
            "@media screen and (max-width: 768px)": {
                width: "100%",
            }
        },
        "& .faq-item-row": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center ",
            width: "100%",
            gap: "calc(var(--flex-gap)/4)",
            padding: "calc(var(--cardPadding)/2) 0",
            "& .faq-question": {
                flexDirection: "column",
                flex: 1,
                marginBlock: 0,
            },
        },
    }
});

