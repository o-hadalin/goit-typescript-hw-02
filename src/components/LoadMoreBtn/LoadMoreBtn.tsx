import React from 'react';
import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
  isVisible: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
