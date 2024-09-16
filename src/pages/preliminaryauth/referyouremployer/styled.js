import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const ReferYourEmployerWrapper = styled(Row)(() => {
    return {
        // IBK, your CSS should go under here
        // padding: "0 var(--pagePadding)",
        // margin: "calc(var(--sectionMargin) * 2) 0",
        gap: 0,
        ".refer-text": {
            flex: 0.4,
            backgroundColor: "#4E57BB",
            textAlign:"center",
            color:"#ffffff",
        },
        ".refer-form": {
            flex: 0.6,
            justifyContent:"center",
            marginTop: "calc(var(--sectionMargin) * 3)",
        },
        ".refere-img": {
           width: "100%",
           height: "auto",
           marginTop: "calc(var(--sectionMargin) * 3)",
        },
        ".refer-text>h2, .refer-text>h3, .refer-text>p ": {
            // marginTop: "var(--sectionMargin)",
        },
        "@media screen and (min-width: 1024px)": {
          margin: "calc(var(--sectionMargin) * 3) 0",
        }
    }
})

export const ReferYourEmployerRow = styled(Row)(() => {
    return {
        marginBottom:"calc(var(--sectionMargin) * 2)",
        "BaseInput":{
            gap: "calc(var(--flexGap)/2)",
        }
    }
})