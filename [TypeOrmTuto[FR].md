Bienvenu dans ma cheat sheet !

# Comment faire de la pagination ?

Sur TypeORM la pagination est assez simple a mettre en place avec un peut de logique.

```tsx
async getTeamGame(page: number): Promise<PagingGameFormat<TeamGame[]>> {
    const limit: number = 10; // Nombre max de page
    const offset: number = (page - 1) * limit; // Le nombre d'élément que l'on passe a chaque changement de page

		// total est le nombre d'élément dans la table qui a été trouvé
    const [allTeamGame, total] = await this.teamGameRepository.findAndCount(
        {
            take: limit, // Dire le nombre de résultat que l'on veut
            skip: offset, // Combien d'élément on veut sauter
            relations: ["team1", "team2"],
            select: {
                id: true,
                score1: true,
                score2: true,
                team1: { id: true, name: true },
                team2: { id: true, name: true },
                createdat: true,
            },
        }
    );
		
    const totalPages = Math.ceil(total / limit); // Division + arrondir au plus haut pour trouver le nombre max de page

		// Formater la réponse pour une utilisation simple
    const formatResponse = {
        content: allTeamGame,
        currentPage: page,
        totalPage: totalPages,
    };

    return formatResponse;
}
```