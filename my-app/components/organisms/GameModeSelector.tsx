import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const GameModeSelector = () => {
  return (
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle> Select your GameMode</CardTitle>
            <CardDescription>
                2v2 is available at the next update ! Stay tuned
            </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>

        </CardContent>
    </Card>
  )
}

export default GameModeSelector