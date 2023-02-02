import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormControl, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { validateName } from '../../utils/validation.js';
import { actions as UIActions } from '../../slices/UISlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat';
import toastParams from '../../toastParams.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.currentUI.showModal);
  const channelsState = useSelector(channelsSelectors.selectAll);
  const existChannel = channelsState.map(({ name }) => name);
  const schema = validateName(existChannel);
  const { addNewChannel } = useChat();

  useEffect(() => {
    inputEl.current.focus();
  });

  const hideHandle = () => {
    dispatch(UIActions.hideModal());
  };

  const handleCreateChannel = (id) => {
    dispatch(UIActions.setCurrentChannelId({ currentChannelId: id }));
  };

  return (
    <Modal
      show={modalStatus}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={hideHandle}>
        <Modal.Title>{t('modals.add_channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            addNewChannel(values, handleCreateChannel);
            dispatch(UIActions.hideModal());
            toast.success(t('toast.add_channel'), toastParams);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="name" visuallyHidden="false">{t('modals.channel_name')}</Form.Label>
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
                <button type="button" className="btn btn-secondary btn-block mx-1" onClick={() => hideHandle()} disabled={isSubmitting}>{t('modals.cancel')}</button>
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>{t('modals.send')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
