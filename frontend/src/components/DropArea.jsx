import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './DropArea.module.css';

function DropArea({ onDrop, children }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => {
      console.log('DropAreaでドロップされたアイテム:', item); // 確認用
      if (onDrop) {
        onDrop(item); // 呼び出し確認
      } else {
        console.warn('onDropが定義されていません');
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`${styles.dropArea} ${isOver ? styles.isOver : ''} ${canDrop ? styles.canDrop : ''}`}
    >
      {children}
      {isOver && canDrop && <p>ここにドロップしてください</p>}
    </div>
  );
}

export default DropArea;
