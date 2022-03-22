import React from 'react';
import dayjs from 'dayjs';
import {
  Title,
  Message,
  Time,
  TitleWrapper,
  Dot,
  Details,
  Remove,
} from './Notification.style';

export default function NotificationCard({
  message,
  date,
  title,
  id,
  setRemove,
}) {
  const handleRemove = (event) => {
    event.preventDefault();

    setRemove(id);
  };

  return (
    <Message>
      <TitleWrapper>
        <Title>{title}</Title>
        <Dot />
        <Time>{dayjs(date).format('MM/DD/YY')}</Time>

        <form
          onSubmit={(e) => handleRemove(e)}
          style={{ float: 'right', marginLeft: 'auto' }}
        >
          {message === 'No new notifications.' ? (
            <Remove type="button">
              <i className="fas fa-trash" style={{ color: '#E6E6E6' }} />
            </Remove>
          ) : (
            <Remove type="submit">
              <i className="fas fa-trash" />
            </Remove>
          )}
        </form>
      </TitleWrapper>

      <Details>{message}</Details>
    </Message>
  );
}
