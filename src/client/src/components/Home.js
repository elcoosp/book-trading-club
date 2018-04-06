import React, { Component } from 'react'
import axios from 'axios'
import { withAuth } from '../context/Auth'

const BookCard = ({ name, cover }) => {
  return (
    <li>
      <p>{name}</p>
      <img src={cover} alt={'Thumbnail ' + name} />
    </li>
  )
}

class Home extends Component {
  state = {
    books: null,
    error: null,
    isLoading: false
  }
  componentDidMount = () => {
    this.setState(prevState => ({
      isLoading: true
    }))

    axios
      .get(
        '/api/books',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.props.auth.S.token}`
          }
        }
      )
      .then(({ data }) =>
        this.setState(prevState => ({
          isLoading: false,
          books: data
        }))
      )
      .catch(e =>
        this.setState(prevState => ({
          error: 'An error occured while fetching books',
          isLoading: false
        }))
      )
  }

  render() {
    const { books, error, isLoading } = this.state
    return (
      <div>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading</p>}
        <ul>{books && books.map(b => <BookCard key={b.id} {...b} />)}</ul>
      </div>
    )
  }
}

export default withAuth(Home)
