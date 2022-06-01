import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment'

const PostDetail = () => {
    const params = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch('/api/posts')
        .then(res => res.json())
        .then(resJson => setPost(resJson.posts.find(p => p.id ==  params.postid)))
    }, [])

    return ( 
        <div className='mt-4 mb-4'>
            <div>
                <Link to="/">Back</Link>
            </div>
            {post ? 
                <div className="mt-3 text-center">
                    <h3>{ post.title }</h3>
                    <p>{ post.summary }</p>
                    <p className="text-muted">Author: { post.author.name } | Published At : { moment(post.publishDate).format('YYYY-MM-DD') }</p>
                    <div>
                    { post.categories.map((cat) => ( 
                        <span key={cat.id} className="cat-pill me-3">{cat.name}</span>
                    )) }
                    </div>
                </div> 
            : ''}
        </div>
     );
}
 
export default PostDetail;