import {
    Modal as RBModal
} from 'react-bootstrap'

import Button from './Button'

const Modal = ({
    show=false,
    handleClose,
    title,
    body
}) => {

    return (
        <RBModal show={show} onHide={handleClose}>
            <RBModal.Header closeButton>
                <RBModal.Title>{title}</RBModal.Title>
            </RBModal.Header>
            <RBModal.Body>{body}</RBModal.Body>
            <RBModal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleClose(false)
                }} title="Kapat" />
                <Button variant="danger" onClick={() => {
                    handleClose(true)
                }} title="Sil" />
            </RBModal.Footer>
        </RBModal>
    )
}

export default Modal