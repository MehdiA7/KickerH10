"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    FetchCreateNewFriendConnection,
    FetchIfIsFriend,
} from "@/app/serverAction/fetchUsers";
import { redirect } from "next/navigation";

type AddFriendButtonProps = {
    className?: string;
    userId: number;
    friendId: number;
};

const AddFriendButton = ({
    className,
    userId,
    friendId,
}: AddFriendButtonProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFriend, setIsFriend] = useState<boolean>();
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        const isFriend = async () => {
            const response = await FetchIfIsFriend(userId, friendId);
            if (response.success || response.content) {
                setIsFriend(Boolean(response.content));
                setIsLoading(false);
            }
        };
        isFriend();
    }, [userId, friendId]);

    const handleCreateFriendConnection = async () => {
        setDisableButton(true);
        const body = {
            user: userId,
            friend: friendId,
        };
        const response = await FetchCreateNewFriendConnection(body);
        if (!response.success) return setDisableButton(false);
        redirect("/home");
    };

    return (
        <>
            {isLoading ? (
                <Button className={`${className} disabled`}>
                    is Loading...
                </Button>
            ) : isFriend ? (
                <Button
                    className={`${className} disabled bg-white border-2 text-black`}
                >
                    You are Friend
                </Button>
            ) : (
                <Button
                    className={
                        disableButton
                            ? `${className} disabled animate-bounce`
                            : className
                    }
                    onClick={() => handleCreateFriendConnection()}
                >
                    Add Friend
                </Button>
            )}
        </>
    );
};

export default AddFriendButton;
