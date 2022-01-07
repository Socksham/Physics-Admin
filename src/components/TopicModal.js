import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../utils/Firebase';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopicModal = ({ name, className, showHide, handleModalShowHide }) => {
  const [active, setActive] = React.useState(false);

  function handleActivation(e) {
    setActive(!!e.target.value);
  }

    return (
      <Modal show={showHide} fade={false}>
        <Modal.Header closeButton onClick={() => handleModalShowHide(!showHide)}>
          <Modal.Title>New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div class="mb-3 pt-0">
            <input id = "topicIdName" type="text" placeholder="Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalShowHide(!showHide)}>
            Close
          </Button>
          <Button variant="primary" onClick={async function () {
                    handleModalShowHide(!showHide)
                    if (!(document.getElementById("topicIdName").value == "")) {
                        await db.collection("class").doc(className).collection("topics").doc(document.getElementById("topicIdName").value).set({
                            topicName: document.getElementById("topicIdName").value,
                        })
                    }
                    window.location.reload(true)
                }}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default TopicModal