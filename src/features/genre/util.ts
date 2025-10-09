import { Genre, GenrePayload } from "../../types/Genre"
import { Video, VideoPayload } from "../../types/Video";

export const mapToGenrePayload = (genre: Genre) => {
    return {
        id: genre.id,
        name: genre.name,
        categories_id: genre.categories?.map((it) => it.id)
    } as GenrePayload;
}

export const mapToVideoPayload = (video: Video) => {
    return {
        id: video.id,
        title: video.title,
        rating: video.rating,
        opened: video.opened,
        duration: Number(video.duration),
        description: video.description,
        genres_id: video?.genres?.map(it => it.id),
        year_launched: video.year_launched,
        categories_id: video?.categories?.map(it => it.id),
        cast_members_id: video?.cast_members?.map(it => it.id)
    } as unknown as VideoPayload;
}