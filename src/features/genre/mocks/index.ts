export const genreResponse =
{
  data: [
    {
      id: 'e6528779-8ea6-4d33-9272-52430c288f5f',
      name: 'Venezuela',
      is_active: true,
      deleted_at: null,
      created_at: '2025-10-04T15:22:30',
      updated_at: '2025-10-04T15:22:30',
      categories: [
        {
          id: '193e0fab-2ff0-46b5-8025-b6a63a27883f',
          name: 'DarkSeaGreen',
          description: null,
          is_active: true,
          deleted_at: null,
          created_at: '2025-10-04T15:22:03',
          updated_at: '2025-10-04T15:22:03',
          pivot: {
            genre_id: 'e6528779-8ea6-4d33-9272-52430c288f5f',
            category_id: '193e0fab-2ff0-46b5-8025-b6a63a27883f'
          }
        }
      ]
    },
  ],
  links: {
    first: 'http://localhost:8000/api/genres?page=1',
    last: 'http://localhost:8000/api/genres?page=10',
    prev: null,
    next: 'http://localhost:8000/api/genres?page=2'
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 10,
    path: 'http://localhost:8000/api/genres',
    per_page: 10,
    to: 10,
    total: 100
  }
}
