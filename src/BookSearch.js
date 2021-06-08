import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
    state = {
        searchInput: '',
        searchResults: [],
    }

    searchInputChanged = event => {
        event.persist();
        event.preventDefault();

        console.log("input changed to: " + event.target.value);
        this.setState(() => ({
            searchInput: event.target.value,
            searchResults: [],
        }), () => {
            if(this.state.searchInput === '') return;
            const { booksDB } = this.props;

            BooksAPI.search(this.state.searchInput)
            .then((books) => {
                
                if (books !== undefined && books !== null && books.error !== "empty query") {
                    if(this.state.searchResults.length > 0) return; //if we are trapped in another call, stops from people spamming
                    books.forEach((book) => {
                        if (booksDB[book.id]) {
                            this.setState((prevState) => ({
                                searchResults: [...prevState.searchResults, booksDB[book.id]]
                            }))
                        } else {
                            
                            this.setState((prevState) => ({
                                searchResults: [...prevState.searchResults, book]
                            }))
                        }
                    })
                }
            })
        });
    }

    shelfChange = (book, shelf) => {
        this.props.shelfChange(book, shelf);
    }
    render() {
        const { searchInput, searchResults } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={searchInput}
                            onChange={this.searchInputChanged}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((book) => (

                            <Book
                                key={book.id}
                                shelfChange={this.shelfChange}
                                book={book}

                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

BookSearch.propTypes = {
    shelfChange: PropTypes.func.isRequired,
    booksDB: PropTypes.object.isRequired,
}
export default BookSearch

