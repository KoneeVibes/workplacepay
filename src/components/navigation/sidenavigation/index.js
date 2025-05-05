import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import { navAvatarAreaLinks, navLinks } from "../../../config/navlinks/dashboard";
import { BaseButton } from "../../button/styled";
import { P, Span } from "../../typography/styled";
import { SideNavigationWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../../assets";
import { Column, Row } from "../../flex/styled";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCompanies } from "../../../utils/apis/company/getCompanies";
import { getUser } from "../../../utils/apis/user/getUser";

export const SideNavigation = ({ location, callToAction, handleCallToActionClick }) => {
    const cookie = new Cookies();
    const { ROLE, TOKEN, COMPANY_ID } = cookie.getAll() ?? {};

    const navigate = useNavigate();
    const { setIsSideNavigationOpen, setIsResetPasswordModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [isUserProfileDropdownOpen, setIsUserProfileDropdownOpen] = useState(false);
    const [userCompanies, setUserCompanies] = useState([]);
    const [activeCompanyId, setActiveCompanyId] = useState(COMPANY_ID);
    const [isUserCompaniesDropdownOpen, setIsUserCompaniesDropdownOpen] = useState(false);
    const [isSubItemsOpen, setIsSubItemsOpen] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState({});

    const handleLogoClick = (e) => {
        e.preventDefault();
        return navigate("/dashboard");
    }

    const handleSideNavItemClick = (e, destination) => {
        e.preventDefault();
        e.stopPropagation();
        if (destination === "/reportsummary") {
            return setIsSubItemsOpen(!isSubItemsOpen);
        };
        if (destination === "/resetpassword") {
            matches && setIsSideNavigationOpen(false);
            return setIsResetPasswordModalOpen(true);
        }
        matches && setIsSideNavigationOpen(false);
        return navigate(destination);
    };

    const handleNavAvatarAreaLinkClick = async (e, destination) => {
        e.preventDefault();
        e.stopPropagation();
        if (destination === "/switchcompany") {
            return setIsUserCompaniesDropdownOpen(!isUserCompaniesDropdownOpen);
        }
        if (destination === "/") {
            await cookie.remove("ROLE", { path: '/' });
            await cookie.remove("COMPANY_ID", { path: '/' });
            await cookie.remove("TOKEN", { path: '/' });
        }
        return navigate(`${destination}`);
    }

    const handleUserProfileIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsUserCompaniesDropdownOpen(false);
        return setIsUserProfileDropdownOpen(!isUserProfileDropdownOpen);
    };

    const handleActiveCompanyUpdate = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        cookie.set("COMPANY_ID", id, {
            path: "/",
            maxAge: 1000000,
        });
        return setActiveCompanyId(id);
    }

    useEffect(() => {
        getUser(TOKEN)
            .then((data) => {
                setLoggedInUser(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN])

    useEffect(() => {
        if (ROLE !== "employer") return;
        getCompanies(TOKEN)
            .then((data) => {
                setUserCompanies(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN, ROLE]);

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <SideNavigationWrapper
            USERROLE={ROLE}
            location={location}
        >
            <div
                className="side-navigation-upper-section"
            >
                <div
                    className="nav-logo"
                >
                    <P onClick={handleLogoClick}>workPlacePAY</P>
                    <BaseButton
                        onClick={() => setIsSideNavigationOpen(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                    </BaseButton>
                </div>
                {ROLE === "employer" && (
                    <div
                        className="switch-companies-box"
                    >
                        <div>
                            <Link
                                onClick={(e) => handleNavAvatarAreaLinkClick(e, "/switchcompany")}
                            >
                                <Row
                                    alignitems={"center"}
                                    justifycontent={"space-between"}
                                >
                                    <P>Switch Company</P>
                                    <FontAwesomeIcon icon={isSubItemsOpen ? faCaretDown : faCaretRight} />
                                </Row>
                            </Link>
                        </div>
                        {(isUserCompaniesDropdownOpen) && (
                            <ul
                                className="sub-items user-companies-dropdown"
                            >
                                {userCompanies?.map((company, index) => {
                                    return (
                                        <li key={index}>
                                            <P
                                                onClick={(e) => handleActiveCompanyUpdate(e, company.companyId)}
                                                className={(activeCompanyId === company.companyId) ? "active-company" : "inactive-company"}
                                            >
                                                {company.name}
                                            </P>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                )}
            </div>
            <Column
                className="nav-links"
            >
                {navLinks[ROLE]?.map((navLink, index) => {
                    return (
                        <Fragment
                            key={index}
                        >
                            <Link
                                className={(navLink.name === "Payroll Setup") ? "setup" : null}
                                onClick={(e) => handleSideNavItemClick(e, navLink.url)}
                            >
                                {(navLink.name === "Report Summary") ?
                                    <Row
                                        alignitems={"center"}
                                        justifycontent={"space-between"}
                                    >
                                        <P>{navLink.name}</P>
                                        <FontAwesomeIcon icon={isSubItemsOpen ? faCaretDown : faCaretRight} />
                                    </Row> :
                                    <P>{navLink.name}</P>
                                }
                            </Link>
                            {(navLink.name === "Report Summary" && isSubItemsOpen) && (
                                <ul
                                    className="sub-items"
                                >
                                    {navLink?.subItems?.map((subItem, index) => {
                                        return (
                                            <li
                                                key={index}
                                            >
                                                <Link
                                                    to={subItem.url}
                                                >
                                                    <P>{subItem.name}</P>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </Fragment>
                    )
                })}
            </Column>
            {handleCallToActionClick && (
                <Row className="call-to-action-buttons">
                    <BaseButton
                        className="add-employee-button"
                        onClick={handleCallToActionClick}
                    >
                        <FontAwesomeIcon icon={faPlus} color="#448DEF" />
                        <Span>
                            {callToAction ?? "Add Employee"}
                        </Span>
                    </BaseButton>
                </Row>
            )}
            <Column
                className="nav-avatar-area"
            >
                <Row
                    alignitems={"center"}
                    gap={"calc(var(--flexGap)/4)"}
                    justifycontent={"space-between"}
                    onClick={handleUserProfileIconClick}
                    style={{ cursor: "pointer" }}
                >
                    <Avatar />
                    {ROLE !== "admin" ? (
                        < Span> {loggedInUser?.fullName?.split(" ")[1].replace(/\b\w/g, char => char.toUpperCase())}</Span>
                    ) : (
                        < Span>Admin</Span>
                    )}
                    <FontAwesomeIcon icon={isSubItemsOpen ? faCaretDown : faCaretRight} />
                </Row>
                {(isUserProfileDropdownOpen) && (
                    <ul
                        className="sub-items"
                    >
                        {navAvatarAreaLinks?.[ROLE]?.map((subItem, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <Link
                                        onClick={(e) => handleNavAvatarAreaLinkClick(e, subItem.url)}
                                    >
                                        <P>{subItem.name}</P>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </Column>
        </SideNavigationWrapper >
    )
}
