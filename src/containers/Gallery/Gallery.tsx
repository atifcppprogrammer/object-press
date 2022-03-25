import React, { useCallback, useEffect, useState } from 'react';
import Select from 'components/Select/Select';
// import Input from 'components/Input/Input';
import { Header } from 'components/Wrapper.style';
import { Grid } from 'components/FlexBox/FlexBox';
import { LoaderItem, Row, Col } from './Gallery.style';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { searchPostsByBlog } from 'store/posts';
import { Gallery, Post } from 'types';
import { galleriesSelector, fetchGalleries } from 'store/galleries';
import Fade from 'react-reveal/Fade';
import ProductCard from 'components/ProductCard/ProductCard';
import Placeholder from 'components/Placeholder/Placeholder';
import { Button } from 'baseui/button';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { mapBlogImages } from 'utils';

export default function Posts() {
  const drawerDispatch = useDrawerDispatch();
  const openDrawer = useCallback(() => {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'GALLERY_FORM',
      backUrl: '/gallery',
      newUrl: '/new-gallery',
    });
  }, [drawerDispatch]);

  const handleUpdate = async () => {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'POST_UPDATE_FORM',
      backUrl: '/gallery',
      newUrl: `/update-gallery/id`,
    });
  };

  const dispatch = useDispatch();
  const [selectedGallery, setSelectedGallery] = useState([]);
  const [galleriesFetched, setGalleriesFetched] = useState(false);
  const _galleries = useSelector(galleriesSelector());
  const [images, setImages] = useState<string[]>(['']);
  const [content, setContent] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [imageNum, setImageNum] = useState<number[]>([]);
  const isOpen = useDrawerState('isOpen');

  useEffect(() => {
    if ((!_galleries?.length && !galleriesFetched) || !isOpen) {
      setGalleriesFetched(true);
      dispatch(fetchGalleries());
    }
  }, [galleriesFetched, dispatch, _galleries, isOpen]);

  async function handleBlog(value: Gallery[]) {
    const posts = ((await dispatch(searchPostsByBlog(value[0].id))) as any)
      .payload as Post[];

    const gallery = mapBlogImages(posts);

    if (gallery?.gallery) {
      setImages(gallery.gallery);
      setTags(gallery.altTags);
      setContent(gallery.postArr);
      setImageNum(gallery.count);
    }
  }

  const handleSearch = async ({ value }) => {
    setImages(['']);

    if (value[0]?.blog) {
      await handleBlog(value);
    } else if (value[0]?.blog === false) {
      alert(value[0]?.blog);
    }

    setSelectedGallery(value);
  };

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
            }}
          >
            <Col md={12}>
              <Row>
                <Col md={2} lg={2}>
                  <Select
                    options={_galleries}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Gallery"
                    value={selectedGallery}
                    searchable={false}
                    onChange={handleSearch}
                  />
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => (
                      <i className="fas fa-plus" aria-label="new blog" />
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    New
                  </Button>
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={handleUpdate}
                    startEnhancer={() => (
                      <i className="fas fa-edit" aria-label="edit blog" />
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                          backgroundColor: 'rgba(59, 130, 246, 1)',
                        }),
                      },
                    }}
                  >
                    Update
                  </Button>
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={handleUpdate}
                    startEnhancer={() => (
                      <i className="fas fa-camera" aria-label="build hook" />
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                          backgroundColor: '#00d4b5',
                        }),
                      },
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Row>
            {images[0] ? (
              images.map((image: string, index: number) => {
                return (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: '15px 0' }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={content[index]}
                        tag={tags[index]}
                        image={image}
                        index={imageNum[index]}
                        data={image}
                      />
                    </Fade>
                  </Col>
                );
              })
            ) : (
              <>
                <Col md={4} lg={3} sm={6} xs={12} style={{ margin: '15px 0' }}>
                  <LoaderItem>
                    <Placeholder />
                  </LoaderItem>
                </Col>
                <Col md={4} lg={3} sm={6} xs={12} style={{ margin: '15px 0' }}>
                  <LoaderItem>
                    <Placeholder />
                  </LoaderItem>
                </Col>
                <Col md={4} lg={3} sm={6} xs={12} style={{ margin: '15px 0' }}>
                  <LoaderItem>
                    <Placeholder />
                  </LoaderItem>
                </Col>
                <Col md={4} lg={3} sm={6} xs={12} style={{ margin: '15px 0' }}>
                  <LoaderItem>
                    <Placeholder />
                  </LoaderItem>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
