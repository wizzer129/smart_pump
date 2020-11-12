//import FormInput from './FormInput';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'react';
import PropTypes from 'prop-types';

const FormInputOverlay = (props) => {
    const { toolTip, placement, type, label, name, placeholder, value, onChange, isInvalid, isValid, ...rest } = props;
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <OverlayTrigger
                key={placement}
                placement={placement}
                show={isInvalid}
                overlay={
                    toolTip ? (
                        <Tooltip id={`tooltip-${placement}`} show={isInvalid}>
                            {toolTip}
                        </Tooltip>
                    ) : (
                        <p></p>
                    )
                }
            >
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
            </OverlayTrigger>
        </Form.Group>
    );
};

FormInputOverlay.propTypes = {
    placement: PropTypes.string,
    toolTip: PropTypes.string,
};

export default FormInputOverlay;
