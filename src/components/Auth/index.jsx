import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ADMINS = [
  'admin',
  'devyesh2',
  'checkin',
  'jjxu3',
  'rsurti2',
  'mnwilso2',
  'bharath3',
  'arasteh2',
  'snagar8',
  'mgale2',
  'painap2',
  'tjavid2',
  'sujalfs2'
];

const check = (verifier) => {
  return (WrappedComponent, redirect) => {
    const component = (props) => {
      const { jwt } = props;
      if (!verifier(jwt)) {
        if (redirect) {
          return <Redirect to="/login" />;
        } else {
          return null;
        }
      }
      return <WrappedComponent {...props} />;
    }

    const mapStateToProps = state => ({
      jwt: state.user.jwt,
    });
    return connect(mapStateToProps)(component);
  }
}

export const withJWT = check(jwt => jwt !== null);
export const withAdmin = check(jwt => {
  if (jwt === null) { return false; }
  const { sub } = jwtDecode(jwt);
  return ADMINS.indexOf(sub) !== -1;
});
