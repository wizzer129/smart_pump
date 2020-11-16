import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ButtonModal = (props) => {
    const { block, buttonClassName, buttonText, modalTitle, modalBody } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className={buttonClassName} variant="primary" onClick={handleShow} block>
                {buttonText}
            </Button>

            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                {modalTitle ? (
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                ) : null}
                {modalBody ? <Modal.Body>{modalBody}</Modal.Body> : null}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

ButtonModal.propTypes = {
    buttonText: PropTypes.string,
    modalTitle: PropTypes.string,
    modalBody: PropTypes.string,
};

export default ButtonModal;
