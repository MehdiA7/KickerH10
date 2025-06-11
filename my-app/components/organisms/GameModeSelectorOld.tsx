"use client";

// NEED TO MAKE A BIG REFACTOR ON THIS COMPONENT WITH REACT HOOK FORM

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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import SelectScore from "../molecules/SelectScore";
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

// Maybe bad type approche
// https://www.flaming.codes/posts/react-fc-vs-function-components-typescript
const GameModeSelectorOld: FC<GameModeSelectorProps> = ({
    FetchFriendWithUserId,
    UserInformation,
}) => {
    const [gameMode, setGameMode] = useState("1v1");
    const [ally, setAlly] = useState(UserInformation.username);
    const [allyScore, setAllyScore] = useState<string>();
    const [allyTeam, setAllyTeam] = useState<Team>();
    const [challenger, setChallenger] = useState("");
    const [challengerScore, setChallengerScore] = useState<string>();
    const [challengerTeam, setChallengerTeam] = useState<Team>();
    const [userTeamsList, setUserTeamsList] = useState<Team[]>([]);
    const [challengerTeamsList, setchallengerTeamsList] = useState<Team[]>([]);
    const handleScoreSubmit = () => {
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

            if(!allyScore || !challengerScore) return <p>PROBLEM NO SCORE</p>;
            const body = {
                player1: ally,
                player2: challenger,
                score1: parseInt(allyScore),
                score2: parseInt(challengerScore),
            };
            console.log(body)
        }
    };

    const handleSubmit = () => {
        console.log(ally, challenger)
    }

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
                <CardDescription>
                    2v2 is available at the next update ! Stay tuned
                </CardDescription>
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
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button type="button">Play !</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Put your score !</DrawerTitle>
                            <DrawerDescription>
                                /!\ This action cannot be undone /!\
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-row justify-center space-x-20">
                            <div className="flex flex-col items-center">
                                <SelectScore
                                    onScore={setAllyScore}
                                    selectPlaceholder={"Score"}
                                />
                                <p className="mt-2">{ally}</p>
                                {gameMode === "2v2" ? (
                                    <>
                                        <p>{allyTeam?.name}</p>
                                    </>
                                ) : null}
                            </div>

                            <div className="flex flex-col items-center">
                                <SelectScore
                                    onScore={setChallengerScore}
                                    selectPlaceholder={"Score"}
                                />
                                {gameMode === "1v1" ? (
                                    <p className="mt-2">{challenger}</p>
                                ) : null}
                                {gameMode === "2v2" ? (
                                    <>
                                        <p className="mt-2">{setChallengerTeam.name}</p>
                                    </>
                                ) : null}
                            </div>
                        </div>

                        <DrawerFooter>
                            <Button onClick={handleScoreSubmit}>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                {/* <ScoreSelector
                    ally={ally}
                    ally2={allyTeam?.name ?? "Unknown Team"}
                    challenger={challenger}
                    challenger2={challengerTeam?.name ?? "Unknown Team"}
                    GameMode={gameMode}
                    onScoreSubmit={handleScoreSubmit}
                /> */}
            </CardFooter>
        </Card>
    );
};

export default GameModeSelectorOld;
