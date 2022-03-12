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
import { useMutation } from '@apollo/client';
import { REMOVE_NOTIFICATION_MUTATION } from 'graphql/mutations';
import { useHistory } from 'react-router';

export default function NotificationCard({ message, date, title, id }) {
  const history = useHistory();
  const [remove] = useMutation(REMOVE_NOTIFICATION_MUTATION);

  async function removeNotification(event) {
    event.preventDefault();

    await remove({
      variables: {
        notification: {
          id: id,
        },
      },
    });
    history.go(0);
  }

  return (
    <Message>
      <TitleWrapper>
        <Title>{title}</Title>
        <Dot />
        <Time>{dayjs(date).format('MM/DD/YY')}</Time>

        <form
          onSubmit={(event) => removeNotification(event)}
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
