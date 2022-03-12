import React from 'react';
import ContentLoader from 'react-content-loader';

const PostLoader = (props) => (
  <ContentLoader
    height={350}
    width={'100%'}
    speed={2}
    backgroundColor="#f7f7f7"
    foregroundColor="#ecebeb"
    style={{
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
      padding: '5px',
    }}
  >
    <rect x="2" y="2" rx="0" ry="0" width="100%" height="197" />
    <rect x="15" y="220" rx="0" ry="0" width="140" height="25" />
    <rect x="15" y="254" rx="0" ry="0" width="65" height="15" />
    <rect x="15" y="300" rx="0" ry="0" width="67" height="20" />
    <rect x="170" y="300" rx="0" ry="0" width="60" height="20" />
  </ContentLoader>
);

export default PostLoader;
