"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { SoloMatch, TeamMatch } from "@/lib/types/type";
import SoloGameTable from "./SoloGameTable";
import TeamGameTable from "./TeamGameTable";

type ScoreTableProps = {
    FetchSoloMatch: SoloMatch[];
    FetchTeamMatch: TeamMatch[];
};

const ScoreTable: FC<ScoreTableProps> = ({
    FetchSoloMatch,
    FetchTeamMatch,
}) => {
    const [matchType, setMatchType] = useState<string>("");

    const handleSoloGame = () => {
        setMatchType("SOLO");
    };

    const handleTeamGame = () => {
        setMatchType("TEAM");
    };

    return (
        <>
            <div className="flex justify-center space-x-50 z-50 fixed bottom-10">
                <Button onClick={handleSoloGame} size={"lg"}>
                    SOLO
                </Button>
                <Button onClick={handleTeamGame} size={"lg"}>
                    TEAM
                </Button>
            </div>
            { matchType === "SOLO" ? 
            <SoloGameTable FetchSoloMatch={FetchSoloMatch} />
        :
        <TeamGameTable FetchTeamMatch={FetchTeamMatch}/>}
        </>
    );
};

export default ScoreTable;
