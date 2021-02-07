import { useEffect, useState } from 'react';

import Modal from './Modal';
import ModalActions, { ModalActionsProps } from './ModalActions';

type ModalContent = {
  children: React.ReactChild;
  showClose: boolean;
  // eslint-disable-next-line react/require-default-props
  width?: number;
};

interface UseModal {
  show(): void;
  hide(): void;
  RenderModal(children: ModalContent): JSX.Element;
  ModalActions: React.ComponentType<ModalActionsProps>;
}

export const useModal = (): UseModal => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  useEffect(() => {
    const body = document.querySelector('body');

    if (isVisible) {
      body?.classList.add('no-scroll');
      return;
    }

    body?.classList.remove('no-scroll');
  }, [isVisible]);

  const RenderModal = ({ children, showClose, width = 600 }: ModalContent) => {
    useEffect(() => {
      console.log('eita');
    }, []);

    return (
      <>
        {isVisible && (
          <Modal showClose={showClose} width={width} closeModal={hide}>
            {children}
          </Modal>
        )}
      </>
    );
  };

  return {
    show,
    hide,
    RenderModal,
    ModalActions,
  };
};
