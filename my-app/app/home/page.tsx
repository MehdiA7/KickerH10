import ProfileOverview from "@/components/molecules/ProfileOverview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FetchUserProfile } from "../serverAction/fetchUsers";
import SearchBar from "@/components/molecules/SearchBar";
import { cookies } from "next/headers";
import { FetchSoloMatchByUserId } from "../serverAction/fetchMatches";
import SoloGameTable from "@/components/molecules/SoloGameTable";
import { redirect } from "next/navigation";

const HomePage = async () => {
    const cookieStore = await cookies();
    const stringId = cookieStore.get("UserId")?.value;

    if (!stringId || stringId.trim() === "" || isNaN(Number(stringId))) {
        redirect("/");
    }

    const id = parseInt(stringId);

    return (
        <>
            <div className="flex flex-col items-center mb-2">
                <SearchBar />
            </div>
            <div className="flex flex-col items-center">
                <ProfileOverview FetchUserProfile={FetchUserProfile(id)} />
            </div>
            <article>
                <SoloGameTable
                    FetchSoloMatch={await FetchSoloMatchByUserId(id, 1, 5)}
                />
            </article>
            <div className="flex justify-center space-x-45 w-sm fixed bottom-5">
                <Button className="h-15 mb-5" size={"lg"} asChild>
                    <Link href={"/home/score"}>SCORE</Link>
                </Button>
                <Button className="h-15 mb-5" size={"lg"} asChild>
                    <Link href={"/home/start"}>PLAY</Link>
                </Button>
            </div>
        </>
    );
};

export default HomePage;
