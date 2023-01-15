import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as UIActions } from '../slices/UISlice.js';

import useAuth from '../hooks/useAuth.jsx';
import getData from '../utils/api/getData.js';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(headers);
      const { channels, currentChannelId, messages } = data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(UIActions.setCurrentChannelId({ currentChannelId }));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddChannelModal = () => {
    dispatch(UIActions.showModal({ modalType: 'addChannel' }));
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col sm={4} md={2} className="px-2 pt-5 bg-light border-end">
          <div className="d-flex justify-content-between mb-2 ps-3 pe-2">
            <span>{t('main.channels')}</span>
            <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={() => openAddChannelModal()}>
              <ion-icon size="small" name="add-outline" />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
