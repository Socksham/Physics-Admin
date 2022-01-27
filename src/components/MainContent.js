import React, { useEffect, useState } from 'react'
import { db } from '../utils/Firebase'
import DayCard from './DayCard'
import DayCardLoader from './DayCardLoader'
import NewDayCard from './NewDayCard'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { unmountComponentAtNode } from 'react-dom'
import App from '../App'

const MainContent = ({ days, dayIds, gotData, homework, extras, className, topicName, func }) => {


  const [showHide, handleModalShowHide] = useState(false)
  const [showPrefHide, handleShowPrefHide] = useState(false)

  const [currKey, setCurrKey] = useState("None")
  const [hwList, setHwList] = useState([])
  const [extList, setExtList] = useState([])

  const [dayName, setDayName] = useState("")
  const [dayNum, setDayNum] = useState("")




  async function showModal(val) {
    // alert(val)
    setCurrKey(val)

    setHwList([])
    setExtList([])

    setDayName("")
    setDayNum("")
    // setTimeout(async function setLists() {
    if (val === "None") {
      setHwList([])
      setExtList([])
    } else {
      // alert(val)
      var ref = db.collection("class").doc(className).collection("topics").doc(topicName).collection("days").doc(val);

      await ref.get().then((doc) => {
        // document.getElementById("dayName").value = doc.dayName
        // document.getElementById("dayNum").value = doc.dayNum
        // alert(doc.data().dayName + " , " + doc.data().dayNum)
        setDayName(doc.data().dayName)
        setDayNum(doc.data().dayNum)
        // alert(dayName + " , " + dayNum)
      })

      //homework
      await ref.collection("homework").get().then(
        col => {
          if (col.docs.length > 0) {
            col.docs.forEach((doc) => {
              setHwList(hwList => [...hwList, doc.data()])
              // setTimeout(()=>{
              //   // alert(hwList[0].name)
              //   // alert(hwList[0].link)
              //   console.log(currKey)
              //   handleModalShowHide(!showHide)})
            })
          }
        })
      //extra
      await ref.collection("extras").get().then(
        col => {
          if (col.docs.length > 0) {
            col.docs.forEach((doc) => {
              setExtList(extList => [...extList, doc.data()])
              // setTimeout(()=>{
              //   // alert(hwList[0].name)
              //   // alert(hwList[0].link)
              //   console.log(currKey)
              //   handleModalShowHide(!showHide)})
            })
          }
        })
    }

    console.log(currKey)
    handleModalShowHide(!showHide)
    // }, 10)
  }

  return (
    <div>

      {/* <DayModal showHide = {showHide} handleModalShowHide = {handleModalShowHide} className = {className} topicName = {topicName}  key = {currKey} /> */}
      <Modal show={showHide} >
        <Modal.Header closeButton onClick={() => handleModalShowHide(!showHide)}>
          <Modal.Title>{(currKey==="None")? "Create New Day": "Update Day"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="mb-3 pt-0">
            <input id="dayNum" type="text" defaultValue={dayNum} placeholder="Day Number" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>
          <div className="mb-3 pt-0">
            <input id="dayName" type="text" defaultValue={dayName} placeholder="Day Name" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>

          <div className="items-center">
            <div className="mt-2 mb-2 w-full h-px bg-gray-300" />

            <p className="text-md font-semibold">Homework</p>

            {
              hwList.map((doc, i) => {
                return (
                  <div key = {i} id={"hw" + i}>
                    <input id={"hwName" + i} type="text" placeholder="HW Name" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" defaultValue={doc.name} />
                    <input id={"hwLink" + i} type="text" placeholder="HW Link" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" defaultValue={doc.link} />
                    <Button variant="danger" onClick={async () => {
                      //handleModalShowHide(!showHide)
                      // alert(hwList.toString())
                      // await hwList.splice(i, 1);

                      var tempArr = [...hwList];
                      await tempArr.splice(i,1);
                      await setHwList(tempArr)

                      // var elem = document.getElementById("hw" + i);
                      // // elem.parentNode.removeChild(elem)
                      // elem.remove()
                      // alert(hwList.toString())

                      // elem.style.display = 'none';

                    }}>

                      Delete

                    </Button>
                    <div className="mt-2 mb-2 w-full h-px" />
                  </div>
                )
              })
            }


            <Button variant="primary" onClick={() => {
              //homework add link
              setHwList(hwList => [...hwList, [2,2]])
            }}>
              Add Link
            </Button>
          </div>
          <div>
            <div className="mt-2 mb-2 w-full h-px bg-gray-300" />

            <p className="text-md font-semibold">Extras</p>

            {
              extList.map((doc, i) => {
                return(
                  <div key={i} id={"ext" + i}>
                    <input id={"extName" + i} defaultValue={doc.name} type="text" placeholder="Extras Name" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                    <input id={"extLink" + i} defaultValue={doc.link} type="text" placeholder="Extras Link" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                    <Button variant="danger" onClick={async () => {
                      //handleModalShowHide(!showHide)

                      // extList.splice(i, 1);
                      var tempArr = [...extList];
                      await tempArr.splice(i,1);
                      await setExtList(tempArr)

                      // var elem = document.getElementById("hw" + i);
                      // // elem.parentNode.removeChild(elem)
                      // elem.remove()
                      // alert(extList.toString())

                      // var elem = document.getElementById("ext" + i);
                      // // elem.parentNode.removeChild(elem)
                      // // unmountComponentAtNode(elem)
                      // elem.remove()
                      // elem.style.display = 'none';
                    }}>

                      Delete

                    </Button>
                    <div className="mt-2 mb-2 w-full h-px" />
                  </div>
                )
              })
            }

            <Button variant="primary" onClick={() => {
              //extra add link
              setExtList(extList => [...extList, []])

            }}>
              Add Link
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalShowHide(!showHide)}>
            Close
          </Button>

          {(currKey === "None") ? <></> :
            <Button variant="danger" onClick={async () => {
              await db.collection("class").doc(className).collection("topics").doc(topicName).collection("days").doc(currKey).delete();
              handleModalShowHide(!showHide)
            }}>
              Delete Day
            </Button>
          }




          <Button variant="primary" onClick={async function () {

            var dayNum = document.getElementById("dayNum").value;
            var dayName = document.getElementById("dayName").value;
            // alert(dayNum + "sldkfjsdlf" + dayName)

            var ref = db.collection("class").doc(className).collection("topics").doc(topicName).collection("days");
            if (currKey === "None") {//new day

              await ref.add({
                "dayName": dayName,
                "dayNum": dayNum
              }).then(async function (docRef) {
                //hw
                if (hwList.length > 0) {
                  // await docRef.collection("homework").get()
                  for (var i = 0; i < hwList.length; i++) {
                    await docRef.collection("homework").add({
                      "name": document.getElementById("hwName" + i).value,
                      "link": document.getElementById("hwLink" + i).value,
                    })
                  }
                }
                //extra
                if (extList.length > 0) {
                  for (var i = 0; i < extList.length; i++) {
                    await docRef.collection("extras").add({
                      "name": document.getElementById("extName" + i).value,
                      "link": document.getElementById("extLink" + i).value,
                    })
                  }
                }
              })
            } else {//update day
              await ref.doc(currKey).collection("homework").get().then(col => {
                col.docs.forEach((doc) => {
                  ref.doc(currKey).collection("homework").doc(doc.id).delete()
                })
              })
              await ref.doc(currKey).collection("extras").get().then(col => {
                col.docs.forEach((doc) => {
                  ref.doc(currKey).collection("extras").doc(doc.id).delete()
                })
              })
              await ref.doc(currKey).set({
                "dayNum": dayNum,
                "dayName": dayName,
              })
              //hw
              if (hwList.length > 0) {
                // await docRef.collection("homework").get()
                for (var i = 0; i < hwList.length; i++) {
                  await ref.doc(currKey).collection("homework").add({
                    "name": document.getElementById("hwName" + i).value,
                    "link": document.getElementById("hwLink" + i).value,
                  })
                }
              }
              //extra
              if (extList.length > 0) {
                for (var i = 0; i < extList.length; i++) {
                  await ref.doc(currKey).collection("extras").add({
                    "name": document.getElementById("extName" + i).value,
                    "link": document.getElementById("extLink" + i).value,
                  })
                }
              }

            }
            func(topicName, className)
            handleModalShowHide(!showHide)
          }}>

            {(currKey === "None") ? 'Create' : 'Update'}

          </Button>
        </Modal.Footer>
      </Modal>


      <div className="lg:pl-10 lg:pr-10 md:pl-10 md:pr-10 pl-10 pr-10 mt-6">
        <div className="mb-8">
          <p className="text-3xl font-semibold">{className}/{topicName}</p>
        </div>
        {
          gotData ?
            <div className="grid lg:grid-cols-3 md:grid-cols-2 col-end-auto auto-rows-fr gap-4  ">

              {/* {
                                alert(days.doc + "SLDKFJSLDKJFSLK")} */}
              {
                days.map((doc, i) => {
                  // setInfoArr(infoArr.push([doc.dayNum, doc.dayName, [homework[i]],[extras[i]]]))
                  // this.setInfoArr({infoArr: [...this.state.infoArr, [doc.dayNum, doc.dayName, [homework[i]],[extras[i]] ] })
                  // let tempInfo = [...infoArr]
                  // tempInfo.push([doc.dayNum, doc.dayName, [homework[i]],[extras[i]]])
                  // setInfoArr(tempInfo)
                  return (
                    <div key = {i} onClick={() => {
                      // alert(dayIds[i])
                      // showModal((i+1).toString())
                    }}>
                      <DayCard func={showModal} dayKey={dayIds[i]} name={doc.dayName} day={doc.dayNum} homework={[homework[i]]} extras={[extras[i]]} className={className} topicName={topicName} />
                    </div>
                  )
                })

              }
              <div onClick={() => {
                showModal("None")
                // handleModalShowHide(!showHide)
              }}>
                <NewDayCard key={""} name={""} day={""} homework={""} extras={""} />
              </div>
            </div>

            :
            <div className="grid grid-cols-3 col-end-auto auto-rows-fr gap-4">
              <DayCardLoader />
              <DayCardLoader />
              <DayCardLoader />
              <DayCardLoader />
              <DayCardLoader />
            </div>

        }
      </div>
    </div>
  )
}

export default MainContent
