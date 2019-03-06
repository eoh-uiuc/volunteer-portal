import React from 'react';
import { Route } from 'react-router-dom';

import { withAdmin } from 'components/Auth';

import './styles.scss';
import Timeslot from './scenes/Timeslot';

const Admin = () => {
  return (
    <div className="admin-wrapper">
      <Route path="/admin/timeslot/:id" exact component={Timeslot} />
    </div>
  );
};

export default withAdmin(Admin, true);
