import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

interface ImageUrls {
  small: string;
  full: string;
}

interface Image {
  id: string;
  urls: ImageUrls;
  alt_description: string | null;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (imageUrl: string, imageAlt: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images.length) return null;

  return (
    <ul className={styles.gallery}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={styles.item}>
          <ImageCard
            src={urls.small}
            alt={alt_description || 'Image'}
            onClick={() => onImageClick(urls.full, alt_description || 'Image')}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
