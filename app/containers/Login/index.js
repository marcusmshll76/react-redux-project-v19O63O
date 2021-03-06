import React, { 
  memo, 
  useState,
  useEffect,
} from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";
import { 
  Row, 
  Col, 
  Button, 
  Form, 
  Input,
  Label,
  FormGroup,
  CustomInput
} from 'reactstrap';

import { doLogin } from '../App/actions';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from '../App/reducer'
import saga from './saga'

const key = 'login';

import { 
  NotificationContainer, 
  NotificationManager,
} from 'react-notifications';
import { 
  makeSelectLoading, 
  makeSelectError,
} from '../App/selectors';


const Login = ({ doLogin, loading, error }) => {
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    doLogin({ email, password });
  };
    
  useEffect(() => {
    if( error ) NotificationManager.error('Incorrect User email or password!')
  }, [error])

  return (
    <main>
      <NotificationContainer/>
      <Helmet>
        <title>Log in</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Row>        
        <Col>
          <div className="login-panel">
          <div className="title">Login</div>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input 
                type="email" 
                name="email" 
                id="exampleEmail" 
                placeholder="Email" 
                value={email}
                onChange={event => { setEmail(event.target.value) }}/>
            </FormGroup>
            <FormGroup>
              <Input 
                type="password" 
                name="password" 
                id="examplePassword" 
                placeholder="Password"
                value={password}
                onChange={event => { setPassword(event.target.value) }} />
            </FormGroup>
            <FormGroup className="form-footer" row>
              <Col sm={{ size: 12 }}>
                <Button
                  className="btn btn-primary"
                  defaultValue={`${loading ? 'Doing login...' : 'Login'}`}
                  disabled={loading}>
                  Login
                </Button>
              </Col>
              <Col sm={{ size: 12 }}>
                <Link
                  className="btn"
                  to="/signup">
                  Forget Password?
                </Link>|
                <Link
                  className="btn"
                  to="/signup">
                  Sign up
                </Link>
              </Col>
            </FormGroup>            
          </Form>
          </div>
        </Col>
      </Row>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    doLogin: (user) => dispatch(doLogin(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);