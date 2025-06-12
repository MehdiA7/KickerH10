import { FetchSoloMatchByUserId } from "@/app/serverAction/fetchMatches";
import { FetchUserByUsername } from "@/app/serverAction/fetchUsers";
import AddFriendButton from "@/components/molecules/AddFriendButton";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import SoloGameTable from "@/components/molecules/SoloGameTable";
import React from "react";
import { cookies } from "next/headers";

type UserProfileProps = {
    params: Promise<{ username: string }>;
};

const UserProfilePage = async ({ params }: UserProfileProps) => {
    const { username } = await params;
    const user = await FetchUserByUsername(username);
    const cookieStore = await cookies();
    const stringId = cookieStore.get("UserId")?.value || "";
    const numberId = parseInt(stringId);
    return (
        <>
            {user ? (
                <div className="flex flex-col justify-items-center">
                    <div className="flex justify-center">
                        <ProfileOverview FetchUserProfile={user} />
                    </div>
                    <div className="flex justify-center mb-4">
                        <AddFriendButton className="w-88" userId={numberId} friendId={user.id}/>
                    </div>
                    <SoloGameTable
                        FetchSoloMatch={await FetchSoloMatchByUserId(
                            user.id,
                            1,
                            5
                        )}
                    />
                </div>
            ) : (
                <h1>User not found...</h1>
            )}
        </>
    );
};

export default UserProfilePage;
