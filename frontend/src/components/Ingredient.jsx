import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './Ingredient.module.css';

const Ingredient = ({ ingredient }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: {
      id: ingredient.id,
      name: ingredient.name,
      icon: ingredient.icon,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={styles.ingredient}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <span>{ingredient.icon}</span> {ingredient.name}
    </div>
  );
};

export default Ingredient;
