import { useState } from 'react';
import { useGetCastMembersQuery } from './castMembersSlice';

export default function CastMemberList() {
    const [page,setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const options = {page, perPage, search};
    const {data, isFetching, error} = useGetCastMembersQuery(options);
    console.log(data?.data)
  return (
    <div>data.data</div>
  )
}
