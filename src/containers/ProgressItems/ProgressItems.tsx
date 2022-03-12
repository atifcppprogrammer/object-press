import React, { useCallback } from 'react';
import { useProgressState, useProgressDispatch } from 'context/ProgressContext';
import { Modal, SIZE, ROLE } from 'baseui/modal';
import ConfirmModal from 'components/Modal/ConfirmModal';
import SuccessToast from 'components/Toast/SuccessToast';
import ErrorToast from 'components/Toast/ErrorToast';

const PROGRESS_COMPONENTS = {
  CONFIRM_MODAL: ConfirmModal,
  SUCCESS_TOAST: SuccessToast,
  ERROR_TOAST: ErrorToast,
};

export default function ProgressItems() {
  const isOpen = useProgressState('isOpen');
  const progressComponent = useProgressState('progressComponent');
  const dispatch = useProgressDispatch();
  const closeModal = useCallback(
    () =>
      dispatch({
        type: 'CANCEL_MODAL',
        progressComponent: null,
        confirmed: false,
      }),
    [dispatch]
  );
  if (!progressComponent) {
    return null;
  }

  const SpecificContent = PROGRESS_COMPONENTS[progressComponent];

  return progressComponent.includes('MODAL') ? (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      animate
      closeable
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <SpecificContent onClose={closeModal} />
    </Modal>
  ) : (
    <SpecificContent />
  );
}
