import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'
import axios from 'axios'
const FormItem = Form.Item

class MyBooks extends Component {
  state = {
    isFormOpen: false
  }

  toggleForm = () =>
    this.setState(prevState => ({
      isFormOpen: prevState.isFormOpen ? false : true
    }))

  handleAddBook = e => {
    const { token, user, form } = this.props
    e.preventDefault()
    form.validateFields((err, formData) => {
      if (!err) {
        axios.post(
          '/api/books',
          { formData },
          {
            headers: {
              Authorization: `Bearer ${token}`
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

export default connect(
  {
    token: state`auth.token`
  },
  MyBooksWithForm
)
