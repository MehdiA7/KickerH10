"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchUserByUsername } from "@/app/serverAction/fetchUsers";

type FilteredUser = {
    id: number;
    username: string;
};

const SearchBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [result, setResult] = useState<FilteredUser[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search.trim()) {
            setResult([]);
            return;
        }
        
        const handler = setTimeout(async () => {
                const userList = await SearchUserByUsername(search);
                if (userList.length > 0) {
                    console.log("a search request is sent");
                    setResult(userList);
                }
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        setShowDropdown(search.trim().length > 0);
    }, [search]);

    return (
        <div className="relative w-70 max-w-md mx-auto">
            <div className="flex flex-col">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search For Friends"
                    className="border-2 rounded p-1 w-full"
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                />

                {showDropdown && result.length > 0 && (
                    <ul className="absolute top-full mt-1 z-10 w-full bg-black border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {result.map((user) => (
                            <li
                                key={user.id}
                                className="px-4 py-2 cursor-pointer bg-white"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <Link
                                    href={{
                                        pathname: `/user/${user.username}`,
                                    }}
                                    onClick={() => setSearch("")}   
                                    className="block w-full px-4 py-2 bg-white hover:bg-[rgb(152,152,152)] cursor-pointer"
                                >
                                    {user.username}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
