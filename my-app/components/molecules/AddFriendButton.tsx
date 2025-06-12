'use client';
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FetchCreateNewFriendConnection } from "@/app/serverAction/fetchUsers";
import { redirect } from "next/navigation";

type AddFriendButtonProps = {
    className?: string;
	userId: number;
	friendId: number;
};

const AddFriendButton = ({ className, userId, friendId }: AddFriendButtonProps) => {
	const [disableButton, setDisableButton] = useState(false);

    const handleCreateFriendConnection = async () => {
		setDisableButton(true);
		const body = {
			user: userId,
			friend: friendId
		};
		const response = await FetchCreateNewFriendConnection(body);
		if (!response.success) return setDisableButton(false);
		redirect("/home");
	};

    return <Button className={disableButton ? `${className} disabled animate-bounce` : className} onClick={() => handleCreateFriendConnection()}>Add Friend</Button>;
};

export default AddFriendButton;
