import React from 'react';
import Item from './item/item';
import Spinner from '../ui/spinner/spinner';
import classes from './items.module.css';

const items = (props) => {
  let items = <div className={classes.Loading}><Spinner /></div>;
  if (Object.entries(props.data).length !== 0) {
    items = Object.entries(props.data).map(([key, value]) => {
      return (
        <Item
          name={value.task}
          modalSetting={() => props.clicked(key)}
          key={key}
        />
      );
    });
  }

  return (
    <div className={classes.Items}>{items}</div>
  )
}

export default items;