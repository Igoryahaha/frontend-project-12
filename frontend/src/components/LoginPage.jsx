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
import loginImg from '../images/login.jpg';
import { loginSchema } from '../utils/validation';
import fetchAuth from '../utils/api/auth';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { authMapping } = auth;
  const [isShowAlert, setShowAlert] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renderAlert = () => {
    if (isShowAlert) {
      return (
        <Alert
          className="my-2"
          style={{ textAlign: 'center' }}
          variant="danger"
        >
          {t('login.incorrectAuthData')}
        </Alert>
      );
    }
    return null;
  };

  return (
    <Formik
      validationSchema={loginSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        const response = await fetchAuth(data);
        console.log(auth);
        authMapping[response.status](response, setShowAlert, navigate);
        setSubmitting(false);
      }}
      initialValues={{
        username: '',
        password: '',
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
        <Form onSubmit={handleSubmit} className="formLogin h-100">
          <Container className="d-flex justify-content-center align-content-center">
            <Card className="m-5 shadow-sm col-12 col-md-8 ">
              <Card.Body className="p-5">
                <Row>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <div
                      className="d-flex m-5"
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <img
                        className="rounded-circle"
                        src={loginImg}
                        alt={t('join')}
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <h1 className="my-3" style={{ textAlign: 'center' }}>
                      {t('login.enter')}
                    </h1>
                    <Form.Group className="formGroup mb-3">
                      <Form.Label htmlFor="username" visuallyHidden="false">
                        {t('login.name')}
                      </Form.Label>
                      <Form.Control
                        ref={inputRef}
                        type="text"
                        placeholder={t('login.name')}
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={
                          (touched.username && !!errors.username) || isShowAlert
                        }
                      />
                      {errors.username && touched.username ? (
                        <div className="invalid-feedback">
                          {t(errors.username)}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="formGroup mb-3">
                      <Form.Label htmlFor="password" visuallyHidden="false">
                        {t('password')}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('login.password')}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={
                          (touched.password && !!errors.password) || isShowAlert
                        }
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback">
                          {t(errors.password)}
                        </div>
                      ) : null}
                      {renderAlert()}
                    </Form.Group>
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-block w-100"
                      disabled={isSubmitting}
                    >
                      {t('login.enter')}
                    </button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div style={{ textAlign: 'center' }}>
                  <span className="m-1">{t('login.new_account')}</span>
                  <a href={routes.signup()}>{t('login.registration')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
