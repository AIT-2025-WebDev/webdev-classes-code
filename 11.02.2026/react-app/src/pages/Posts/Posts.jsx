import { useEffect } from "react"
import axios from "axios"
import { CardImage } from "../../components/Card"
import { Outlet } from "react-router-dom"
import { useStore } from "../../store/store"

const Posts = () => {

    const { posts, setPosts } = useStore()

    useEffect(() => {
        axios.get('https://63ac4406da81ba97617f073c.mockapi.io/devices')
            .then(res => setPosts(res.data))
    }, [setPosts])



    return (
        <>
            {posts.map(post => (
                <CardImage key={post.id} post={post} />
            ))}
        </>
    )
}

export default Posts