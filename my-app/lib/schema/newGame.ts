import { z } from "zod";

export const newGameSchema = z.object({
    player1: z.number().min(1),
    player2: z.number().min(1),
    score1: z.number(),
    score2: z.number()
});

export type NewGame = z.infer<typeof newGameSchema>;
