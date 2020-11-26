import React, { useState, useEffect } from 'react';
import classes from './clock.module.css';

const Clock = (props) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timeId = setInterval(() => {
      trick()
    }, 1000)
    return () => {
      clearInterval(timeId)
    }
  }, [])

  const trick = () => {
    setDate(new Date())
  }

  return <div className={classes.Clock}>{date.toLocaleTimeString()}</div>;
};

export default Clock;
