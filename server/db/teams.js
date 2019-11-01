import { Teams } from '../../imports/collections';

function updateTeams(teams) {
    teams.forEach(team => {
        Teams.upsert({
            "id": team.id
        },{
            $set: team
        });
    })
}

export { updateTeams }