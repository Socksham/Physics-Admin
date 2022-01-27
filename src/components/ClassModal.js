import { db } from '../utils/Firebase';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase'


const ClassModal = ({ name, showHide, handleModalShowHide, cHandler }) => {

    // const firestore = db.firestore();



    return (
        <Modal show={showHide}>
            <Modal.Header closeButton onClick={() => handleModalShowHide(!showHide)}>
                <Modal.Title>New Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div class="mb-3 pt-0">
                    <input id="classIdName" defaultValue={name} type="text" placeholder="Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModalShowHide(!showHide)}>
                    Close
                </Button>

                <Button variant="primary" onClick={async function () {
                    handleModalShowHide(!showHide)
                    if (!(document.getElementById("classIdName").value == "")) {
                        await db.collection("class").doc(document.getElementById("classIdName").value).set({
                            className: document.getElementById("classIdName").value,
                            timestamp: firebase.firestore.Timestamp.now()
                        })
                        cHandler()
                    }
                }}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ClassModal