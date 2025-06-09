import { FetchFriendWithUserId } from "@/app/serverAction/fetchUsers";
import GameModeSelector from "@/components/organisms/GameModeSelector";
import React from "react";
import { cookies } from "next/headers";

const StartPage = async () => {
    const cookieStore = await cookies();

    let id = cookieStore.get("UserId")?.value
    let username = cookieStore.get("Username")?.value

    if (id === undefined || username === undefined){
        id = "";
        username = "";
    }

// check if player is not playing against himself

    const userInformation = {
        id: parseInt(id),
        username: username
    };

    return (
        <div>
            <h1 className="text-4xl text-center mt-5 mb-10">
                IT&#39;S TIME TO PLAY !
            </h1>
            <div className="flex justify-center">
                <GameModeSelector
                    FetchFriendWithUserId={await FetchFriendWithUserId(userInformation.id, 1,5)}
                    UserInformation={userInformation}
                />
            </div>
        </div>
    );
};

export default StartPage;
