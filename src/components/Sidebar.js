import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../utils/Firebase'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ControlPointRounded } from '@material-ui/icons';
import SidebarPiece from './SidebarPiece';
import ClassModal from "./ClassModal";
import { Add, ArrowDropUp } from '@material-ui/icons';
import {Modal, Button, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// https://webomnizz.com/create-simple-modal-pop-up-with-react/
const Sidebar = ({ func }) => {

    // this.state= {
    //     showHide: false,
    // }

    // const handleModalShowHide = () => {
    //     this.setState({ showHide: !this.state.showHide })
    // }


    const [showHide, handleModalShowHide] = useState(false)
    const [data, setData] = useState([])
    const [className, setClassName] = useState("")


    useEffect(() => {
        async function dafunc() {
            var arr = []
            const docs = await db.collection("class").get()
            docs.forEach((doc) => {
                arr.push(doc.data().className)
            })
            // topics.docChanges((docSnapshot)=> {
            //     setTopics(old => [...old, docSnapshot.data().topicName])
            // })
            setData(arr)
        }
        dafunc()
        func()

    }, [])

   

    return (
        <div className="bg-black h-screen">
            <div className="bg-black text-glass w-48 overflow-y-scroll">

                <div>

                    <ClassModal name = {className} showHide = {showHide} handleModalShowHide = {handleModalShowHide}/>
                    
                    <div className="h-screen bg-black text-glass w-48">

                        {
                            data.map((name) => {
                                return (
                                    <div key = {name} className="" onClick = {()=>{
                                        setClassName(name)
                                        // handleModalShowHide(!showHide) //LATER FEATURE TO BE ABLE TO CHANGE CLASS NAMES AND TOPIC NAMES
                                    }}>
                                        <SidebarPiece name={name} func={func} />
                                    </div>

                                )
                            })
                        }

                        {/* <div className="h-screen bg-black text-glass w-48">
                SUSSY BAKA
            </div> */}
                        <div className="w-48 h-16 hover:bg-white  animate-fade-in-down hover:text-black transition duration-500 select-none	ease-in-out cursor-pointer border-b-2 border-gray-700">
                            <div className="flex h-full ">
                                <div className="m-auto flex" onClick={() => {
                                    setClassName("")
                                    handleModalShowHide(!showHide)
                                }}>
                                    {/* {
                            !clicked ?
                                <ArrowDropDownIcon />
                                :
                                <ArrowDropUp />
                        } */}
                                    <ControlPointRounded />
                                    <p className="text-lg text-left">Add a Class</p>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>

    )
}

export default Sidebar;
