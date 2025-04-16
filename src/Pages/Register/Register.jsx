import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import './Register.scss';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        country_code: '',
        contactno: '',
        password: '',
        confirmPassword: '',
        checkbox: false
    });

    const [formError, setFormError] = useState({});

    const formatToYYYYMMDD = (dob) => {
        const [dd, mm, yyyy] = dob.split("-");
        return yyyy && mm && dd ? `${yyyy}-${mm}-${dd}` : "";
    };

    const formatToDDMMYYYY = (date) => {
        const [yyyy, mm, dd] = date.split("-");
        return yyyy && mm && dd ? `${dd}-${mm}-${yyyy}` : "";
    };

    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;
        setFormInput({
            ...formInput,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleDateSelect = (date) => {
        setFormInput({
            ...formInput,
            dob: formatToDDMMYYYY(date)
        });
    };

    const handlePhoneChange = (value, country) => {
        setFormInput({
            ...formInput,
            country_code: `+${country.dialCode}`,
            contactno: value.replace(`+${country.dialCode}`, '')
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
    
        if (!formInput.firstname) errors.firstname = "First name is required";
        if (!formInput.lastname) errors.lastname = "Last name is required";
        if (!formInput.email) errors.email = "Enter a valid email address";
        if (!formInput.dob) errors.dob = "Date of birth is required";
        if (!formInput.contactno) errors.contactno = "Enter a valid mobile number";
        if (!formInput.password) errors.password = "Password should not be empty";
        if (!formInput.confirmPassword) errors.confirmPassword = "Confirm password should not be empty";
    
        if (formInput.password !== formInput.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
    
        if (!formInput.checkbox) errors.checkbox = "You must accept the terms & privacy policy";
    
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        const formData = {
            firstname: formInput.firstname,
            lastname: formInput.lastname,
            email: formInput.email,
            dob: new Date(formInput.dob).toISOString().split('T')[0],
            contactno: formInput.contactno,
            password: formInput.password
        };
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed!");
        }
    };
    
    return (
        <div className='register-parent'>
            <Container className='pt-3 register-container'>
                <h3 className='mb-3'>Register</h3>
                <h5 className='mb-3'>Create your account</h5>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    id="firstname" 
                                    name="firstname"
                                    placeholder="Firstname"
                                    aria-label="Firstname"
                                    onChange={handleChanges}
                                />
                                {formError.firstname && <p className='error-message'>{formError.firstname}</p>}
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    id="lastname" 
                                    name="lastname"
                                    placeholder="Lastname"
                                    aria-label="Lastname"
                                    onChange={handleChanges} 
                                />
                                {formError.lastname && <p className='error-message'>{formError.lastname}</p>}
                            </InputGroup>
                        </Col>
                    </Row>

                    <InputGroup className="mb-3">
                        <Form.Control 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            aria-label="Email"
                            onChange={handleChanges} 
                        />
                        {formError.email && <p className='error-message'>{formError.email}</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control 
                            id="dob-picker"
                            type="date"
                            aria-label="Date of Birth Picker"
                            value={formInput.dob ? formatToYYYYMMDD(formInput.dob) : ""}
                            onChange={(e) => handleDateSelect(e.target.value)}
                            onClick={(e) => e.target.showPicker()}
                        />
                        {formError.dob && <p className='error-message'>{formError.dob}</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <PhoneInput
                            country={"in"}
                            value={formInput.contactno}
                            onChange={handlePhoneChange}
                            inputProps={{
                                name: "contactno",
                                required: true,
                                autoFocus: false,
                                className: "form-control"
                            }}
                        />
                        {formError.contactno && <p className='error-message'>{formError.contactno}</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            aria-label="Password"
                            onChange={handleChanges} 
                        />
                        {formError.password && <p className='error-message'>{formError.password}</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control 
                            id="confirmPassword" 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            onChange={handleChanges} 
                        />
                        {formError.confirmPassword && <p className='error-message'>{formError.confirmPassword}</p>}
                    </InputGroup>

                    <div className='d-flex terms'>
                        <Form.Check 
                            type="checkbox" 
                            id="checkbox" 
                            name="checkbox"
                            onChange={handleChanges} 
                        />
                        <span className='d-block main-check'>
                            I accept the <span className='privacy-clr'>Terms of Use</span> & <span className='privacy-clr'>Privacy Policy</span>
                        </span>
                        {formError.checkbox && <p className='error-message checkbox-error'>{formError.checkbox}</p>}
                    </div>

                    <Button type="submit" variant="primary" className='mt-3 w-100'>Register Now</Button>
                </Form>

                <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <span 
                        className="text-primary cursor-pointer already-login" 
                        style={{ cursor: "pointer" }} 
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </div>
            </Container>
        </div>
    );
}

export default RegistrationPage;