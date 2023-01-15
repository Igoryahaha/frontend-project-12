import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import useAuth from '../hooks/useAuth.jsx';
import useChatApi from '../hooks/useChatApi';

const NewMessages = (props) => {
  const { currentChannelId } = props;
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const { getUsername } = useAuth();
  const { createNewChatMessage } = useChatApi();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length <= 0) {
      return;
    }
    const data = {
      body: message,
      channelId: currentChannelId,
      username: getUsername(),
    };
    createNewChatMessage(data);
    setMessage('');
  };

  console.log(currentChannelId);

  return (
    <div className="mt-auto px-5 py-2">
      <Form className="py-1 border rounded-2" onSubmit={(e) => handleSubmit(e)}>
        <Form.Label htmlFor="body" visuallyHidden="false">{t('new_message')}</Form.Label>
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2 form-control"
            placeholder={t('main.enter_message')}
            aria-label={t('new_message')}
            value={message}
            onChange={handleChange}
            ref={inputRef}
            name="body"
            id="body"
          />
          <button disabled={message.length <= 0} className="btn btn-group-vertical" type="submit" style={{ border: 'none' }}>
            <ArrowRightSquare fill="currentColor" width="20" height="20" size="small" />
            <span className="visually-hidden">{t('main.send')}</span>
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessages;
