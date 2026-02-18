import { useEffect } from "react"
import axios from "axios"
import { CardImage } from "../../components/Card"
import { Link, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

const Posts = () => {

    const getPosts = () => {
        const res = axios.get('https://63ac4406da81ba97617f073c.mockapi.io/devices')
            .then(res => res.data)
        return res
    }

    const query = useQuery({ queryKey: ['devices'], queryFn: getPosts })

    return (
        <>
            <Link to="/">Домой</Link>
            <Link to="/posts/create">Создать пост</Link>
            {query.data?.sort((b, a) => Date.parse(a.created_at) - Date.parse(b.created_at)).map(post => (
                <CardImage key={post.id} post={post} />
            ))}
        </>
    )
}

export default Posts