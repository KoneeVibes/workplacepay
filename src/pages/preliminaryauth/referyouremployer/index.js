import { useState } from "react";
import { H1, H2, H3, P, Label, Span } from "../../../components/typography/styled";
import { ReferYourEmployerWrapper, ReferYourEmployerRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { referEmployer } from "../../../utils/apis/referral/referEmployer";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export const ReferYourEmployer = () => {
    const navigate = useNavigate();

    const [referForm, setReferForm] = useState({
        refererFullName: "",
        employerFullName: "",
        companyName: "",
        companyEmail: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReferForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await referEmployer(referForm);
            if (response.status === "success") {
                setIsLoading(false);
                navigate("/");
            } else {
                setIsLoading(false);
                setError('Authentication failed. Please check your credentials and try again.');
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Login failed. ${error.message}`);
            console.error('Login failed:', error);
        }
    }

    return (
        <ReferYourEmployerWrapper tocolumn={true}>
            <div className="refer-text">
                <H2>workPlacePAY</H2>
                <H3>The #1 Employee
                    Payroll Solution for
                    Small and medium Businesses
                </H3>
                <P>Seamless Payroll management for your buisness all in one place!</P>
                <PrelimSetup />
            </div>
            <div className="refer-form">
                <H1>Refer your Employer </H1>
                <P>Please  provide the following details to refer your employer to workPlacePAY</P>
                <form onSubmit={handleSubmit}>
                    <ReferYourEmployerRow>
                        <BaseFieldSet>
                            <Label>Name</Label>
                            <BaseInput
                                name="refererFullName"
                                placeholder="Enter Name"
                                value={referForm.refererFullName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Employer Name</Label>
                            <BaseInput
                                name="employerFullName"
                                placeholder="Enter Employer Name"
                                value={referForm.employerFullName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </BaseFieldSet>
                    </ReferYourEmployerRow>
                    <ReferYourEmployerRow>
                        <BaseFieldSet>
                            <Label>Company Name*</Label>
                            <BaseInput
                                name="companyName"
                                placeholder="Company Name"
                                value={referForm.companyName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Company Email</Label>
                            <BaseInput
                                name="companyEmail"
                                placeholder="Company Email"
                                value={referForm.companyEmail}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </BaseFieldSet>
                    </ReferYourEmployerRow>
                    <div>
                        {error && <P style={{ color: 'red', marginBlockStart: 0 }}>{error}</P>}
                        <BaseButton
                            backgroundcolor={"#4E57BB"}
                            width={"fit-content"}>
                            {isLoading ?
                                (<DotLoader
                                    size={20}
                                    color="white"
                                    className='dotLoader'
                                />) : (<Span>Submit</Span>)
                            }
                        </BaseButton>
                    </div>
                </form>
            </div>
        </ReferYourEmployerWrapper>
    )
}