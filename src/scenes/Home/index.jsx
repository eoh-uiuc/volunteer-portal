import React from 'react';

import { withJWT } from 'components/Auth';
import Scheduler from 'scenes/Scheduler';

export default withJWT(() => <Scheduler />, true);
