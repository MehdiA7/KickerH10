"use client";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FetchRecentUserMatch, FetchUserProfile, FetchAddNewFriend, FetchUserProfileByName,FetchFriendWithUserId,FetchRemoveFriend } from "../../serverAction/fetchUsers";
import RecentGame from "@/components/organisms/SoloGameTable";
import SearchBar from "@/components/molecules/SearchBar";
import { useParams } from "next/navigation";


const UserPage = () => {
    const params = useParams();
    const username  = params.username;
    const [isFirend, setIsFirend] = useState<boolean>();
    let idFriend = 0; // maybe get it from FetchUserProfileByName ?
    let idUser = 1; // get user id in jwt

    function handleFriend(idUser : number, idFriend : number){
        if(isFirend == false){
            FetchAddNewFriend(idUser, idFriend)
            setIsFirend(true)
        }
        if(isFirend == true){
            FetchRemoveFriend(idUser, idFriend)
            setIsFirend(false)
        }
    }


    // check if friend
    useEffect(() => {
    const friendInfo =  FetchFriendWithUserId(idFriend)
    if (friendInfo.length > 0){
        setIsFirend(true)
    }else{
         setIsFirend(false)
    }
    
    }, [idUser])
    //chack if they are friend and change button apparence 
    if(username === undefined){
        return( 
            <div>Loading</div>
        )
    }


    if (typeof username !== 'string') {
    return <div>Invalid username</div>;
    }

    if(isFirend == undefined){
        return(
        <div className="flex justify-center items-center"> Loading </div>
    )}

    return (
    <>  
        {username && (
        <>
            <div className="flex flex-col items-center mb-2">
                <SearchBar />
            </div>
            <div className="flex flex-col items-center">
            {/* <div>{username}</div> */}
                <ProfileOverview FetchUserProfile={FetchUserProfileByName(username)} />
            </div>
            <article>
                <RecentGame FetchRecentUserMatch={FetchRecentUserMatch(idFriend)} />
            </article>
            <div className="flex w-full justify-center">
                {isFirend ? (
                    <Button className="h-15 mb-5" size="lg" onClick={() => handleFriend(idUser, idFriend)}>
                    Remove friend
                    </Button>
                ):(
                    <Button className="h-15 mb-5" size="lg" onClick={() => handleFriend(idUser, idFriend)}>
                    Add friend
                    </Button>
                )}
                
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
        )}
    </>
);

};

export default UserPage;
