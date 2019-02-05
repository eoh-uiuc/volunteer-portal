import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import positions from './positions.json';
import './styles.scss';

class Information extends Component {
  render() {
    return (
      <div className="info container">
        <Typography variant="display1">EOH 2019: Volunteer Descriptions</Typography>

        <div className="panels">
          {
            positions.map(({ position, description}) => (
              <ExpansionPanel key={position}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography><b>{ position }</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    { description }
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Information;
