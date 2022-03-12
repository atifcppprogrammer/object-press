import React, { useEffect, useState } from 'react';
import { NotificationIconWrapper } from './Notification.style';
import Popover, { PLACEMENT } from 'components/Popover/Popover';
import Notifications from 'components/Notification/Notifications';
import { useMutation, useQuery } from '@apollo/client';
import { Notify } from 'types';
import { NOTIFICATIONS_QUERY } from 'graphql/queries';
import { REMOVE_NOTIFICATION_MUTATION } from 'graphql/mutations';

const notification: Notify[] = [
  {
    id: '',
    title: 'Nothing New',
    content: 'No new notifications.',
    createDate: new Date().toISOString(),
  },
];

export default function NotificationList() {
  const { data } = useQuery(NOTIFICATIONS_QUERY);
  const [notify, setNotify] = useState<Notify[]>([]);
  const [count, setCount] = useState(0);
  const [remove] = useMutation(REMOVE_NOTIFICATION_MUTATION);

  useEffect(() => {
    if (data?.getNotifications[0]) {
      const res = data?.getNotifications.map((data) => data);
      setCount(res.length);
      setNotify(res);
    }
  }, [data]);

  const onClear = () => {
    const notifications = notify.map((item) => item.id);

    notifications.forEach(async (notification) => {
      await remove({
        variables: {
          notification: {
            id: notification,
          },
        },
      });
    });

    setCount(0);
    setNotify([]);
  };

  return (
    <>
      {notify[0] ? (
        <Popover
          content={({ close }) => (
            <Notifications onClear={onClear} data={notify} />
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <i
              className="fas fa-bell fa-2x"
              style={{ color: 'rgba(59, 130, 246, 1)' }}
            />{' '}
            <span style={{ color: '#3b82f6' }}>{count}</span>
          </NotificationIconWrapper>
        </Popover>
      ) : (
        <Popover
          content={({ close }) => (
            <Notifications onClear={onClear} data={notification} />
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <i className="far fa-bell fa-2x" style={{ color: '#666D92' }} />{' '}
            <span style={{ color: '#3b82f6' }}>{count}</span>
          </NotificationIconWrapper>
        </Popover>
      )}
    </>
  );
}
