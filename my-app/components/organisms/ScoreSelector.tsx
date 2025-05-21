"use client";
import React, { FC, useState } from "react";
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

type ScoreSelectorProps = {
    ally: string;
    ally2: string;
    challenger: string;
    challenger2: string;
    GameMode: string;
    onScoreSubmit: (allyScore: string, challengerScore: string) => void;
};

const ScoreSelector: FC<ScoreSelectorProps> = ({
    ally,
    ally2,
    challenger,
    challenger2,
    GameMode,
    onScoreSubmit
}) => {
    const [allyScore, setAllyScore] = useState("");
    const [challengerScore, setChallengerScore] = useState("");

    // Gestion des scores localement
    const handleSubmit = () => {
        onScoreSubmit(allyScore, challengerScore);
    };

    return (
        <Drawer>
            <DrawerTrigger>
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
                        {GameMode === "2v2" ? (
                            <>
                                <p>{ally2}</p>
                            </>
                        ) : null}
                    </div>

                    <div className="flex flex-col items-center">
                        <SelectScore
                            onScore={setChallengerScore}
                            selectPlaceholder={"Score"}
                        />
                        {GameMode === "1v1" ? (
                        <p className="mt-2">{challenger}</p>) 
                        : null}
                        {GameMode === "2v2" ? (
                            <>
                                <p  className="mt-2">{challenger2}</p>
                            </>
                        ) : null}
                    </div>
                </div>

                <DrawerFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ScoreSelector;
