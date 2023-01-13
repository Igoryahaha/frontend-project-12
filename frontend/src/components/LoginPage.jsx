import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import avatar from '../images/avatar.jpg';
import { loginSchema } from '../utils/validation';

const Login = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renderFeedback = () => {
    if (false) {
      return (
        <Alert className="my-2" style={{ textAlign: 'center' }} variant="danger">
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
        <Form onSubmit={handleSubmit} className="formLogin">
          <Container>
            <Card className="m-5 shadow-sm">
              <Card.Body className="p-5">
                <Row>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <div className="d-flex m-5" style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <img className="rounded-circle" src={avatar} alt={t('join')} />
                    </div>
                  </Col>
                  <Col xs={{ span: 6 }} sm={{ span: 6 }}>
                    <h1 className="my-3" style={{ textAlign: 'center' }}>{t('join')}</h1>
                    <Form.Group controlId="username" className="formGroup mb-3">
                      <Form.Label htmlFor="username" visuallyHidden="false">{t('login.name')}</Form.Label>
                      <Form.Control
                        ref={inputRef}
                        type="text"
                        placeholder={t('login.name')}
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={(touched.username && !!errors.username)}
                      />
                      {errors.username && touched.username ? (
                        <div className="invalid-feedback">{t(errors.username)}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group controlId="password" className="formGroup mb-3">
                      <Form.Label htmlFor="password" visuallyHidden="false">{t('password')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('login.password')}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={(touched.password && !!errors.password)}
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback">{t(errors.password)}</div>
                      ) : null}
                      {renderFeedback()}
                    </Form.Group>
                    <button type="submit" className="btn btn-outline-primary btn-block w-100" disabled={isSubmitting}>
                      {t('login.enter')}
                    </button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div style={{ textAlign: 'center' }}>
                  <span className="m-1">{t('login.new_account')}</span>
                  <a href="/signup">
                    {t('login.registration')}
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

export default Login;