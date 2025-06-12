'use client';
import React from "react";
import { Button } from "../ui/button";

type AddFriendButtonProps = {
    className?: string;
	userId: number;
	friendId: number;
};

const AddFriendButton = async ({ className, userId, friendId }: AddFriendButtonProps) => {

    const handleCreateFriendConnection = () => {
		const body = {
			user: userId,
			friend: friendId
		};
		
	};

    return <Button className={className} onClick={() => handleCreateFriendConnection()}>Add Friend</Button>;
};

export default AddFriendButton;
