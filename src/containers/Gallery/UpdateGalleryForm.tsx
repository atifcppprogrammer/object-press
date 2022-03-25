import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { Error, FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useMutation, useQuery } from '@apollo/client';
import { GALLERY_QUERY } from 'graphql/queries';
import { UPDATE_BLOG_MUTATION } from 'graphql/mutations';
import useFormControl from '../../hooks/useFormControl';
import { validateDescription } from '../../utils/index';
import { FormControl } from 'baseui/form-control';
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
import { useDispatch } from 'react-redux';
import { fetchGalleries } from 'store/galleries';
import { Gallery } from 'types';
import { useDrawerState } from 'context/DrawerContext';
import Select from 'components/Select/Select';

interface Props {
  onClose: CloseDrawer;
}

const UpdateGalleryForm: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedGallery, setSelectedGallery] = useState([]);
  const [galleriesFetched, setGalleriesFetched] = useState(false);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [name, setName] = useState<string>('');
  const isOpen = useDrawerState('isOpen');
  const { data } = useQuery(GALLERY_QUERY, {
    variables: {
      galleryId: selectedGallery,
    },
  });

  async function getGalleries() {
    let galleryList = ((await dispatch(fetchGalleries())) as any)
      .payload as Gallery[];

    galleryList = galleryList.filter((_) => !_.blog);

    setGalleries(galleryList);

    setGalleriesFetched(true);
  }

  useEffect(() => {
    if (!galleriesFetched && isOpen) {
      getGalleries();
    }
    // eslint-disable-next-line
  }, [galleriesFetched, galleries]);

  const [updateGallery] = useMutation(UPDATE_BLOG_MUTATION);

  function fetchGallery() {
    const gallery = data?.getGallery;

    setName(gallery.name);
    setInitialDescription(gallery.description);
  }

  // eslint-disable-next-line
  const getGalleryInfo = useCallback(fetchGallery, [data]);

  useEffect(() => {
    if (selectedGallery && data?.getGallery) {
      getGalleryInfo();
    }
  }, [getGalleryInfo, selectedGallery, data]);

  const [isNameVisited, setIsNameVisited] = useState<boolean>(false);

  const onNameChangeHandler = (value: string) => {
    if (!isNameVisited) {
      setIsNameVisited(true);
    }

    setName(value);
  };

  const {
    value: newDescription,
    isValid: newDescriptionIsValid,
    onInputChangeHandler: onNewDescriptionChangeHandler,
    onInputBlurHandler: onNewDescriptionBlurHandler,
    shouldShowError: shouldNewDescriptionShowError,
    setInitialValue: setInitialDescription,
  } = useFormControl(validateDescription);

  const nameIsValid = name.length > 0;
  const shoulNameShowError = isNameVisited && !nameIsValid;
  const isFormValid: boolean = nameIsValid && newDescriptionIsValid;

  const handleSearch = ({ value }) => {
    setSelectedGallery(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (isFormValid) {
      await updateGallery({
        variables: {
          blog: {
            galleryId: selectedGallery,
            name: name,
            description: newDescription,
          },
        },
      });

      onClose();
    }
  }

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Gallery</DrawerTitle>
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
              <FieldDetails>Specifies the Gallery</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Gallery</FormLabel>
                  <Select
                    options={galleries}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Gallery Name"
                    value={selectedGallery}
                    onChange={handleSearch}
                    searchable={false}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          {selectedGallery?.length > 0 && (
            <Row>
              <Col lg={4}>
                <FieldDetails>
                  Update your blog description and necessary information here
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
                        shouldNewDescriptionShowError &&
                        validateDescription(newDescription).errorMessage
                      }
                    >
                      <Textarea
                        value={newDescription}
                        onChange={onNewDescriptionChangeHandler}
                        onBlur={onNewDescriptionBlurHandler}
                        positive={validateDescription(newDescription).isValid}
                        error={shouldNewDescriptionShowError}
                      />
                    </FormControl>
                  </FormFields>
                </DrawerBox>
              </Col>
            </Row>
          )}
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
            Update
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default UpdateGalleryForm;
