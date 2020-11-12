import Form from 'react-bootstrap/Form';
import React from 'react';
import PropTypes from 'prop-types';

const FormInput = (props) => {
    const { type, label, name, placeholder, value, onChange, isInvalid, isValid, ...rest } = props;
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                isInvalid={isInvalid}
                isValid={isValid}
                {...rest}
            />
        </Form.Group>
    );
};

FormInput.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
};

export default FormInput;
