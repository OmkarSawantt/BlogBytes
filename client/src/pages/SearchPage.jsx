import React,{ useState ,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import PostItem from '../components/PostItem'
const SearchPage = () => {
    const location=useLocation();
    const searchTerm=location.state;
    const[posts,setPosts]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
      const fetchPosts=async()=>{
        setIsLoading(true);
        const searchData=new FormData();
        searchData.set('text',searchTerm)
        try {
          const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/search`,searchData)
          setPosts(response?.data)
        } catch (err) {
          console.log(err)
        }
  
        setIsLoading(false)
      }
      fetchPosts();
    },[searchTerm])
    if(isLoading){
      return <Loader/>
    }
  return (
    <section className="posts">
      {posts.length>0 ? <div className="container posts__container">
      {
        posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt} />)
      }
      </div>:<h2 className='center'>No Post Found</h2>}
      
    </section>
  )
}

export default SearchPage
