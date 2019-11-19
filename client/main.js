import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import PlayerStatsContainer from '../imports/components/PlayerStatsContainer';

Meteor.startup(() => {
    render(<PlayerStatsContainer/>, document.getElementById('app'));
});