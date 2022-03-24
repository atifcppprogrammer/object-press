import React, { useCallback, useEffect, useState } from 'react';
import Select from 'components/Select/Select';
// import Input from 'components/Input/Input';
import { Header } from 'components/Wrapper.style';
import { Grid } from 'components/FlexBox/FlexBox';
import { LoaderItem, Row, Col } from './Gallery.style';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { searchPostsByBlog } from 'store/posts';
import { Post } from 'types';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import Fade from 'react-reveal/Fade';
import ProductCard from 'components/ProductCard/ProductCard';
import Placeholder from 'components/Placeholder/Placeholder';
import { Button } from 'baseui/button';
import { useDrawerDispatch } from 'context/DrawerContext';

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
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [search, setSearch] = useState('');
  const [blogsFetched, setBlogsFetched] = useState(false);
  const _blogs = useSelector(blogsSelector());
  const [images, setImages] = useState<string[]>(['']);
  const [content, setContent] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [imageNum, setImageNum] = useState<number[]>([]);

  useEffect(() => {
    if (!_blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [blogsFetched, dispatch, _blogs]);

  useEffect(() => {
    if (search?.length === 0) {
      setImages(['']);
    }
  }, [search]);

  //const handleSearch = async () => {
  //  const value = search;
  //  setImages(['']);
  //
  //  if (value && value.length >= 2) {
  //    const posts = ((await dispatch(searchPosts(value))) as any)
  //      .payload as Post[];
  //
  //    const content = posts?.map((post: any) => post.post);
  //    let gallery: string[] = [];
  //    let postArr: string[] = [];
  //    let altTags: string[] = [];
  //    let count: number[] = [];
  //
  //    content?.forEach((post) => {
  //      if (post?.images[0]) {
  //        gallery.push(...post.images);
  //        post.images.forEach((item, index) => {
  //          postArr.push(post.title);
  //          if (postArr.includes(post.title)) {
  //            count.push(index + 1);
  //          } else {
  //            count.push(1);
  //          }
  //        });
  //      }
  //
  //      if (post?.images[0] && post?.altTags?.length) {
  //        altTags.push(...post.altTags);
  //      } else if (post?.images[0]) {
  //        altTags.push('');
  //      }
  //    });
  //
  //    if (gallery[0]) {
  //      setImages(gallery);
  //      setTags(altTags);
  //      setContent(postArr);
  //      setImageNum(count);
  //    }
  //  }
  //
  //    setSearch(value);
  //    setSelectedBlog([]);
  //  };

  const handleBlog = async ({ value }) => {
    setImages(['']);
    if (value.length) {
      const posts = ((await dispatch(searchPostsByBlog(value[0].id))) as any)
        .payload as Post[];

      const content = posts?.map((post: any) => post.post);
      let gallery: string[] = [];
      let postArr: string[] = [];
      let altTags: string[] = [];
      let count: number[] = [];

      content?.forEach((post) => {
        if (post?.images[0]) {
          gallery.push(...post.images);
          post.images.forEach((item, index) => {
            postArr.push(post.title);
            if (postArr.includes(post.title)) {
              count.push(index + 1);
            } else {
              count.push(1);
            }
          });
        }

        if (post?.images[0] && post?.altTags?.length) {
          altTags.push(...post.altTags);
        } else if (post?.images[0]) {
          altTags.push('');
        }
      });

      if (gallery[0]) {
        setImages(gallery);
        setTags(altTags);
        setContent(postArr);
        setImageNum(count);
      }
    }

    setSelectedBlog(value);
    setSearch('');
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
                    options={_blogs}
                    labelKey="title"
                    valueKey="id"
                    placeholder="Gallery"
                    value={selectedBlog}
                    searchable={false}
                    onChange={handleBlog}
                  />
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => (
                      <i className="fas fa-plus" aria-label="new gallery"></i>
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
                      <i className="fa fa-camera" aria-label="add image"></i>
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
                    Add
                  </Button>
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={handleUpdate}
                    startEnhancer={() => (
                      <i
                        className="fa fa-trash"
                        aria-label="delete gallery"
                      ></i>
                    )}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme }) => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                          backgroundColor: $theme.colors.red400,
                        }),
                      },
                    }}
                  >
                    Remove
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
