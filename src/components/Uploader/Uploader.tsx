import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from 'baseui';
import { UploadIcon } from 'assets/icons/UploadIcon';

const Text = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  marginTop: '15px',
  textAlign: 'center',
}));

const TextHighlighted = styled('span', ({ $theme }) => ({
  color: $theme.colors.primary,
  fontWeight: 'bold',
}));

const Container = styled('div', ({ props }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#E6E6E6',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border 0.24s ease-in-out',
  cursor: 'pointer',
}));

const ThumbsContainer = styled('aside', () => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
  width: '100%',
}));

const Thumb = styled('div', ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: 'flex',
  borderRadius: '2px',
  margin: '4px',
  maxWidth: '115px',
  maxHeight: '115px',
  padding: '4px',
  boxSizing: 'border-box',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const thumbInner = {
  display: 'flex',
};

const img = {
  display: 'block',
  width: '100px',
  height: 'auto',
};

function Uploader({ onChange, imageURL, uploads }: any) {
  const [files, setFiles] = useState<any>(
    imageURL ? [{ name: 'demo', preview: imageURL }] : []
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: useCallback(
      (acceptedFiles) => {
        if (files.length < 5) {
          setFiles([
            ...files,
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          ]);
          onChange(acceptedFiles);
        }

        if (files[0] === []) {
          files.pop();
        }
      },

      [files, onChange]
    ),
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container uploader">
      {!uploads && (
        <Container {...getRootProps()}>
          <input {...getInputProps()} />
          <UploadIcon />
          <Text>
            <TextHighlighted>Drag/Upload</TextHighlighted> your images here.
          </Text>
        </Container>
      )}
      <ThumbsContainer>
        {uploads
          ? uploads.map((upload) => (
              <Thumb key={upload}>
                <div style={thumbInner}>
                  <img src={upload} style={img} alt={upload} />
                </div>
              </Thumb>
            ))
          : files.map((file) =>
              file.map((upload) => (
                <Thumb key={upload.name}>
                  <div style={thumbInner}>
                    <img src={upload.preview} style={img} alt={upload.name} />
                  </div>
                </Thumb>
              ))
            )}
      </ThumbsContainer>
    </section>
  );
}

export default Uploader;
