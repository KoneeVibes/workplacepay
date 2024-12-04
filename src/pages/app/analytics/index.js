import { useState } from "react";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { AnalyticsWrapper } from "./styled";

export const Analytics = () => {
    const [filter, setFilter] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter(value);
    }

    return (
        <Layout
            id={"analytics"}
            title={"Analytics"}
        >
            <AnalyticsWrapper>
                <Row
                    className="filter"
                >
                    <BaseFieldSet>
                        <Label>Month</Label>
                        <BaseSelect
                            name="month"
                            onChange={(e) => handleChange(e)}
                            value={filter}
                        >
                            <option value="">Select a month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                        </BaseSelect>
                    </BaseFieldSet>
                </Row>
            </AnalyticsWrapper>
        </Layout>
    )
}