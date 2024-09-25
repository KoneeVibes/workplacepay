import { SideNavigation } from "../../../components/navigation/sidenavigation";
import { TopNavigation } from "../../../components/navigation/topnavigation";
import { LayoutWrapper, MainAreaWrapper } from "./styled";

export const Layout = ({ children, title, location }) => {
    return (
        <LayoutWrapper>
            <SideNavigation />
            <TopNavigation
                title={title}
                location={location}
            />
            <MainAreaWrapper>
                {children}
            </MainAreaWrapper>
        </LayoutWrapper>
    )
}