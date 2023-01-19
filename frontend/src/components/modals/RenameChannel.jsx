import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormControl, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import toastParams from '../../toastParams.js';
import { validateName } from '../../utils/validation.js';
import { actions as UIActions } from '../../slices/UISlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat';

const RenameChannel = () => {
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.currentUI.showModal);
  const channelsState = useSelector(channelsSelectors.selectAll);
  const existChannel = channelsState.map(({ name }) => name);
  const schema = validateName(existChannel);
  const { renameChannel } = useChat();
  const targetChannel = useSelector((state) => state.currentUI.targetChannel);

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  });

  const hideHandle = () => {
    dispatch(UIActions.hideModal());
  };

  return (
    <Modal
      show={modalStatus}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={hideHandle}>
        <Modal.Title>{t('modals.rename_channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: targetChannel.name,
          }}
          onSubmit={(values) => {
            renameChannel(targetChannel, values);
            dispatch(UIActions.hideModal());
            toast.success(t('toast.rename_channel'), toastParams);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="name" className="visually-hidden">{t('modals.channel_name')}</Form.Label>
                <FormControl
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  ref={inputEl}
                  isInvalid={touched.name && !!errors.name}
                  className="mb-2"
                  id="name"
                />
                {errors.name && touched.name ? (
                  <div className="invalid-feedback">{t(errors.name)}</div>
                ) : null}
                <div className="text-end">
                  <button type="button" className="btn btn-secondary btn-block mx-1" onClick={() => hideHandle()}>{t('modals.cancel')}</button>
                  <button type="submit" className="btn btn-primary btn-block">{t('modals.send')}</button>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
