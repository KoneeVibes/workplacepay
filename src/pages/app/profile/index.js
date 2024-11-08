import { Layout } from "../../../containers/app/layout";
import { ProfileWrapper } from "./styled";
import { H2, P } from "../../../components/typography/styled";
import { Row } from "../../../components/flex/styled";

export const Profile = () => {
    return (
        <Layout
            id={"profile"}
            title={"Your Profile"}
        >
            <ProfileWrapper>
                <div className="details">
                    <H2>Personal Details</H2>
                    <Row>
                        <P>First Name</P>
                        <P>Olumide</P>
                    </Row>
                    <Row>
                        <P>Last Name</P>
                        <P>Ibukun</P>
                    </Row>
                    <Row>
                        <P>Gender</P>
                        <P>Male</P>
                    </Row>
                    <Row>
                        <P>Date of Birth</P>
                        <P>23/04/1998</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Employment Details</H2>
                    <Row>
                        <P>Department</P>
                        <P>Technical</P>
                    </Row>
                    <Row>
                        <P>Job Position</P>
                        <P>Team Lead</P>
                    </Row>
                    <Row>
                        <P>Hire Date</P>
                        <P>12/09/2019</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Bank Details</H2>
                    <Row>
                        <P>Bank Name</P>
                        <P>First Bank</P>
                    </Row>
                    <Row>
                        <P>Account Number</P>
                        <P>3038001531</P>
                    </Row>
                    <Row>
                        <P>Account Name</P>
                        <P>Olamide Ibukun</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Contact Details</H2>
                    <Row>
                        <P>Email</P>
                        <P>olumideibuks@gmail.com</P>
                    </Row>
                    <Row>
                        <P>Phone Number</P>
                        <P>09123219076</P>
                    </Row>
                    <Row>
                        <P>Current Address</P>
                        <P>No.7 Naruto str. Ajah</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Salary Details</H2>
                    <Row>
                        <P>Gross Salary</P>
                        <P>N 451,430</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Pension Details</H2>
                    <Row>
                        <P>Email</P>
                        <P>olumideibuks@gmail.com</P>
                    </Row>
                    <Row>
                        <P>Phone Number</P>
                        <P>09123219076</P>
                    </Row>
                    <Row>
                        <P>Current Address</P>
                        <P>No.7 Naruto str. Ajah</P>
                    </Row>
                    <Row>
                        <P>Pension Id</P>
                        <P>135TL</P>
                    </Row>
                </div>
            </ProfileWrapper>
        </Layout>
    );
};