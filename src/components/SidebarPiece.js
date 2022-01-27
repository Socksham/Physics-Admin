import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Add, ArrowDropUp } from '@material-ui/icons'
import { ArrowRight, ArrowDropDown, ControlPointRounded } from '@material-ui/icons/'
// import { Add } from "@mui/icons-material/";
import { db } from '../utils/Firebase';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopicModal from "./TopicModal"

const SidebarPiece = ({ name, func }) => {

    const [showHide, handleModalShowHide] = useState(false)
    const [topics, setTopics] = useState([])
    const [clicked, setClicked] = useState(false)
    const [topicName, setTopicName] = useState("")

    useEffect(() => {
        topicHandler()

        // func()

    }, [])

    const topicHandler = async () => {
        await db.collection("class").doc(name).collection("topics").orderBy('timestamp', 'asc').get().then((snapshot) => {
            let arr = []
            snapshot.docs.forEach(doc => {
                arr.push(doc.data().topicName)
            })
        setTopics(arr)

        })
    }

    return (
        <div>


            <TopicModal name="" className={name} showHide={showHide} handleModalShowHide={handleModalShowHide} tHandler={topicHandler}/>

            <div className="w-48 h-16 hover:bg-white  animate-fade-in-down hover:text-black transition duration-500 select-none	ease-in-out cursor-pointer border-b-2 border-gray-700">
                <div className="flex h-full ">
                    <div className="m-auto flex" onClick={() => {
                        setClicked(!clicked)
                    }}>
                        {
                            !clicked ?
                                <ArrowRight />
                                :
                                <ArrowDropDown />
                        }
                        <p className="text-lg text-left">{name}</p>
                    </div>

                </div>
            </div>
            <div className="bg-black text-glass w-48">
                {
                    clicked &&
                    <div className="animate-fade-in-down cursor-pointer ">
                        {
                            topics.map(topic => {
                                return (
                                    <div key={topic} className="flex w-48 h-12 transition duration-500 select-none ease-in-out hover:bg-white hover:text-black focus:bg-white focus:text-black border-b-2 border-gray-700">
                                        <div className="m-auto" onClick={() => {
                                            setTopicName(topic)
                                            func(topic, name)
                                        }}>
                                            <p>{topic}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="flex h-full w-48 h-40 border-b-2 border-gray-700 content-center">
                            <Add />
                            </div> */}
                        <div className="flex h-full w-48 h-12 hover:bg-white animate-fade-in-down hover:text-black transition duration-500 select-none ease-in-out cursor-pointer border-b-2 border-gray-700">
                            {/* <div className="m-auto content-center"> */}
                            <div className="m-auto content-center">
                                <div className="m-auto flex" onClick={() => {
                                    setTopicName("")
                                    handleModalShowHide(!showHide)

                                }}>

                                    <ControlPointRounded />
                                    {/* <p className="h-full text-xs">Add Unit</p> */}

                                </div>

                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>

    )
}

export default SidebarPiece
