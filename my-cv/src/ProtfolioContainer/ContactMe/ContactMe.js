import React, {useEffect, useState} from 'react';
import Typical from "react-typical";
import {toast} from 'react-toastify'
import axios from "axios";
import imgBack from '../../images/mailz.jpeg'
import load1 from '../../images/load2.gif'
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import './ContactMe.css'


const ContactMe = (props) => {
    let  fadeInScreenHandler = (screen) => {
        if(screen.fadeInScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id)
    }
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    const [banner,setBanner] = useState('')
    const [bool,setBool] = useState(false)

    const handleName = (e) => {
      setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try{
            let data = {
                name,
                email,
                message,
            };
            setBool(true)
            const res = await axios.post(`/contact`,data)
            if(name.length === 0 || email.length || message.length){
                setBanner(res.data.msg)
                toast.error(res.data.msg)
                setBool(false)
            }else if(res.status === 200){
                setBanner(res.data.msg)
                toast.success(res.data.msg)
                setBool(false)

                setName("")
                setEmail("")
                setMessage("")
            }
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        return () => {
            /* UNSUBSCRIBE THE SUBSCRIPTIONS */
            fadeInSubscription.unsubscribe();
        };
    }, [fadeInSubscription]);

    return (
        <div className='main-container fade-in' id={props.id || ''}>
            <ScreenHeading subHeading={"Lets keep in touch"} title={"Contact Me"}/>
            <div className='central-form'>
                <div className='col'>
                    <h2 className="title">
                        {" "}
                        <Typical loop={Infinity} steps={["Get In Touch",1000]}/>
                    </h2>
                    <a href="https://www.instagram.com/lyaroviy/">
                        <img
                            className="icon"
                            src="./icon/instagram.png"
                            alt="Log"
                        ></img>
                    </a>
                    <a href="https://t.me/vanlshPetrovich">
                        <img className="icon" src="./icon/telegram.png" alt="Log"></img>
                    </a>
                    <a href="#">
                        <img className="icon" src="./icon/facebook.png" alt="Log"></img>
                    </a>
                </div>
                <div className='back-form'>
                    <div className='img-back'>
                        <h4>Send email here!</h4>
                        <img src={imgBack} alt="image not found"/>
                    </div>
                    <form onSubmit={submitForm}>
                        <p>{banner}</p>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        onChange={handleName}
                        value={name}
                        />

                        <label htmlFor="email">Email</label>
                        <input type="text"
                        onChange={handleEmail} value={email}/>

                        <label htmlFor="message">Message</label>
                        <textarea type="text"
                        onChange={handleMessage} value={message}/>

                        <div className='send-btn'>
                            <button type='submit'>
                                send
                                <i className="fa fa-paper-plane"></i>
                                {bool ?( <b className='load'>
                                    <img src={load1} alt="image not responding"/>
                                </b>) : ('')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactMe;