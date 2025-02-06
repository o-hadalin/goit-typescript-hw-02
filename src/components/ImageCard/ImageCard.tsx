import styles from './ImageCard.module.css';

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
