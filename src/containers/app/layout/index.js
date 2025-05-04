import { useContext } from "react";
import { SideNavigation } from "../../../components/navigation/sidenavigation";
import { TopNavigation } from "../../../components/navigation/topnavigation";
import { P } from "../../../components/typography/styled";
import { LayoutWrapper, MainAreaWrapper } from "./styled";
import { Context } from "../../../context";

export const Layout = ({ id, children, title, location, callToAction, handleCallToActionClick }) => {
  const { setIsSideNavigationOpen } = useContext(Context);
  return (
    <LayoutWrapper id={id}>
      <SideNavigation
        location={location}
        callToAction={callToAction}
        handleCallToActionClick={
          (e) => {
            setIsSideNavigationOpen(false);
            return handleCallToActionClick(e);
          }
        }
      />
      <TopNavigation
        title={title}
        location={location}
        callToAction={callToAction}
        handleCallToActionClick={handleCallToActionClick}
      />
      <MainAreaWrapper>{children}
        <P className="footnote">Powered by: Focus Group</P>
      </MainAreaWrapper>
    </LayoutWrapper>
  );
};
