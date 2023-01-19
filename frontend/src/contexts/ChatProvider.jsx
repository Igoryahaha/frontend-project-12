import React, { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as UIActions } from '../slices/UISlice.js';

export const ChatContext = createContext({});

const ChatProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const addNewChannel = useCallback((channel) => socket.emit('newChannel', channel, (data) => {
    if (data.status === 'ok') {
      dispatch(UIActions.setCurrentChannelId({ currentChannelId: data.data.id }));
    }
  }), [dispatch, socket]);

  socket.on('newChannel', (newChannel) => {
    dispatch(channelsActions.addChannel(newChannel));
  });

  const createNewChatMessage = useCallback((message) => socket.emit('newMessage', message, (data) => {
    console.log(data);
  }), [socket]);

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  const renameChannel = useCallback((channel, input) => socket.emit('renameChannel', { id: channel.id, name: input.name }, (data) => {
    console.log(data);
  }), [socket]);

  socket.on('renameChannel', (renamedChannel) => {
    dispatch(
      channelsActions.updateChannel({
        id: renamedChannel.id,
        changes: { ...renamedChannel, name: renamedChannel.name },
      }),
    );
  });

  const removeChannel = useCallback((channel) => socket.emit('removeChannel', { id: channel.id }, (data) => {
    console.log(data);
  }), [socket]);

  socket.on('removeChannel', (removedChannel) => {
    dispatch(channelsActions.removeChannel(removedChannel.id));
  });

  const value = useMemo(
    () => ({
      addNewChannel, createNewChatMessage, renameChannel, removeChannel,
    }),
    [addNewChannel, createNewChatMessage, removeChannel, renameChannel],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
