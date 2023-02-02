import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PlusSquare } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as UIActions } from '../slices/UISlice.js';

import useAuth from '../hooks/useAuth.jsx';
import getData from '../utils/api/getData.js';
import toastParams from '../toastParams.js';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader, logOut } = useAuth();
  const headers = getAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(headers);
        if (data.status === 401) {
          logOut();
        }
        const { channels, currentChannelId, messages } = data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        dispatch(UIActions.setCurrentChannelId({ currentChannelId }));
      } catch (e) {
        toast.warn(t('toast.dataFetchError'), toastParams);
      }
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
        <Col xs={4} sm={4} md={2} className="px-2 pt-5 bg-light border-end">
          <div className="d-flex justify-content-between mb-2 ps-3 pe-2">
            <span>{t('main.channels')}</span>
            <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={() => openAddChannelModal()}>
              <PlusSquare fill="currentColor" width="20" height="20" size="small" />
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
