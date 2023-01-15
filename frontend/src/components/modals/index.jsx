import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modalMap = {
  addChannel: AddChannel,
  deleteChannel: DeleteChannel,
  renameChannel: RenameChannel,
};

const RenderModal = () => {
  const modalType = useSelector((state) => state.currentUI.modalType);

  if (!modalType) {
    return null;
  }

  const Component = modalMap[modalType];
  return <Component />;
};

export default RenderModal;
