"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
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
import { NewSoloGame, newSoloGameSchema } from "@/lib/schema/newGame";
import { FriendUserList } from "@/lib/types/type";
import { CookieUserInformation } from "@/lib/types/authTypes";
import SelectFriend from "../molecules/SelectFriend";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FetchCreateSoloMatch } from "@/app/serverAction/fetchMatches";
import { redirect } from "next/navigation";

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
        watch,
        setValue,
        formState: { },
    } = useForm<NewSoloGame>({
        resolver: zodResolver(newSoloGameSchema),
    });

    const [disableButton, setDisableButton] = useState(false);

    // About setValue or reset https://github.com/orgs/react-hook-form/discussions/7671
    useEffect(() => {
        setValue("player1", UserInformation.id);
    }, [setValue, UserInformation.id])
    const watchedPlayer2 = watch("player2");
    const watchedScore1 = watch("score1");
    const watchedScore2 = watch("score2");

    const [gameMode, setGameMode] = useState("");

    const handleCreateNewGame: SubmitHandler<NewSoloGame> = async (data) => {
        // send data here in api
        setDisableButton(true);

        const response = await FetchCreateSoloMatch(data);
        
        if(!response.success) return setDisableButton(false);

        redirect("/home");
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle> Select your GameMode</CardTitle>
                <CardDescription>
                    2v2 is available at the next update ! Stay tuned
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <Select onValueChange={setGameMode}>
                        <SelectTrigger>
                            <SelectValue placeholder="X" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="1v1">1v1</SelectItem>
                        </SelectContent>
                    </Select>
                    {gameMode && (
                        <p className="flex justify-center mt-4 font-semibold">
                            {UserInformation.username}
                        </p>
                    )}
                </div>
                <form onSubmit={handleSubmit(handleCreateNewGame)}>
                    {gameMode && (
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-4">
                                <p className="flex justify-center font-bold">
                                    VS
                                </p>
                                <div className="flex justify-center">
                                    <Controller
                                        name="player2"
                                        control={control}
                                        render={({ field }) => (
                                            <SelectFriend
                                                data={FetchFriendWithUserId}
                                                onSelectFriend={(value) =>
                                                    field.onChange(value)
                                                }
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="flex justify-center items-center space-x-18">
                                    {watchedPlayer2 && (
                                        <div className="flex flex-col justify-center">
                                            <p className="mb-2">Your score</p>
                                            <Input
                                                className="w-20"
                                                type="number"
                                                max="11"
                                                {...register("score1")}
                                            />
                                        </div>
                                    )}
                                    {watchedScore1 && (
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="mb-2">
                                                Challenger score
                                            </p>
                                            <Input
                                                className="w-20"
                                                type="number"
                                                max="11"
                                                {...register("score2")}
                                            />
                                        </div>
                                    )}
                                </div>
                                {watchedScore2 && (
                                    <div className="flex justify-end">
                                        <Button
                                            className={`w-full ${
                                                disableButton &&
                                                "animate-bounce"
                                            }`}
                                        >
                                            SAVE
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default GameModeSelector;
