import { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSearch } from 'react-icons/hi';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  const handleSearchClick = () => {
    handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <HiOutlineSearch
            className={styles.icon}
            onClick={handleSearchClick}
          />
          <input
            type="text"
            id="search-input"
            name="search"
            className={styles.input}
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
