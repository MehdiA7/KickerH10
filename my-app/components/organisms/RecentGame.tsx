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
import { ApiResponseFormat, SoloMatch } from "@/lib/types/type";

type RecentGameProps = {
    FetchSoloMatchByUserId: ApiResponseFormat<SoloMatch[]>;
};

const RecentGame: FC<RecentGameProps> = ({ FetchSoloMatchByUserId }) => {
    const RecentMatch = FetchSoloMatchByUserId;

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
                    {RecentMatch.content &&
                        RecentMatch.content.map((match) => (
                            <TableRow key={match.id}>
                                <TableCell>
                                    <span
                                        className={
                                            match.player1.id === match.winner.id
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.player1.username}
                                    </span>
                                    <span>{" VS "}</span>
                                    <span
                                        className={
                                            match.player2.id === match.winner.id
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.player2.username}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span
                                        className={
                                            match.player1.id === match.winner.id
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.score1}
                                    </span>
                                    <span>{" / "}</span>
                                    <span
                                        className={
                                            match.player2.id === match.winner.id
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {match.score2}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    {match.createdat}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RecentGame;
