import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { actions as UIActions } from '../slices/UISlice.js';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.currentUI.currentChannelId);

  const variant = channel.id === currentChannel ? 'secondary' : '';
  const handleClick = (id) => {
    dispatch(UIActions.setCurrentChannelId({ currentChannelId: id }));
  };

  const openModal = (modalType) => {
    dispatch(UIActions.showModal({ modalType, channel }));
  };

  return (
    channel.removable ? (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start text-truncate"
          style={{ boxShadow: 'none', border: 'none' }}
          onClick={() => handleClick(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0" style={{ boxShadow: 'none', border: 'none' }}>
          <span className="visually-hidden">{t('channel_manage')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => openModal('deleteChannel')}>{t('delete')}</Dropdown.Item>
          <Dropdown.Item onClick={() => openModal('renameChannel')}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
      : (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleClick(channel.id)}
          style={{ boxShadow: 'none', border: 'none' }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )
  );
};

export default Channel;
