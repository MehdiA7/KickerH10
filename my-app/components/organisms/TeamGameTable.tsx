"use client";
import React, { FC } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TeamMatch } from "@/lib/types/type";

type TeamGameTableProps = {
    FetchTeamMatch: TeamMatch[];
};

const TeamGameTable: FC<TeamGameTableProps> = ({ FetchTeamMatch }) => {
    const teamMatch = FetchTeamMatch;

    return (
        <>
            <Table className="w-88 m-auto ">
                <TableCaption>⚽ Your recent solo Matches ⚽</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[100px]">Match</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teamMatch &&
                        teamMatch.map((match) => (
                            <TableRow key={match.id}>
                                <TableCell>
                                    <span
                                        className={
                                            match.team1.id === match.winner
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.team1.name}
                                    </span>
                                    <span>{" VS "}</span>
                                    <span
                                        className={
                                            match.team2.id === match.winner
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.team2.name}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span
                                        className={
                                            match.team1.id === match.winner
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.score1}
                                    </span>
                                    <span>{" / "}</span>
                                    <span
                                        className={
                                            match.team2.id === match.winner
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.score2}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    {match.createdat.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default TeamGameTable;
