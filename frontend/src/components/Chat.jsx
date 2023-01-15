import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessages from './NewMessages';
import Messages from './Messages';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const Chat = () => {
  const { t } = useTranslation();
  const curChanId = useSelector((state) => state.currentUI.currentChannelId);
  const currendChannel = useSelector((state) => channelsSelectors.selectById(state, curChanId));
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(({ channelId }) => channelId === curChanId);

  if (!currendChannel) {
    return null;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currendChannel.name}`}</b>
        </p>
        <span className="text-muted">{t('main.counter.count', { count: currentMessages.length })}</span>
      </div>
      <Messages currentMessages={currentMessages} />
      <NewMessages currentChannelId={curChanId} />
    </div>
  );
};

export default Chat;
