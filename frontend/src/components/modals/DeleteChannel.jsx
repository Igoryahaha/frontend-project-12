import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import toastParams from '../../toastParams.js';
import { actions as UIActions } from '../../slices/UISlice.js';
import useChat from '../../hooks/useChat';

const DeleteChannel = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.currentUI.showModal);
  const targetChannel = useSelector((state) => state.currentUI.targetChannel);
  const { removeChannel } = useChat();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  });

  const hideHandle = () => {
    dispatch(UIActions.hideModal());
  };

  const deleteHandle = (e) => {
    setSubmitting(true);
    e.preventDefault();
    removeChannel(targetChannel);
    dispatch(UIActions.hideModal());
    toast.success(t('toast.remove_channel'), toastParams);
  };

  return (
    <Modal
      show={modalStatus}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={hideHandle}>
        <Modal.Title>{t('modals.delete_channel')}</Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <form onSubmit={deleteHandle}>
          <p style={{ fontSize: '1.25rem', fontWeight: '300' }}>
            {' '}
            {t('modals.delete_approve')}
          </p>
          <div className="text-end">
            <button type="button" className="btn btn-secondary btn-block mx-1" onClick={() => hideHandle()} disabled={isSubmitting}>
              {' '}
              {t('modals.cancel')}
              {' '}
            </button>
            <button type="submit" className="btn btn-danger btn-block" ref={inputEl} disabled={isSubmitting}>
              {t('main.delete')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
