import React, { useEffect, useState } from 'react';
import { withStyle, useStyletron } from 'baseui';
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import ColumnChart from 'components/Widgets/ColumnChart/ColumnChart';
import StickerCard from 'components/Widgets/StickerCard/StickerCard';
import { useQuery } from '@apollo/client';
import { METRICS_QUERY } from 'graphql/queries';
import dayjs from 'dayjs';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 574px)': {
    marginBottom: '30px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Dashboard = () => {
  const [css] = useStyletron();
  const mb30 = css({
    '@media only screen and (max-width: 990px)': {
      marginBottom: '16px',
    },
  });
  const [blogs, setBlogs] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [images, setImages] = useState<number>(0);
  const [postHistory, setPostHitsory] = useState<Months>(months);
  const { data, loading } = useQuery(METRICS_QUERY);

  useEffect(() => {
    if (data?.getMetrics) {
      const res = data.getMetrics;

      setBlogs(res.blogs);
      setPending(res.pendingPosts);
      setActive(res.activePosts);
      setImages(res.images);
      setPostHitsory(res.postHistory);
    }
  }, [data]);

  return (
    <Grid fluid={true}>
      {!loading && (
        <>
          <Row>
            <Col lg={3} sm={6} xs={12} className={mb30}>
              <StickerCard
                title="Total Blogs"
                subtitle=""
                icon={
                  <i
                    className="fas fa-sync fa-3x"
                    style={{ color: '#ffe8b2' }}
                  />
                }
                price={blogs}
                indicator="up"
                indicatorText="Blogs"
                note=""
                link="/blogs"
                linkText="Details"
              />
            </Col>
            <Col lg={3} sm={6} xs={12} className={mb30}>
              <StickerCard
                title="Pending Posts"
                subtitle=""
                icon={
                  <i
                    className="far fa-pause-circle fa-3x"
                    style={{ color: '#facaca' }}
                  />
                }
                price={pending}
                indicator="down"
                indicatorText="Pending"
                note=""
                link="/posts"
                linkText="Details"
              />
            </Col>
            <Col lg={3} sm={6} xs={12}>
              <StickerCard
                title="Active Posts"
                subtitle=""
                icon={
                  <i
                    className="far fa-play-circle fa-3x"
                    style={{ color: '#d1f9f5' }}
                  />
                }
                price={active}
                indicator="up"
                indicatorText="Active"
                note=""
                link="/posts"
                linkText="Details"
              />
            </Col>
            <Col lg={3} sm={6} xs={12}>
              <StickerCard
                title="Total Images"
                subtitle=""
                icon={
                  <i
                    className="far fa-image fa-3x"
                    style={{ color: '#f8dac2' }}
                  />
                }
                price={images}
                indicator="up"
                indicatorText="Images"
                note=""
                link="/gallery"
                linkText="Details"
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} lg={12}>
              <ColumnChart
                widgetTitle={`Post History: ${dayjs(new Date()).year()}`}
                colors={['#03D3B5']}
                prefix={<i className="far fa-chart-bar fa-lg" />}
                totalValue={active + pending}
                position={active + pending > 0 ? 'up' : ''}
                percentage="Total Posts"
                text=""
                series={[
                  postHistory.jan,
                  postHistory.feb,
                  postHistory.mar,
                  postHistory.apr,
                  postHistory.may,
                  postHistory.jun,
                  postHistory.jul,
                  postHistory.aug,
                  postHistory.sep,
                  postHistory.oct,
                  postHistory.nov,
                  postHistory.dec,
                ]}
                categories={[
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ]}
              />
            </Col>
          </Row>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;

interface Months {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

let months: Months = {
  jan: 0,
  feb: 0,
  mar: 0,
  apr: 0,
  may: 0,
  jun: 0,
  jul: 0,
  aug: 0,
  sep: 0,
  oct: 0,
  nov: 0,
  dec: 0,
};
