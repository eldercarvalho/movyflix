import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { FiX } from 'react-icons/fi';

import Button from '../Button';

import { Container, ModalContainer } from './style';

type Props = {
  showClose?: boolean;
  width: number;
  children: React.ReactChild;
  closeModal: () => void;
};

const Modal = React.memo(({ children, showClose, width, closeModal }: Props) => {
  const domEl = document.getElementById('modal-root');

  if (!domEl) return null;

  return ReactDOM.createPortal(
    <Container onClick={(event: MouseEvent) => event.stopPropagation()}>
      <ModalContainer width={width}>
        {showClose && (
          <Button iconOnly onClick={closeModal}>
            <FiX size={24} />
          </Button>
        )}
        <div>{children}</div>
      </ModalContainer>
    </Container>,
    domEl,
  );
});

export default Modal;
