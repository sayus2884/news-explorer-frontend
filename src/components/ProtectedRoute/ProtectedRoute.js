import React, { useContext } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';

import { NavigatorContext } from '../../contexts/NavigatorContext.js';


function ProtectedRoute(props) {

  const history = useHistory();
  const { openSignInModal } = useContext(NavigatorContext);

  const redirectToMain = () => {
    history.push('/');
    openSignInModal();
  }

  return (
    <Route {...props} key={props.key}>
      {
        props.loggedIn ? props.children : redirectToMain()
      }
    </Route>
  );
}

export default withRouter(ProtectedRoute);
