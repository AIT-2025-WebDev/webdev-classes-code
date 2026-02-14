import axios from 'axios'
    
import { useLocation } from 'react-router-dom'
import { CardImage } from '../../../components/Card'
import { useStore } from '../../../store/store';

const Post = () => {

    const { pathname } = useLocation()
    const id = pathname.split('/')[2]
    const {posts, appendPost} = useStore()

    const data = posts?.find(post => post.id == id)

    const fetchPost = () => {
        axios.get(`https://63ac4406da81ba97617f073c.mockapi.io/devices/${id}`)
        .then(res => appendPost(res.data))
    }

    if (!data) {
        fetchPost()
    }
    
  return (
    <CardImage post={data} showButton={false} />
  )
}

export default Post