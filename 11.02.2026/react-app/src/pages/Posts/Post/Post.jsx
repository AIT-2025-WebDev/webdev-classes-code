import axios from 'axios'

import { useLocation } from 'react-router-dom'
import { CardImage } from '../../../components/Card'
import { useStore } from '../../../store/store';
import { useQuery } from '@tanstack/react-query';


const Post = () => {

  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  const { posts, appendPost } = useStore()

  const data = posts?.find(post => post.id == id)
  console.log(data);

  const getPosts = async () => {
    const res = await axios.get(`https://63ac4406da81ba97617f073c.mockapi.io/devices/${id}`)
    appendPost(res.data)
    return res.data
  }

  const { data: queryData, isLoading, isError } = useQuery({
    queryKey: ['devices', id],
    queryFn: getPosts,
    enabled: !data
  })

  const postToShow = data || queryData

  if (isLoading && !postToShow) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading post</div>
  }

  return (
    <>
      {postToShow ? (
        <CardImage post={postToShow} showButton={false} />
      ) : (
        <div>Post not found</div>
      )}
    </>
  )
}

export default Post