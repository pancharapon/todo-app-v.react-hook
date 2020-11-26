import React, { useState, useEffect } from 'react';
import Clock from '../../components/clock/clock';
import Modal from '../../components/ui/modal/modal';
import Items from '../../components/items/items';
import Adding from '../../components/adding/adding';
import ConfigItem from '../../components/configItem/configItem';
import Spinner from '../../components/ui/spinner/spinner';
import axios from 'axios';
import classes from './TodoApp.module.css';

const TodoApp = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(true);

  useEffect(() => {
    if (save) {
      axios
        .get('https://todoapp-b1494.firebaseio.com/tasks.json')
        .then((response) => {
          setData(response.data)
          setSave(false)
        })
        .catch((error) => console.log(error));
    }
  }, [save]);

  useEffect(() => {
    if (id.length !== 0) {
      axios
        .get('https://todoapp-b1494.firebaseio.com/tasks/' + id + '.json')
        .then((response) => {
          setTitle(response.data.task);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const showModalHandler = (id) => {
    setLoading(true);
    setDeleteShow(true);
    setShow(true);
    setId(id);
  };

  const addingModalHandler = () => {
    setShow(true);
    setLoading(true);
    setTitle('');
    setId('');
    setDeleteShow(false);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const cancelModalHandler = () => {
    setShow(false);
    setId('')
  };

  const saveChangeHandler = () => {
    setLoading(true);
    const updateTitle = { task: title}

    if (id === '') {
      axios.post('https://todoapp-b1494.firebaseio.com/tasks.json', updateTitle)
        .then(response => {
          setLoading(false)
          setSave(true)
          setId(response.data.name)
        })
    }

    if(id) {
      axios
        .put(`https://todoapp-b1494.firebaseio.com/tasks/${id}.json`, updateTitle)
        .then((response) => {
          setLoading(false);
          setSave(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteHandler = () => {
    setLoading(true);
    axios.delete(`https://todoapp-b1494.firebaseio.com/tasks/${id}.json`)
      .then(response => {
        setLoading(false)
        setSave(true)
        cancelModalHandler()
      })
      .catch(error => console.log(error))
  };

  return (
    <main>
      <Modal show={show} clicked={cancelModalHandler}>
        {!loading ? (
          <ConfigItem
            title={title}
            titleChangeHandler={titleChangeHandler}
            saveChangeHandler={saveChangeHandler}
            cancelHandler={cancelModalHandler}
            deleteShow={deleteShow}
            deleteHandler={deleteHandler}
          />
        ) : (
          <Spinner />
        )}
      </Modal>
      <header>
        <p className={classes.Heading}>TodoApp</p>
        <Clock />
      </header>
      <Items data={data} clicked={showModalHandler} />
      <Adding clicked={addingModalHandler} />
    </main>
  );
};

export default TodoApp;
