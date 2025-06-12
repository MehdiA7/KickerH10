import Image from "next/image";
import React, { FC } from "react";
import footIcon from "@/public/img/footIcon.png";
import { User } from "@/lib/types/type";
import { Progress } from "../ui/progress";

type ProfileOverviewProps = {
    FetchUserProfile: Promise<User> | User;
};

const ProfileOverview: FC<ProfileOverviewProps> = async ({ FetchUserProfile }) => {
    const user = await FetchUserProfile;
    return (
        <div className="flex flex-row items-center mb-10">
            <div className="relative w-30 h-30 overflow-hidden rounded-full mr-15">
                <Image
                    src={footIcon}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="text-xl font-semibold">
                <p>{user.username}</p>
                <p>
                    Solo : {user.wongame}/
                    <span className="text-red-400">{user.lostgame}</span>
                </p>
                <p>
                    Team : {user.wonteamgame}/
                    <span className="text-red-400">{user.lostteamgame}</span>
                </p>
                <p>Level : {user.level}</p>
                <Progress value={user.xp} />
            </div>
        </div>
    );
};

export default ProfileOverview;
