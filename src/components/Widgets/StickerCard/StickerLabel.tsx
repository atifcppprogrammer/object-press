import React from 'react';
import { Title } from './StickerCard.style';

const StickerLabel = ({ title, icon }: any) => {
  return (
    <Title>
      {icon} {title}
    </Title>
  );
};

export default StickerLabel;
