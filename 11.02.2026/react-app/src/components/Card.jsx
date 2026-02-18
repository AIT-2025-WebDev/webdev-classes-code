
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

export function CardImage({ post, showButton = true }) {
  return (
    <Card className="relative mx-auto max-w-lg pt-0 w-lg">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={post?.images?.[0]?.url_large}
        alt={post?.title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>
        <CardDescription>
          {post?.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {showButton && <Link to={`/posts/${post?.id}`} className="w-full">View Post</Link>}
      </CardFooter>
    </Card>
  )
}
