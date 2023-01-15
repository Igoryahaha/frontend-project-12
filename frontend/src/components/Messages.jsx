import React, { useRef, useEffect } from 'react';
import Message from './Message';

const Messages = (props) => {
  const { currentMessages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className="chat-messages overflow-auto px-5">
      {currentMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
