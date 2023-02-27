import React from 'react';
import CardWrapper from '../../common/Card';

const withFunctions = (Component) => (props) => {
   const isAuth = localStorage.getItem('auth');
   const onLogin = () => {
      console.log('yes');
      localStorage.setItem('auth', 'token');
   };
   const onLogOut = () => {
      console.log('no');
      localStorage.removeItem('auth');
   };
   return (
      <CardWrapper>
         <Component isAuth={isAuth} onLogin={onLogin} onLogOut={onLogOut} />
      </CardWrapper>
   );
};

export default withFunctions;
