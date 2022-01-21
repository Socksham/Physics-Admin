import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import MainContent from './components/MainContent';
import { db } from './utils/Firebase';
import MainScreen from './components/MainScreen'
import LoginScreen from './auth/LoginScreen'
import RegisterScreen from './auth/RegisterScreen'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import PublicRoute from './components/PublicRoute'
// import PrivateRoute from './components/PrivateRoute';

function App() {
    const [className, setClassName] = useState("")
    const [topicName, setTopicName] = useState("")

    const [daysData, setDaysData] = useState([])
    const [homework, setHomework] = useState([])
    const [extras, setExtras] = useState([])
    const [gotData, setGotData] = useState(false)
    const [gotTopics, setTopics] = useState(false)

    const [dayIds, setDayIds] = useState([])

    function changeClass(daTopic, daClass) {
        setClassName(daClass)
        setTopicName(daTopic)

        console.log(daClass)
        console.log(daTopic)
        setDaysData([])
        setDayIds([])
        getDays(daTopic, daClass)
    }

    async function getDays(daTopic, daClass){
        console.log("GOT CALLED")
        console.log(daTopic)

        setTopics(false)

        const ref = db.collection("class").doc(daClass).collection("topics").doc(daTopic).collection("days")

        ref.onSnapshot(async (snapshot) => {
            snapshot.docs.forEach(async (doc) => {
                var arr = []
            var extrasArr = []

            console.log(arr)

            // var homeworkBlah = await ref.doc((i + 1).toString()).collection("homework").get()

            // var extrasBlah = await ref.doc((i + 1).toString()).collection("extras").get()
            // var homeworkBlah = await doc.collection("homework").get()

            // var extrasBlah = await doc.collection("extras").get()

            var homeworkBlah = await ref.doc(doc.id).collection("homework").get()

            var extrasBlah = await ref.doc(doc.id).collection("extras").get()

            // dayIds.push(doc.id)
            setDayIds(dayIds => [...dayIds, doc.id])

            homeworkBlah.docs.forEach((doc) => {
                console.log(doc.data())
                arr.push(doc.data())
                console.log(arr)
            })

            extrasBlah.docs.forEach((doc) => {
                extrasArr.push(doc.data())
            })




            totalHWArr.push(arr)
            totalExtrasArr.push(extrasArr)
            console.log("ARRAYS")
            console.log(totalHWArr)

            // totalExtrasArr.push([1, 2])

            // console.log(totalHWArr, totalExtrasArr)

            setDaysData(old => [...old, doc.data()])
            })
        })

        var totalHWArr = []
        var totalExtrasArr = []

        // var days = await ref.get().then(function(col) {
        //     col.forEach(function(doc) {
        //         alert(doc.id)
        //     })
        // })
        // days.docs.forEach(async (doc, i) => {

        //     var arr = []
        //     var extrasArr = []

        //     console.log(arr)

        //     // var homeworkBlah = await ref.doc((i + 1).toString()).collection("homework").get()

        //     // var extrasBlah = await ref.doc((i + 1).toString()).collection("extras").get()
        //     // var homeworkBlah = await doc.collection("homework").get()

        //     // var extrasBlah = await doc.collection("extras").get()

        //     var homeworkBlah = await ref.doc(doc.id).collection("homework").get()

        //     var extrasBlah = await ref.doc(doc.id).collection("extras").get()

        //     // dayIds.push(doc.id)
        //     setDayIds(dayIds => [...dayIds, doc.id])

        //     homeworkBlah.docs.forEach((doc) => {
        //         console.log(doc.data())
        //         arr.push(doc.data())
        //         console.log(arr)
        //     })

        //     extrasBlah.docs.forEach((doc) => {
        //         extrasArr.push(doc.data())
        //     })




        //     totalHWArr.push(arr)
        //     totalExtrasArr.push(extrasArr)
        //     console.log("ARRAYS")
        //     console.log(totalHWArr)

        //     // totalExtrasArr.push([1, 2])

        //     // console.log(totalHWArr, totalExtrasArr)

        //     setDaysData(old => [...old, doc.data()])


        // })

        setHomework(totalHWArr)
        setExtras(totalExtrasArr)

        setTopics(true)

        setGotData(true)

    }

    return (

        
        <BrowserRouter>
            <Switch>
                {/* <PrivateRoute exact path="/" component={MainScreen} />
                <PublicRoute exact path="/login" restricted={true} component={LoginScreen} /> */}
                <Route exact path="/home" component={MainScreen} />
                <Route exact path="/" restricted={true} component={LoginScreen} />
                <Route exact path="/register" component={RegisterScreen} />
            </Switch>
      </BrowserRouter>
    );
}

export default App;
