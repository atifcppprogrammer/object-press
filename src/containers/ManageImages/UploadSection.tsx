import React, { useEffect, useState } from 'react';

import Button from 'components/Button/Button';
import { Row, Col } from 'components/FlexBox/FlexBox';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import Uploader from 'components/Uploader/Uploader';
import { FieldDetails } from '../DrawerItems/DrawerItems.style';

export const UploadSection: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {}, [files]);

  const onUpload = (uploadedFiles: File[]) => {
    const file = uploadedFiles[0];

    if (file) {
      setFiles([...files, file]);
    }
  };

  const onRemove = (index: number) => {
    const newFiles = [...files];

    newFiles.splice(index, 1);

    setFiles(newFiles);
  };

  return (
    <>
      <Row>
        <Col lg={4}>
          <FieldDetails>Upload your post images here</FieldDetails>
        </Col>
        <Col lg={8}>
          <DrawerBox
            overrides={{
              Block: {
                style: {
                  width: '100%',
                  height: 'auto',
                  padding: '30px',
                  borderRadius: '3px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
                },
              },
            }}
          >
            <Uploader files={files} onRemove={onRemove} onUpload={onUpload} />
          </DrawerBox>
        </Col>

        <Col lg={4}>
          <FieldDetails>Add your image alt tags here</FieldDetails>
        </Col>
        <Col lg={8}>
          <DrawerBox></DrawerBox>
        </Col>
        <Col lg={4}></Col>
        <Col lg={8}>
          <Button
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '100%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </>
  );
};
