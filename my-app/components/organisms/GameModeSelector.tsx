"use client";
import {
    Card,
    CardContent,
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
import { FriendUserList } from "@/lib/types/type";
import ScoreSelector from "./ScoreSelector";
import { CookieUserInformation } from "@/lib/types/authTypes";

type GameModeSelectorProps = {
    FetchFriendWithUserId: FriendUserList[];
    UserInformation: CookieUserInformation;
};

const GameModeSelector: FC<GameModeSelectorProps> = ({
    FetchFriendWithUserId,
    UserInformation,
}) => {
    const [gameMode, setGameMode] = useState("");
    const [ally, setAlly] = useState("");
    const [ally2, setAlly2] = useState("");
    const [challenger1, setChallenger1] = useState("");
    const [challenger2, setChallenger2] = useState("");

    const handleScoreSubmit = (allyScore: string, challengerScore: string) => {
        if (gameMode === "2v2") {
            const player1 = ally.split("");
            const player2 = ally2.split("");
            const player3 = challenger1.split("");
            const player4 = challenger2.split("");
            const team1Name = `${player1[0] + player1[1] + player1[2]}${
                player2[0] + player2[1] + player2[2]
            }`;
            const team2Name = `${player3[0] + player3[1] + player3[2]}${
                player4[0] + player4[1] + player4[2]
            }`;
            const body = {
                team1: team1Name,
                team2: team2Name,
                team1score: allyScore,
                team2scpre: challengerScore,
            };
            console.log("Final score:", body);
        } else {
            const body = {
                player1: ally,
                player2: challenger1,
                score1: allyScore,
                score2: challengerScore
            }
        }
    };

    useEffect(() => {
        setAlly(UserInformation.username);
    }, []);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Select your GameMode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="gamemode">Game Mode</Label>
                        <Select onValueChange={(value) => setGameMode(value)}>
                            <SelectTrigger id="gamemode">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="1v1">1v1</SelectItem>
                                <SelectItem value="2v2">2v2</SelectItem>
                            </SelectContent>
                        </Select>
                        {gameMode === "2v2" ? (
                            <>
                                <Label htmlFor="Ally" className="mt-2">
                                    Your team
                                </Label>
                                <SelectPlayer
                                    FetchFriendWithUserId={
                                        FetchFriendWithUserId
                                    }
                                    onPlayerSelect={setAlly2}
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
                                    onPlayerSelect={setChallenger1}
                                />
                                {gameMode === "2v2" ? (
                                    <SelectPlayer
                                        FetchFriendWithUserId={
                                            FetchFriendWithUserId
                                        }
                                        onPlayerSelect={setChallenger2}
                                    />
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
                    ally2={ally2}
                    challenger={challenger1}
                    challenger2={challenger2}
                    GameMode={gameMode}
                    onScoreSubmit={handleScoreSubmit}
                />
            </CardFooter>
        </Card>
    );
};

export default GameModeSelector;
