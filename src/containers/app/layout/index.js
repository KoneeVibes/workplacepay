import { SideNavigation } from "../../../components/navigation/sidenavigation";
import { TopNavigation } from "../../../components/navigation/topnavigation";
import { P } from "../../../components/typography/styled";
import { LayoutWrapper, MainAreaWrapper } from "./styled";

export const Layout = ({ id, children, title, location, callToAction, handleCallToActionClick }) => {
  return (
    <LayoutWrapper id={id}>
      <SideNavigation />
      <TopNavigation
        title={title}
        location={location}
        callToAction={callToAction}
        handleCallToActionClick={handleCallToActionClick}
      />

      <MainAreaWrapper>{children}
        <P>Powered by: Focus Group</P>
      </MainAreaWrapper>


    </LayoutWrapper>
  );
};
