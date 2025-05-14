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
    challenger: string;
}

const ScoreSelector: FC<ScoreSelectorProps> = ( { ally, challenger } ) => {
    const [allyScore, setAllyScore] = useState("");
    const [challengerScore, setChallengerScore] = useState("");

    return (
        <Drawer>
            <DrawerTrigger>Play !</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Put your score !</DrawerTitle>
                    <DrawerDescription>
                        /!\ This action cannot be undone /!\
                    </DrawerDescription>
                </DrawerHeader>
                
                {/* Old method */}
                {/* <div className="flex flex-row justify-center">
                    <p className="mt-1 mr-3" >Mehdi</p>
                    <Input type="number" className="w-20 mr-8" />
                    <p className="mr-3">Hugo</p>
                    <Input type="number" className="w-20" />
                </div> */}

                <div className="flex flex-row justify-center space-x-20">
                    <SelectScore onScore={setAllyScore} selectPlaceholder={ally}/>
                    <SelectScore onScore={setChallengerScore} selectPlaceholder={challenger}/>
                </div>

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ScoreSelector;
