"use client";
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewGame, newGameSchema } from "@/lib/schema/newGame";
import { FriendUserList } from "@/lib/types/type";
import { CookieUserInformation } from "@/lib/types/authTypes";

type GameModeSelectorProps = {
    FetchFriendWithUserId: FriendUserList[];
    UserInformation: CookieUserInformation;
};

const GameModeSelector = ({
    FetchFriendWithUserId,
    UserInformation,
}: GameModeSelectorProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<NewGame>({
        resolver: zodResolver(newGameSchema),
    });

    const [gameMode, setGameMode] = useState("");

    const handleCreateNewGame: SubmitHandler<NewGame> = async (data) => {
        // send data here in api
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle> Select your GameMode</CardTitle>
                <CardDescription>
                    2v2 is available at the next update ! Stay tuned
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                    <div>
                        <Select onValueChange={setGameMode}>
                            <SelectTrigger>
                                <SelectValue placeholder="X"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="1v1">1v1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                <form>
                    {gameMode && (
                        <p>Your challenger</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default GameModeSelector;
