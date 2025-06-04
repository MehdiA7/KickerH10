import {
    FetchSoloMatchByUserId,
} from "@/app/serverAction/fetchMatches";
import {
    FetchUserByUsername,
} from "@/app/serverAction/fetchUsers";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import SoloGameTable from "@/components/molecules/SoloGameTable";
import React from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
};

const UserProfilePage = async ({ params }: UserProfileProps) => {
    const { username } = await params;
    const user = await FetchUserByUsername(username);
    return (
        <>
            {user ? (
                <>
                    <ProfileOverview FetchUserProfile={user} />
                    <SoloGameTable
                        FetchSoloMatch={await FetchSoloMatchByUserId(
                            user.id,
                            1,
                            5
                        )}
                    />
                </>
            ) : <h1>User not found...</h1>}
        </>
    );
};

export default UserProfilePage;
