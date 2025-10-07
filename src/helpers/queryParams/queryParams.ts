
export function parseQueryParams<T extends Record<string, any>>(params: T): string{
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if(value !== undefined && value !== null){
            if(key === 'perPage'){
                query.append('per_page', value.toString())
            } else {
                query.append(key, value.toString())
            }
        }
    });
    return query.toString();
}