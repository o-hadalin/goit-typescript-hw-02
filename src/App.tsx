import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from './api/http-api';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
}

interface ModalImage {
  url: string;
  alt: string;
}

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

const transformToImage = (unsplashImage: UnsplashImage): Image => ({
  id: unsplashImage.id,
  alt_description: unsplashImage.alt_description,
  urls: {
    small: unsplashImage.urls.small,
    regular: unsplashImage.urls.regular,
    full: unsplashImage.urls.regular,
  },
});

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImage>({
    url: '',
    alt: '',
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [noImagesFound, setNoImagesFound] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(null);
      setNoImagesFound(false);

      try {
        const data = await fetchImages(searchQuery, page);
        if (data.results.length === 0) {
          setNoImagesFound(true);
        }
        setImages(prevImages => [
          ...prevImages,
          ...data.results.map(transformToImage),
        ]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById('root')?.setAttribute('inert', 'true');
    } else {
      document.getElementById('root')?.removeAttribute('inert');
    }
  }, [isModalOpen]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setNoImagesFound(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    setTimeout(() => {
      window.scrollBy({
        top: 200,
        behavior: 'smooth',
      });
    }, 300);
  };

  const openModal = (imageUrl: string, imageAlt: string) => {
    setModalImage({ url: imageUrl, alt: imageAlt });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hasMoreImages = page < totalPages;

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {noImagesFound && (
        <p>No images found for {searchQuery}. Please try another search.</p>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={hasMoreImages} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={modalImage.url}
        imageAlt={modalImage.alt}
      />
    </div>
  );
};

export default App;
