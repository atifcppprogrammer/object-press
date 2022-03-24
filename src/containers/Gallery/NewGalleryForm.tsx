import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { useDispatch, useSelector } from 'react-redux';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
// import { addPost } from 'store/posts';

interface Props {
  onClose: CloseDrawer;
}

const NewGalleryForm: React.FC<Props> = ({ onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const dispatch = useDispatch();

  const blogs = useSelector(blogsSelector());
  const [blogsFetched, setBlogsFetched] = useState(false);

  useEffect(() => {
    if (!blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, blogsFetched]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   await dispatch(
    //     addPost({
    //       post: {
    //         title,
    //         description,
    //       },
    //     })
    //   );
    //
    //   closeDrawer();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Post</DrawerTitle>
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
                  <FormLabel>Gallery Name</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                  />
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
