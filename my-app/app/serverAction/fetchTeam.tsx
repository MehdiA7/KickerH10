export function FetchCreateNewTeam() {
    
    let postObj =
    {
    "name": "LesKickerMaster",
    "player1": 1,
    "player2": 2
    }

    return "Team created successfully";
}

export function FetchTeamByUserId(userId : number) {
    
    const teamObj =[
    {
    "id": 1,
    "name": "LesKickerMaster",
    "player1": 1,
    "player2": 2
    },
    {
        "id": 2,
    "name": "LesFouDuBallon",
    "player1": 1,
    "player2": 3
    },
    {
    "id": 3,
    "name": "RoadToWin",
    "player1": 1,
    "player2": 4
    }]

    return teamObj;
}