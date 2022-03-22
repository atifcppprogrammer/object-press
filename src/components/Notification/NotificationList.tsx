import React, { useEffect, useState } from 'react';
import { NotificationIconWrapper } from './Notification.style';
import Popover, { PLACEMENT } from 'components/Popover/Popover';
import Notifications from 'components/Notification/Notifications';
import { useMutation } from '@apollo/client';
import { REMOVE_NOTIFICATION_MUTATION } from 'graphql/mutations';
import { Notify } from 'types';
import { fetchNotifications } from 'store/notify';
import { useDispatch } from 'react-redux';
import { useDrawerState } from 'context/DrawerContext';
const notification: Notify[] = [
  {
    id: '',
    title: 'Nothing New',
    content: 'No new notifications.',
    createDate: new Date().toISOString(),
  },
];

export default function NotificationList() {
  const [remove] = useMutation(REMOVE_NOTIFICATION_MUTATION);
  const [notify, setNotify] = useState<Notify[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch();
  const isOpen = useDrawerState('isOpen');

  async function getData() {
    const notifications = ((await dispatch(fetchNotifications())) as any)
      .payload as Notify[];

    if (notifications.length > 0) {
      setNotify(notifications);
    } else {
      setNotify(notification);
    }

    setFetched(true);
    setCount(notifications.length);
  }

  useEffect(() => {
    if (!fetched || !isOpen) {
      getData();
    }
    // eslint-disable-next-line
  }, [fetched, isOpen]);

  async function removeOne(id: string) {
    if (id.length && fetched) {
      await remove({
        variables: {
          notification: {
            id: id,
          },
        },
      });

      setFetched(false);
    }
  }

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

    setFetched(false);
  };

  return (
    <Popover
      content={({ close }) => (
        <Notifications data={notify} onClear={onClear} removeOne={removeOne} />
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
        {count > 0 ? (
          <>
            <i
              className="fas fa-bell fa-2x"
              style={{ color: 'rgba(59, 130, 246, 1)' }}
            />{' '}
            <span style={{ color: '#3b82f6' }}>{count}</span>
          </>
        ) : (
          <>
            <i className="far fa-bell fa-2x" style={{ color: '#666D92' }} />{' '}
            <span style={{ color: '#3b82f6' }}>{count}</span>
          </>
        )}
      </NotificationIconWrapper>
    </Popover>
  );
}
