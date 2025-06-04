import { FetchUserByUsername, FetchUserProfile } from "@/app/serverAction/fetchUsers";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import UserProfile from "@/components/page/UserProfile";
import React from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
}

const UserProfilePage = async ({params}: UserProfileProps) => {
    const {username} = await params;
    console.log(username)
    return (
        <>
            <ProfileOverview FetchUserProfile={FetchUserByUsername(username)}/>
        </>
    );
};

export default UserProfilePage;
