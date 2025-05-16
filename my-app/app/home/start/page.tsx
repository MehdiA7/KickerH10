import { FetchFriendWithUserId } from "@/app/serverAction/fetchUsers";
import GameModeSelector from "@/components/organisms/GameModeSelector";
import React from "react";
import { cookies } from "next/headers";

const StartPage = async () => {
    const cookieStore = await cookies();

    let id = cookieStore.get("ActualUserId")?.value
    let username = cookieStore.get("ActualUser")?.value

    if (id === undefined || username === undefined){
        id = "";
        username = "";
    }

    const userInformation = {
        id: id,
        username: username
    };

    return (
        <div>
            <h1 className="text-4xl text-center mt-5 mb-10">
                IT&#39;S TIME TO PLAY !
            </h1>
            <div className="flex justify-center">
                <GameModeSelector
                    FetchFriendWithUserId={FetchFriendWithUserId()}
                    UserInformation={userInformation}
                />
            </div>
        </div>
    );
};

export default StartPage;
