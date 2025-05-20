"use client";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FetchRecentUserMatch, FetchUserProfile, FetchAddNewFriend } from "../../serverAction/fetchUsers";
import RecentGame from "@/components/organisms/RecentGame";
import SearchBar from "@/components/molecules/SearchBar";
import { useParams } from "next/navigation";
import { useRouter } from 'next/router';


const UserPage = () => {
    const params = useParams();
    const username  = params.username;

    console.log(username)

    let idFriend = 0;
    let idUser = 1; // get user id in jwt

    return (
        <>  
        
            <div className="flex flex-col items-center mb-2">
                <SearchBar />
            </div>
            <div className="flex flex-col items-center">
                <div>{username}</div>
                <ProfileOverview FetchUserProfile={FetchUserProfile(idFriend)} />
            </div>
            <article>
                <RecentGame FetchRecentUserMatch={FetchRecentUserMatch(idFriend)} />
            </article>
            <div className="flex w-full justify-center">
                <Button className="h-15 mb-5" size="lg" onClick={() => FetchAddNewFriend(idUser, idFriend)}>
                    Add friend
                </Button>
            </div>
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

export default UserPage;
