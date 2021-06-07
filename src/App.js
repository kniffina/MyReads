import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelves: {},
      map: {
        "currentlyReading": "Currently Reading",
        "wantToRead": "Want to Read",
        "read": "Read"
      }
    }
  }


  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
      .then(() => {
        this.state.books.forEach((book) => {
          this.addBookToShelf(book, book.shelf);
        });
      })
  }

  addBookToShelf = (book, shelf) => {
    const { shelves } = this.state;

    if (shelves[shelf]) {
      this.setState((prevState) => ({
        shelves: {
          ...prevState.shelves,
          [shelf]: {
            ...prevState.shelves[shelf],
            books: [...prevState.shelves[shelf].books, book],
          }
        }
      }))
    } else {
      this.setState((prevState) => ({
        shelves: {
          ...prevState.shelves,
          [shelf]: {
            title: shelf,
            books: [book],
          }
        }
      }))
    }
  }

  removeBookFromShelf = (book, newShelf) => {
    const currShelf = book.shelf;
    book.shelf = newShelf;

    this.setState((prevState) => ({
      shelves: {
        ...prevState.shelves,
        [currShelf]: {
          ...prevState.shelves[currShelf],
          books: prevState.shelves[currShelf].books.filter((b, idx) => book.id !== b.id), //return new array that is everything not at the index of the book
        }
      },

    }));
  }

  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.removeBookFromShelf(book, shelf); //remove frmo the current shelf
      })
      .then(() => {
        this.addBookToShelf(book, shelf); //put it in the new shelf
      })
  }
  render() {
    const { shelves, map } = this.state;
    console.log(shelves);
    return (

      <div className="app">

        <Route
          exact path='/'
          render={() => (


            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                {
                  Object.keys(shelves).map((key) => (
                    <BookShelf
                      key={key}
                      books={shelves[key].books}
                      shelfTitle={map[shelves[key].title]}
                      shelfChange={this.shelfChange}
                    />
                  ))
                }
              </div>
              <Link to="/search">
                <div className="open-search">
                  <button style={{ cursor: "pointer" }} onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
              </Link>
            </div>
          )}
        />
        <Route path="/search">
          <BookSearch
            shelfChange={this.shelfChange}

          />
        </Route>
      </div>
    )
  }
}

export default BooksApp
