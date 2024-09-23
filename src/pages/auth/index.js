import { useState } from "react";
import { Login } from "../../assets";
import { Row } from "../../components/flex/styled";
import { BaseInput } from "../../components/form/input/styled";
import { H1, Label, Span } from "../../components/typography/styled";
import { AuthWrapper } from "./styled";
import { BaseButton } from "../../components/button/styled";
import { BaseFieldSet } from "../../components/form/fieldset/styled";

export const Auth = () => {
    const [formDetails, setFormDetails] = useState({
        id: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails);
        // form submission logic goes under here
    };

    return (
        <AuthWrapper>
            <H1>workPlacePAY</H1>
            <Row
                tocolumn={true}
                className="main-area"
            >
                <div className="auth-img">
                    <Login />
                </div>
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <legend>
                        Enter your email and password to continue
                    </legend>
                    <BaseFieldSet>
                        <Label>Email/Phone*</Label>
                        <BaseInput
                            name="id"
                            placeholder="Enter Email/Phone"
                            value={formDetails.id}
                            onChange={(e) => handleChange(e)}
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Password*</Label>
                        <BaseInput
                            name="password"
                            placeholder="Enter Password"
                            value={formDetails.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </BaseFieldSet>
                    <BaseButton
                        type="submit"
                        backgroundcolor={"#4E57BB"}
                    >
                        <Span>
                            Login
                        </Span>
                    </BaseButton>
                </form>
            </Row>
        </AuthWrapper>
    )
}