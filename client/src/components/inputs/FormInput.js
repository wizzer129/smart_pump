import Form from 'react-bootstrap/Form';
import React from 'react';

const FormInput = ({ type, label, placeholder, value, onChange, isInvalid, isValid }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                isInvalid={isInvalid}
                isValid={isValid}
            />
        </Form.Group>
    );
};

export default FormInput;
