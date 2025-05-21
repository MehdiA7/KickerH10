"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Team } from "@/lib/types/type";
import { useState, FC } from "react";

type SelectTeamProps = {
    FetchTeamByUserId: Team[];
    onTeamSelect: (team: Team) => void;
};

const SelectTeam: FC<SelectTeamProps> = ({ 
    FetchTeamByUserId: FetchTeamByUserId,
    onTeamSelect: onTeamSelect}) => {

    const [team, setTeam] = useState("");
    const [open, setOpen] = useState(false);
    const UserTeam = FetchTeamByUserId;

    const handleSelect = (team: Team) => {
        setTeam(team.name);
        onTeamSelect(team);
        setOpen(false);
    };



    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{team ? team : "Select team"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                { UserTeam && (
                    UserTeam.map((f) => (
                        <DropdownMenuLabel 
                            key={f.name} 
                            className="hover:bg-gray-50" 
                            onClick={() => handleSelect(f)}
                        >
                            {f.name}
                        </DropdownMenuLabel>

                        
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SelectTeam;
