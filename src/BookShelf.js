import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ title, books, shelfChange }) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
  
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelfChange={shelfChange}
            />
          ))}
        </ol>
      </div>
    </div>
  );

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfChange: PropTypes.func.isRequired,
}

export default BookShelf