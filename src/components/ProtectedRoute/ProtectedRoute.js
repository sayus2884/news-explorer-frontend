import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
  return (
    <Route {...props} key={props.key}>
      {
        props.loggedIn ? props.children : <Redirect to="/signin"/>
      }
    </Route>
  );
}

export default ProtectedRoute;
