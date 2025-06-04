import { FetchSoloMatch, FetchSoloMatchByUserId } from "@/app/serverAction/fetchMatches";
import { FetchUserByUsername, FetchUserProfile } from "@/app/serverAction/fetchUsers";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import SoloGameTable from "@/components/molecules/SoloGameTable";
import UserProfile from "@/components/page/UserProfile";
import React from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
}

const UserProfilePage = async ({params}: UserProfileProps) => {
    const {username} = await params;
    const user = FetchUserByUsername(username);
    console.log(username)
    return (
        <>
            <ProfileOverview FetchUserProfile={user}/>
            <SoloGameTable FetchSoloMatch={await FetchSoloMatchByUserId((await user).id, 1, 5)}/>
        </>
    );
};

export default UserProfilePage;
