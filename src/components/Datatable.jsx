import { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import Select from 'react-select'
import moment from 'moment'

const Datatable = () => {
    const [posts, setPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [catOpts, setCatOpts] = useState([])
    const [selectedCatOpts, setSelectedCatOpts] = useState(null)
    const [numLoad, setNumLoad] = useState(5)

    useEffect(() => {
        fetch('api/posts')
        .then(res => res.json())
        .then(resJson => {
            setPosts(resJson.posts)
            setAllPosts(resJson.posts)

            //set categories
            let cats = []
            resJson.posts.forEach(post => {
                post.categories.forEach(cat => {
                    cats.push(cat.name)
                });
            })
            cats = [...new Set(cats)]
            cats = cats.map(cat => {
                return { value: cat, label: cat }
            })
            cats.unshift({ value: 'All', label: 'All' })
            setCatOpts(cats)
        })
    }, [])

    useEffect(() => {
        if(selectedCatOpts) {
            if(selectedCatOpts.value == 'All') setPosts(allPosts)
            else {
                setPosts(
                    allPosts.filter(post => {
                        let cats = post.categories.map(cat => cat.name)
                        return cats.includes(selectedCatOpts.value)
                    })  
                )
            }
        }
    }, [selectedCatOpts])

    return ( 
        <div className='mt-4 mb-4'>
            <h3 className='text-center mb-3'>List of Posts</h3>
            <Select options={catOpts} 
                    onChange={(val) => {
                        setSelectedCatOpts(val)
                        setNumLoad(5) //reset back to default
                    }} 
                    placeholder="Select Category"/>


            <div className="table-responsive">
                <table className="table table-bordered table-hover mt-4">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col" style={{ minWidth : '150px' }}>Date</th>
                        <th scope="col">Author</th>
                        <th scope="col">Summary</th>
                        <th scope="col" style={{ minWidth : '250px' }}>Categories</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.slice(0, numLoad).map((post, ind) => (
                        <tr key={post.id}>
                            <th scope="row">{ ind+1 }</th>
                            <td>{ post.title }</td>
                            <td>{ moment(post.publishDate).format('YYYY-MM-DD') }</td>
                            <td>{ post.author.name }</td>
                            <td>{ post.summary }</td>
                            <td> { post.categories.map((cat) => ( 
                                <div key={cat.id}>
                                    <span className="cat-pill">{cat.name}</span>
                                </div>
                            )) } </td>
                            <td><Link className='btn btn-secondary' to={'/post/' + post.id}>View</Link> </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='text-center'>
            {numLoad < posts.length
                ? <button className='btn btn-secondary' onClick={() => setNumLoad(numLoad + 5)}>Load more..</button> 
                : <span>End of result.</span>  
            }
            </div>
        </div>
     );
}
 
export default Datatable;