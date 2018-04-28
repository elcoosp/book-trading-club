import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { notEmpty } from '../utils'
import { Title, Button, Main } from '../ui/Common'
import { Form } from '../ui/Form'
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
      _id
    }
  }
`

class NewBook extends Component {
  state = {
    title: '',
    author: ''
  }
  onChange = ({ target: { value, name } }) =>
    this.setState(prevState => ({
      [name]: value
    }))

  onSubmit = e => {
    e.preventDefault()
    const { title, author } = this.state
    if (notEmpty(title, author)) {
      this.props
        .addBook({
          variables: { title, author }
        })
        .then(console.log)
        .catch(console.error)

      this.setState(prevState => ({
        title: '',
        author: ''
      }))
    }
  }
  render() {
    const { title, author } = this.state

    return (
      <Main>
        <Title>Add a new book</Title>
        <Form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.onChange}
          />
          <label htmlFor="author">Author</label>
          <input
            name="author"
            type="text"
            value={author}
            onChange={this.onChange}
          />
          <Button type="submit">Add a book</Button>
        </Form>
      </Main>
    )
  }
}

export default graphql(ADD_BOOK, { name: 'addBook' })(NewBook)
