import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile=()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch("/mypost",{
            headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt") 
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{margin:"18px auto",borderBottom:"1px solid grey"}}>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={state?state.pic:"loading..."}
                    />
                </div>
                <div>
                    <h4>{state? state.name:"loading"}</h4>
                    <h5>{state? state.email:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darkend-1" 
            style={{margin:"10px 0px 10px 70px"}}
            >upload Pic</button>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                             <img className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Profile