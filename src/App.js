import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {},
    map: {
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want to Read",
      "read": "Read"
    },
    booksDB: {},  
}

async componentDidMount() {
  const books = await BooksAPI.getAll();
  this.setState({ books });
  this.state.books.forEach((book) => {
    this.addBookToShelf(book, book.shelf);
  });
}

addBookToShelf = (book, shelf) => {
  const { shelves } = this.state;
  book.shelf = shelf;

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
      },
    }))
  }
  this.setState((prevState) => ({
    booksDB: {
      ...prevState.booksDB,
      [book.id]: book,
    }
  }))
}

removeBookFromShelf = (book, newShelf) => {
  const currShelf = book.shelf;
  book.shelf = newShelf;

  let booksDBState = { ...this.state.booksDB };
  delete booksDBState[book.id];


  this.setState((prevState) => ({
    shelves: {
      ...prevState.shelves,
      [currShelf]: {
        ...prevState.shelves[currShelf],
        books: prevState.shelves[currShelf].books.filter((b, idx) => book.id !== b.id), //return new array that is everything not at the index of the book
      }
    },
    booksDB: booksDBState
  }));
}

shelfChange = (book, shelf) => {
  BooksAPI.update(book, shelf)
    .then(() => {
      if (this.state.booksDB[book.id]) this.removeBookFromShelf(book, shelf); //remove from the current shelf, if a book exists in our key:value pair
    })
    .then(() => {
      if (shelf !== "none") this.addBookToShelf(book, shelf); //put it in the new shelf if the new shelf isn't none.
    })
}
render() {
  const { shelves, map, booksDB } = this.state;

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
                <button style={{ cursor: "pointer" }}>Add a book</button>
              </div>
            </Link>
          </div>
        )}
      />
      <Route path="/search">
        <BookSearch
          shelfChange={this.shelfChange}
          booksDB={booksDB}
        />
      </Route>
    </div>
  )
}
}

export default BooksApp
