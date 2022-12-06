import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CustomModal({ isOpen, toggle, header, children, footer, ...args }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} {...args}>
      {header && <ModalHeader toggle={toggle}>{header}</ModalHeader>}
      <ModalBody className="p-2">{children}</ModalBody>
      {footer && <ModalFooter className="px-4 pb-3 pt-0">{footer}</ModalFooter>}
    </Modal>
  );
}

export default CustomModal;
