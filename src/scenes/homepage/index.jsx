import React, { useEffect, useReducer, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const Homepage = (props) => {

    const [task, setTask] = useState('');
    const [getTasks,setGettasks] = useState([]);
    const [updateTask, setUpdateTask] = useState('');
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [updateId, setUpdateId] = useState(0);

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const res = await axios.get('http://localhost:8800/read')
                // console.log(res);
                setGettasks(res.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            fetchAllTasks();
        }, 2000);
        
    },[ignored])
    const handleAddChange = (event) => {
        setTask(event.target.value);
    }

    const handleAdd = async (event) => {
        event.preventDefault();
        if(task.length <= 0){
            document.getElementById('inputText').style.borderColor = "red";
            return;
        }
        const userId = await sessionStorage.getItem("userId");
        console.log(userId);
        axios.post('http://localhost:8800/add', {userId, task})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
        forceUpdate()
    }

    const handleDel = async (event, id) => {
        axios.post('http://localhost:8800/delete', {id})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
        forceUpdate();
    }

    const handleUpdate = async (event, id) => {
        axios.post('http://localhost:8800/update', {updateTask, id})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
        handleClose();
        forceUpdate();
    }

    const handleUpdateChange = (event) => {
        setUpdateTask(event.target.value);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Navbar />

        <div className="container rounded-3 border border-2 border-dark my-5 bg-white p-3 overflow-auto" style={{height: "75vh"}}>
        <h1 className="h1 text-center">i-Notebook Task List</h1> 
        <div className="row justify-content-center">
            <div className=" col-8 align-self-center">
                <input className="p-2 form-control shadow w-100" placeholder="input your task" value={task} onChange={handleAddChange} type="text" id="inputText" /> 
            </div>
            <div className="col-4">
                <button onClick={handleAdd} className="btn btn-dark float-right w-100 p-2 fw-bold"> Add </button>
            </div>
        </div>
            <hr />
        <div className="row rounded bg-white">
        <div className=" col-12">
        <ul className="list-group" id="list">
        {getTasks.map(t => (
            
                <li className="my-1 py-3 shadow list-group-item " key={t.id} id={'list'+t.id} >
                <div className="row">
                <div className="col-1">
                <input className="" type="checkbox" id={'check'+t.id} />
                </div>
                <div className="col-6">
                    <span className="h6" id={'task'+t.id}>{t.task}</span>
                </div>
                <div className="col-4">
                     <button type="button" className="btn btn-dark mx-2" id={'del'+t.id} onClick={event => handleDel(event, t.id)}>Delete</button>
                     <Button variant="dark" onClick={() => {handleShow(); setUpdateTask(t.task); setUpdateId(t.id);}} id={'btn'+t.id}>
                        Edit
                    </Button>
                     
                </div>                  
                 </div>    
                
                </li>
            
        ))}
        
        </ul>    
        </div>
        </div>        
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body><input className="p-2 form-control shadow w-100" placeholder={updateTask} type="text" id="inputText" value={updateTask} onChange={handleUpdateChange} /></Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={event => handleUpdate(event, updateId)}>
                Update Task
            </Button>
            </Modal.Footer>
            </Modal>
        <Footer />
        </>
    );
}

export default Homepage;