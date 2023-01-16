import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import registrationImg from '../images/registration.jpg';
import { registrationSchema } from '../utils/validation';
import fetchReg from '../utils/api/signup';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes';

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const auth = useAuth();
  const { authMapping } = auth;
  const [feedbackState, setFeedback] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renderFeedback = () => {
    if (!feedbackState) {
      return null;
    }
    return (
      <Alert className="my-2" style={{ textAlign: 'center' }} variant="danger">
        {t('registration.account_exist')}
      </Alert>
    );
  };

  return (
    <Formik
      validationSchema={registrationSchema}
      onSubmit={async ({ username, password }, { setSubmitting }) => {
        setSubmitting(true);
        const response = await fetchReg({ username, password });
        authMapping[response.status](response, setFeedback, navigate);
        setSubmitting(false);
      }}
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
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
        <Form onSubmit={handleSubmit} className="formLogin">
          <Container>
            <Card className="m-5 shadow-sm">
              <Card.Body className="p-5">
                <Row>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <div className="d-flex m-5" style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <img className="rounded-circle" src={registrationImg} alt={t('login.registration')} />
                    </div>
                  </Col>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <h1 className="my-3" style={{ textAlign: 'center' }}>{t('login.registration')}</h1>
                    <Form.Group className="formGroup mb-3">
                      <Form.Label htmlFor="username" visuallyHidden="false">{t('registration.user_name')}</Form.Label>
                      <Form.Control
                        ref={inputRef}
                        type="text"
                        placeholder={t('registration.user_name')}
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                      />
                      {errors.username && touched.username ? (
                        <div className="invalid-feedback">{t(errors.username)}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="formGroup mb-3">
                      <Form.Label htmlFor="password" visuallyHidden="false">{t('password')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('login.password')}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback">{t(errors.password)}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="formGroup mb-3">
                      <Form.Label htmlFor="passwordConfirmation" visuallyHidden="false">{t('registration.password_confirmation')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('registration.password_confirmation')}
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                      />
                      {errors.passwordConfirmation && touched.passwordConfirmation ? (
                        <div className="invalid-feedback">{t(errors.passwordConfirmation)}</div>
                      ) : null}
                      {renderFeedback()}
                    </Form.Group>

                    <button type="submit" className="btn btn-outline-primary btn-block w-100" disabled={isSubmitting}>
                      {t('registration.sign_up')}
                    </button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div style={{ textAlign: 'center' }}>
                  <span className="m-1">{t('registration.have_an_account')}</span>
                  <a href={routes.login()}>
                    {t('login.enter')}
                  </a>
                </div>
              </Card.Footer>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
