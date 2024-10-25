import { useState } from "react";
import { BaseButton } from "../../../components/button/styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Layout } from "../../../containers/dashboard/layout";
import { PayrollWrapper } from "./styled";

export const Payroll = () => {
    const [formDetails, setFormDetails] = useState({
        paymentYear: "",

    })

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {

    }

    return (
        <Layout
            title={"Payroll"}
        >
            <PayrollWrapper>
                <Row>
                    <BaseFieldSet>
                        <Label>Payment Year</Label>
                        <BaseSelect
                            name="paymentYear"
                            value={formDetails.paymentYear}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Payment Year</Label>
                        <BaseSelect
                            name="paymentYear"
                            value={formDetails.paymentYear}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <div>
                        <BaseButton>
                            Run Payroll
                        </BaseButton>
                    </div>
                </Row>
            </PayrollWrapper>
        </Layout>
    )
}