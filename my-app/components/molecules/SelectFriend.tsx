"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError } from "react-hook-form";
import { FriendUserList } from "@/lib/types/type";

type SelectFriendProps = {
    onSelectFriend: (id: number) => void;
    data: FriendUserList[];
    value?: number;
    reject?: FieldError;
};

const SelectFriend = ({
    onSelectFriend,
    data,
    value: externalValue,
    reject,
}: SelectFriendProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>();

    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    const handleSelect = (val: number) => {
        setValue(val);
        onSelectFriend(val);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={
                        reject
                            ? "w-64 rounded p-1 justify-between border-red-500"
                            : "w-64 rounded p-1 justify-between"
                    }
                >
                    {value
                        ? data.find((f) => f.friend.id === value)?.friend.username
                        : "Select friend..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No friend found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((f) => (
                                <CommandItem
                                    key={f.id}
                                    value={f.friend.username}
                                    onSelect={() => handleSelect(f.friend.id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === f.friend.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {f.friend.username}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectFriend;
