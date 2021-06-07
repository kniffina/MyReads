import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookSearch extends Component {
    state = {
        searchInput: '',
        searchResults: [],
    }
    searchInputChanged = event => {
        event.persist();

        console.log(event.target.value);
        this.setState(() => ({
            searchInput: event.target.value, 
        }));
    }
    

    render() {
        const { searchInput } = this.state;

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
                    {   }
                    </ol>
                </div>
            </div>
        )
    }
}

BookSearch.propTypes = {
    shelfChange: PropTypes.func.isRequired,
}
export default BookSearch

