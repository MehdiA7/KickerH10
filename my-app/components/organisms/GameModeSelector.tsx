"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, FC, useEffect } from "react";
import SelectPlayer from "../molecules/SelectPlayer";
import { FetchTeamByUserId } from "../../app/serverAction/fetchTeam";
import { FriendUserList } from "@/lib/types/type";
import ScoreSelector from "./ScoreSelector";
import { CookieUserInformation } from "@/lib/types/authTypes";
import { Team } from "@/lib/types/type";
import SelectTeam from "../molecules/SelectTeam";

type GameModeSelectorProps = {
    FetchFriendWithUserId: FriendUserList[];
    UserInformation: CookieUserInformation;
};

const GameModeSelector: FC<GameModeSelectorProps> = ({
    FetchFriendWithUserId,
    UserInformation,
}) => {
    const [gameMode, setGameMode] = useState("1v1");
    const [ally, setAlly] = useState(UserInformation.username);
    const [allyTeam, setAllyTeam] = useState<Team>();
    const [challenger, setChallenger] = useState("");
    const [challengerTeam, setChallengerTeam] = useState<Team>();
    const [userTeamsList, setUserTeamsList] = useState<Team[]>([]);
    const [challengerTeamsList, setchallengerTeamsList] = useState<Team[]>([]);
    const handleScoreSubmit = (allyScore: string, challengerScore: string) => {
        if (gameMode === "2v2") {
            /*
            ?? what is this ?
            const player1 = ally.split("");
            const player2 = allyTeam.split("");
            const player3 = challenger.split("");
            const player4 = challengerTeam.split("");
            let team1Name = `${player1[0] + player1[1] + player1[2]}${
                player2[0] + player2[1] + player2[2]
            }`;
            let team2Name = `${player3[0] + player3[1] + player3[2]}${
                player4[0] + player4[1] + player4[2]
            }`;
            */
            if (allyTeam != undefined && challengerTeam != undefined) {
                let team1id = allyTeam.id;
                let team2id = challengerTeam.id;

                const body = {
                    team1: team1id,
                    team2: team2id,
                    team1score: allyScore,
                    team2scpre: challengerScore,
                };
                console.log("Final score:", body);
            }
        } else {
            const body = {
                player1: ally,
                player2: challenger,
                score1: allyScore,
                score2: challengerScore,
            };
        }
    };


    // NEXT FEATURE : TEAM GAME
//     useEffect(() => {
//         const fetchTeams = async () => {
//             // const userid = 1;
//             // const data = FetchTeamByUserId(userid);
//             setUserTeamsList([]);
//         };
//         /*  
//     if (UserInformation.id) {
//         fetchTeams(parseInt(UserInformation.id));
//     }
//     }, [UserInformation.id]);
// */
//         //replace code below with code above when user id is available
//         fetchTeams();
//     }, [UserInformation.id]);

//     useEffect(() => {
//         const fetchTeams = async () => {
//             const challengerID = 1;
//             //const data = FetchTeamByUserId(challengerID);
//             //setchallengerTeamsList(data);
//         };
//         /*  
//         if (UserInformation.id) {
//             fetchTeams(parseInt(UserInformation.id));
//         }
//         }, [UserInformation.id]);
//     */
//         //replace code below with code above when user id is available
//         fetchTeams();
//     }, [UserInformation.id]);


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Select your GameMode</CardTitle>
                <CardDescription>2v2 is available at the next update ! Stay tuned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="gamemode">Game Mode</Label>
                        <Select onValueChange={(value) => setGameMode(value)}>
                            <SelectTrigger id="gamemode">
                                <SelectValue placeholder="1v1" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="1v1">1v1</SelectItem>
                                {/* <SelectItem value="2v2">2v2</SelectItem> */}
                            </SelectContent>
                        </Select>
                        {gameMode === "2v2" ? (
                            <>
                                <Label htmlFor="Ally" className="mt-2">
                                    Your team
                                </Label>
                                <SelectTeam
                                    FetchTeamByUserId={userTeamsList}
                                    onTeamSelect={setAllyTeam}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    {gameMode && (
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="challenger" className="mt-2">
                                    Your challenger
                                </Label>
                                <SelectPlayer
                                    FetchFriendWithUserId={
                                        FetchFriendWithUserId
                                    }
                                    userInformation={UserInformation}
                                    onPlayerSelect={setChallenger}
                                />
                                {gameMode === "2v2" ? (
                                    challenger != "" ? (
                                        <SelectTeam
                                            FetchTeamByUserId={
                                                challengerTeamsList
                                            }
                                            onTeamSelect={setChallengerTeam}
                                        />
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <ScoreSelector
                    ally={ally}
                    ally2={allyTeam?.name ?? "Unknown Team"}
                    challenger={challenger}
                    challenger2={challengerTeam?.name ?? "Unknown Team"}
                    GameMode={gameMode}
                    onScoreSubmit={handleScoreSubmit}
                />
            </CardFooter>
        </Card>
    );
};

export default GameModeSelector;
