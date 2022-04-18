import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import { Error, FormFields, FormLabel } from 'components/FormFields/FormFields';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { useDispatch } from 'react-redux';
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
import { createGallery } from 'store/galleries';
import { validateDescription } from 'utils';
import useFormControl from 'hooks/useFormControl';
import { FormControl } from 'baseui/form-control';

interface Props {
  onClose: CloseDrawer;
}

const NewGalleryForm: React.FC<Props> = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const [isNameVisited, setIsNameVisited] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const onNameChangeHandler = (value: string) => {
    if (!isNameVisited) {
      setIsNameVisited(true);
    }

    setName(value);
  };

  const {
    value: description,
    isValid: descriptionIsValid,
    onInputChangeHandler: onDescriptionChangeHandler,
    onInputBlurHandler: onDescriptionBlurHandler,
    shouldShowError: shouldDescriptionShowError,
  } = useFormControl(validateDescription);

  const nameIsValid = name.length > 0;
  const shoulNameShowError = isNameVisited && !nameIsValid;
  const isFormValid: boolean = nameIsValid && descriptionIsValid;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        await dispatch(
          createGallery({
            gallery: {
              name,
              description,
            },
          })
        );
      } catch (e) {
        console.log(e);
      }

      onClose();
    }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Gallery</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit}
        style={{ height: '100%', backgroundColor: '#f7f7f7' }}
      >
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your gallery name and description here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    error={
                      shoulNameShowError && (
                        <Error>Name should not be empty</Error>
                      )
                    }
                  >
                    <Input
                      value={name}
                      onChange={(e) => onNameChangeHandler(e.target.value)}
                      name="name"
                      onBlur={() => setIsNameVisited(true)}
                      positive={nameIsValid}
                      error={shoulNameShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                    error={
                      shouldDescriptionShowError &&
                      validateDescription(description).errorMessage
                    }
                  >
                    <Input
                      value={description}
                      onChange={onDescriptionChangeHandler}
                      type="text"
                      name="description"
                      onBlur={onDescriptionBlurHandler}
                      positive={validateDescription(description).isValid}
                      error={shouldDescriptionShowError}
                    />
                  </FormControl>
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={onClose}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
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
            type="submit"
            disabled={!isFormValid}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Add Gallery
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default NewGalleryForm;
