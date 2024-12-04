import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Login } from "../../assets";
import { Row } from "../../components/flex/styled";
import { BaseInput } from "../../components/form/input/styled";
import { H1, Label, P, Span } from "../../components/typography/styled";
import { AuthWrapper } from "./styled";
import { BaseButton } from "../../components/button/styled";
import { BaseFieldSet } from "../../components/form/fieldset/styled";
import { DotLoader } from "react-spinners";
import { signInUser } from "../../utils/apis/authentication/signin";

export const Auth = () => {
    const cookies = new Cookies();
    
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await signInUser(formDetails);
            if (response.status) {
                setIsLoading(false);
                cookies.set("TOKEN", response.token, {
                    path: "/",
                    maxAge: 1000000,
                });
                cookies.set("ROLE", response.role, {
                    path: "/",
                    maxAge: 1000000,
                });
                if (response.role === "employer") {
                    navigate("/dashboard/admin");
                } else if (response.role === "employee") {
                    navigate("/dashboard/employee");
                } else {
                    navigate("/dashboard/admin");
                }
            } else {
                setIsLoading(false);
                setError('Authentication failed. Please check your credentials and try again.');
                console.error("Authentication failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Login failed. ${error.message}`);
            console.error('Login failed:', error);
        }
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
                            name="email"
                            placeholder="Enter Email/Phone"
                            value={formDetails.email}
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
                        {isLoading ?
                            (<DotLoader
                                size={20}
                                color="white"
                                className='dotLoader'
                            />) : (
                                <Span>
                                    Login
                                </Span>
                            )}
                    </BaseButton>
                    {error && <P style={{ color: 'red' }}>{error}</P>}
                </form>
            </Row>
        </AuthWrapper>
    )
}
