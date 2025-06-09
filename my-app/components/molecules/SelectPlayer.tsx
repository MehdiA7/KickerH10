"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CookieUserInformation } from "@/lib/types/authTypes";
import { FriendUserList } from "@/lib/types/type";
import { useState, FC } from "react";

type SelectPlayerProps = {
    FetchFriendWithUserId: FriendUserList[];
    userInformation: CookieUserInformation;
    onPlayerSelect: (name: string) => void;
}

const SelectPlayer: FC<SelectPlayerProps> = ({ 
    FetchFriendWithUserId,
    userInformation,
    onPlayerSelect}) => {

    const [player, setPlayer] = useState("");
    const [open, setOpen] = useState(false);
    const friends = FetchFriendWithUserId;

    const handleSelect = (name: string) => {
        setPlayer(name);
        onPlayerSelect(name);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{player ? player : "Select player"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                { friends && (
                    friends.map((f) => (
                        <DropdownMenuItem 
                            key={f.id} 
                            className="hover:bg-gray-50" 
                            onClick={() => handleSelect(f.friend.id === userInformation.id ? f.user.username : f.friend.username)}
                        >
                            {f.friend.id === userInformation.id ? f.user.username : f.friend.username}
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SelectPlayer;
