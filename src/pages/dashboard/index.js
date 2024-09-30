import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SalaryAmount, SalaryDate } from "../../assets";
import { Card } from "../../components/card";
import { Row } from "../../components/flex/styled";
import { H3, Label, P } from "../../components/typography/styled";
import { Layout } from "../../containers/dashboard/layout";
import { DashboardWrapper } from "./styled";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "../../components/chart";
import { BaseInput } from "../../components/form/input/styled";
import { BaseSelect } from "../../components/form/select/styled";
import { BaseFieldSet } from "../../components/form/fieldset/styled";
import { Table } from "../../components/table";

export const Dashboard = () => {
    return (
        <Layout
            title={"Dashboard"}
            location={"dashboard"}
        >
            <DashboardWrapper>
                <Row
                    className="cards-group"
                >
                    <Card
                        className={"upcoming-salary-date-card"}
                    >
                        <Row
                            className="card-title"
                        >
                            <SalaryDate />
                            <H3>Upcoming Salary Date</H3>
                        </Row>
                        <div
                            className="card-body"
                        >
                            <P>Fill employee Details</P>
                            <FontAwesomeIcon icon={faChartSimple} style={{ float: "right" }} />
                        </div>
                    </Card>
                    <Card
                        className={"upcoming-salary-amount-card"}
                    >
                        <Row
                            className="card-title"
                        >
                            <SalaryAmount />
                            <H3>Upcoming Salary Amount</H3>
                        </Row>
                        <div
                            className="card-body"
                        >
                            <P>N0.00</P>
                            <P>0 employees</P>
                        </div>
                    </Card>
                </Row>
                <Chart
                    title={"Payment History"}
                    labels={[]}
                    datasets={[]}
                />
                <Card
                    className={"employee-table-card"}
                >
                    <Row
                        className="card-title"
                    >
                        <H3>Employee List</H3>
                        <H3>See all</H3>
                    </Row>
                    <Row
                        className="card-table-filter"
                    >
                        <BaseInput
                            placeholder="Search"
                        />
                        <BaseFieldSet>
                            <Label>Department</Label>
                            <BaseSelect>
                                {/* options will go in below here */}
                            </BaseSelect>
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Job Title</Label>
                            <BaseSelect>
                                {/* options will go in below here */}
                            </BaseSelect>
                        </BaseFieldSet>
                    </Row>
                    <div
                        className="card-table"
                    >
                        <Table
                            columnTitles={[
                                "Employee", "Department", "Salary", "Hire Date", "Role", "Status"
                            ]}
                            rowItems={[]}
                        />
                    </div>
                </Card>
            </DashboardWrapper>
        </Layout>
    )
}