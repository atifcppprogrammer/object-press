import React, { useCallback } from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'baseui/modal';
import Button, { KIND } from 'components/Button/Button';
import { useProgressDispatch } from 'context/ProgressContext';
import { ButtonGroup } from './Modal.style';

type Props = any;

const ConfirmModal: React.FC<Props> = (props) => {
  const dispatch = useProgressDispatch();
  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL_MODAL' });
  }, [dispatch]);

  const handleConfirm = useCallback(() => {
    dispatch({ type: 'CONFIRM_MODAL' });
  }, [dispatch]);

  return (
    <>
      <ModalHeader>Please Confirm</ModalHeader>
      <ModalBody>
        Are you sure you would like to proceed? This action cannot be undone.
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            onClick={handleCancel}
            kind={KIND.minimal}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '25%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '25%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Okay
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export default ConfirmModal;
