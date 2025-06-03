import ScoreTable from "@/components/organisms/ScoreTable";
import {
    FetchSoloMatch,
    FetchTeamMatch,
} from "../../serverAction/fetchMatches";
import React from "react";

const ScorePage = async () => {
    return (
        <div>
            <h1 className="text-4xl text-center mb-10">TOP SCORE</h1>
            <ScoreTable
                FetchSoloMatch={await FetchSoloMatch(1, 10)}
                FetchTeamMatch={await FetchTeamMatch(1, 10)}
            />
        </div>
    );
};

export default ScorePage;
