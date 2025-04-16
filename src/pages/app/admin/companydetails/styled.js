import styled from "styled-components";
import { Column } from "../../../../components/flex/styled";

export const CompanyDetailsWrapper = styled(Column)(() => {
  return {
    "& .heading-row": {
      padding: "calc(var(--cardPadding)/2)",
      "& span:nth-child(2)": {
        color: "#808080",
      },
    },
    "& span": {
      flex: 1,
    },
  };
});
