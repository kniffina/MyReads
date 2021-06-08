import React, { Component } from 'react'
import PropTypes from 'prop-types'



class Book extends Component {
    //if we are changing the shelf that this specific book is on.
    shelfChange = (event) => {
        event.preventDefault();
        if(event.target.value !== this.props.book.shelf) {
            this.props.shelfChange(this.props.book, event.target.value);
        }
    }
   
    render() {
        const { book } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.shelfChange} value={book.shelf ? book.shelf : "none"}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    { (book.authors || []).map((name, index) => (
                        <div key={index} className="book-authors">{name}</div>
                    ))}
                    <div className="book-authors">{book.imageURL}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelfChange: PropTypes.func.isRequired,
}
export default Book