import styled from "styled-components";

export const ProfileWrapper = styled("div")(() => {
    return {
        backgroundColor: "#FFFFFF",
        padding:"inherit",
        overflow:"hidden",
        "P":{
            color:"#808080",
        },
        "& .details":{
            paddingBottom:"var(--cardPadding)",
        },
    };
});