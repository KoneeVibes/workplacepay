import { SideNavigation } from "../../../components/navigation/sidenavigation";
import { TopNavigation } from "../../../components/navigation/topnavigation";
import { LayoutWrapper, MainAreaWrapper } from "./styled";

export const Layout = ({ id, children, title, location }) => {
  return (
    <LayoutWrapper id={id}>
      <SideNavigation />
      <TopNavigation title={title} location={location} />
      <MainAreaWrapper>{children}</MainAreaWrapper>
    </LayoutWrapper>
  );
};
