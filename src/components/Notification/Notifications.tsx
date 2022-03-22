import React, { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import { Body, ClearAll, Header, Heading } from './Notification.style';

export default function Notifications({ data, onClear, removeOne }) {
  const [remove, setRemove] = useState<string>('');

  useEffect(() => {
    if (remove.length) {
      removeOne(remove);
    }
    // eslint-disable-next-line
  }, [remove]);

  return (
    <div>
      <Header>
        <Heading>Notifications</Heading>
        <ClearAll onClick={onClear}>Clear All</ClearAll>
      </Header>
      <Body>
        {data.map((item) => (
          <NotificationCard
            key={item.id}
            message={item.content}
            date={item.createDate}
            title={item.title}
            id={item.id}
            setRemove={setRemove}
          />
        ))}
      </Body>
    </div>
  );
}
