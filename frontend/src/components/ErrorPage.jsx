import React from 'react';
import notFoundPic from '../images/notFoundPic.svg';

const ErrorPage = () => (
  <div className="text-center">
    <img src={notFoundPic} className="img-fluid h-25" alt="notFound" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти на
      {' '}
      <a href="/">главную страницу</a>
    </p>
  </div>
);

export default ErrorPage;
