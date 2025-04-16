import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [formError, setFormError] = useState({});

    // Handle input changes
    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;
        setFormInput({
            ...formInput,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Form validation & submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        if (!formInput.username) errors.username = "Enter a valid username";
        if (!formInput.password) errors.password = "Enter a valid password";

        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        setFormError({});
        console.log("Form Submitted Successfully:", formInput);
    };

    // Function to navigate Redirects to the Registration Page
    const handleSignUp = () => {
        navigate('/');
    };

    // Function to navigate Redirects to the Forgot Password Page
    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className='register-parent login-parent'>
            <Container className='pt-3 register-container'>
                <h3 className='mb-4'>Login</h3>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-4">
                        <Form.Control 
                            id="username" 
                            name="username"
                            placeholder="Username"
                            aria-label="Username"
                            value={formInput.username}
                            onChange={handleChanges}
                        />
                        {formError.username && <p className='error-message'>{formError.username}</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            aria-label="Password"
                            value={formInput.password}
                            onChange={handleChanges} 
                        />
                        {formError.password && <p className='error-message'>{formError.password}</p>}
                    </InputGroup>

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex justify-content-between align-items-center">
                        <Form.Check 
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            label="Remember Me"
                            checked={formInput.rememberMe}
                            onChange={handleChanges}
                        />
                        <span className="text-primary forgot" style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                            Forgot Password?
                        </span>
                    </div>

                    <Button type="submit" variant="primary" className='mt-3 w-100' onClick={() => navigate('/home')}>Login</Button>

                    {/* New User? Sign Up */}
                    <div className="text-center mt-3">
                        <p>New User? <span className="text-primary already-login" style={{ cursor: 'pointer' }} onClick={handleSignUp}>Sign Up</span></p>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default LoginPage;
