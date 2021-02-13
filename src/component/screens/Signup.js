import React,{useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup=()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasswrd] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            uploadField()
        }
    },[url])

    const uploadPic =()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","harshitpandey251")
        fetch("https://api.cloudinary.com/v1_1/harshitpandey251/image/upload",{
        method:"post",
        body:data
        }).then(res=>res.json())
        .then(data=>{
        setUrl(data.url)
        })
        .catch(err=>{
        console.log(err)
        })

    }
    
    const uploadField =()=>{
        fetch("/signup",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData =()=>{
       if(image){
           uploadPic()
       }
       else{
           uploadField()
       }
    }
    return(
        <div className="mycard">
             <div className="card auth-card input-field">
              <h2>Instagram</h2>
              <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
              <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" placeholder="password" value={password} onChange={(e)=>setPasswrd(e.target.value)}/>
              <div className="file-field input-field">
                <div className="btn #64b5f6 blue darkend-1">
                    <span>upload pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
              <button className="btn waves-effect waves-light #64b5f6 blue darkend-1" onClick={()=>PostData()}>SIGNUP</button>
              <h5>
                  <Link to="/signin">Already have account ?</Link>
              </h5>
            </div>
        </div>
    )
}

export default Signup