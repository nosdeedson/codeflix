import { Genre, GenrePayload } from "../../types/Genre"

export const mapToGenrePayload = (genre: Genre) => {
    console.log(genre)
    return {
        id: genre.id,
        name: genre.name,
        categories_id: genre.categories?.map((it) => it.id)
    } as GenrePayload;
}