import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import { withAuth } from '../context/Auth'
const FormItem = Form.Item

class MyBooks extends Component {
  state = {
    isFormOpen: false,
    books: null,
    error: null,
    isLoading: false
  }
  componentDidMount = () => {
    this.setState(prevState => ({
      isLoading: true
    }))

    axios
      .get(`/api/books/?user=${this.props.auth.S.user.id}`)
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

  toggleForm = () =>
    this.setState(prevState => ({
      isFormOpen: prevState.isFormOpen ? false : true
    }))

  handleAddBook = e => {
    const { auth, form } = this.props
    e.preventDefault()
    form.validateFields((err, formData) => {
      if (!err) {
        this.setState(prevState => ({
          isFormOpen: false
        }))
        axios.post(
          '/api/books',
          { formData },
          {
            headers: {
              Authorization: `Bearer ${auth.S.token}`
            }
          }
        )
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const { isFormOpen } = this.state
    return (
      <div>
        <Button onClick={this.toggleForm}>
          {isFormOpen ? 'Close form' : 'Add a book'}
        </Button>
        {isFormOpen ? (
          <Form onSubmit={this.handleAddBook}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please enter the book name' }
                ]
              })(<Input placeholder="Book name" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Add book
              </Button>
            </FormItem>
          </Form>
        ) : null}
      </div>
    )
  }
}

const MyBooksWithForm = Form.create()(MyBooks)

export default withAuth(MyBooksWithForm)
