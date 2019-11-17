import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Match from './Match';
import PlayerStatsTable from './PlayerStatsTable';
import { PlayerStats, Fixtures } from '../collections';
import { Container, Row, Col } from "reactstrap";

const CONFIG = require('../config/config');

export default class PlayerStatsContainer extends TrackerReact(React.Component) {

    render () {

        const subPlayerStats = Meteor.subscribe("playerstats");
        let subCurrentFixture;
        
        if (CONFIG.testMode) {
            subCurrentFixture = Meteor.subscribe("testcurrentfixture");
        } else {
            subCurrentFixture = Meteor.subscribe("currentfixture");
        }

        if (subCurrentFixture.ready() && subPlayerStats.ready()) {
            const playerStats = PlayerStats.find({}).fetch();
            const currentFixture = Fixtures.findOne({});
            
            const homeOF = getClubPlayers(currentFixture.homeShort, playerStats, false);
            const awayOF = getClubPlayers(currentFixture.awayShort, playerStats, false);
            const homeGK = getClubPlayers(currentFixture.homeShort, playerStats, true);
            const awayGK = getClubPlayers(currentFixture.awayShort, playerStats, true);

            return (
                <div className="content">
                    <Container fluid={true}>
                        <Row>
                            <Col sm="12">
                                <Match fixture={currentFixture}/>
                                <Row>
                                    <Col sm="6">
                                        <PlayerStatsTable players={homeOF} type={"OF"} />
                                        <PlayerStatsTable players={homeGK} type={"GK"} />
                                    </Col>
                                    <Col  sm="6">
                                        <PlayerStatsTable players={awayOF} type={"OF"} />
                                        <PlayerStatsTable players={awayGK} type={"GK"} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (
                <p>Loading...</p>
            )
        }
    }
}

function getClubPlayers(club, playerStats, isGK) {
    let result = [];

    if (isGK) {
        playerStats.forEach(player => {
            if (player.club === club && player.pos === "G") {
                result.push(player);
            } 
        });
    } else {
        playerStats.forEach(player => {
            if (player.club === club && player.pos !== "G") {
                result.push(player);
            } 
        });
    }

    return result;
}