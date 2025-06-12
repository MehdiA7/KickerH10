import { z } from "zod";

export const newSoloGameSchema = z.object({
    player1: z.number().min(1),
    player2: z.number().min(1),
    score1: z.coerce.number().max(11),
    score2: z.coerce.number().max(11)
});

export type NewSoloGame = z.infer<typeof newSoloGameSchema>;
