import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

    shelfChange = (book, shelf) => {
        this.props.shelfChange(book, shelf);
    }

    render() {
        const { books, shelfTitle } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book 
                                key={book.id}
                                book={book}
                                shelfChange={this.shelfChange}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfChange: PropTypes.func.isRequired,
}

export default BookShelf