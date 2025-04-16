import styled from "styled-components";

export const PricingWrapper = styled("div")(() => {
    return {
        "& BaseButton": {
            flex: 1,
            overflow: "hidden",
        },
        "& .pricing-table": {
            overflow: "auto",
            "& tr:not(:last-of-type)": {
                borderBottom: "1px solid #000000"
            },
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
            border: "none",
            borderLeft: "1px solid #000000",
        },
        "& td:first-of-type": {
            borderLeft: "none",
        }
    }
})