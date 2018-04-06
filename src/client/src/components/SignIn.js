import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { withAuth } from '../context/Auth'

const FormItem = Form.Item
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class SignInForm extends React.Component {
  state = {
    isLoginForm: true
  }

  handleSubmit = e => {
    const { form, auth } = this.props
    e.preventDefault()
    form.validateFields((err, formData) => {
      if (!err) {
        this.state.isLoginForm
          ? auth.A.login({ data: formData })
          : auth.A.register({ data: formData })
      }
    })
  }

  toggleForm = () =>
    this.setState(prevState => ({
      isLoginForm: prevState.isLoginForm ? false : true
    }))

  render() {
    const { getFieldDecorator } = this.props.form
    const { isLoginForm } = this.state

    return (
      <FormWrapper>
        <Form onSubmit={this.handleSubmit}>
          {!isLoginForm && (
            <Fragment>
              <FormItem>
                {getFieldDecorator('nameFirst', {
                  rules: [
                    { required: true, message: 'Please enter your first name' }
                  ]
                })(<Input placeholder="First name" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('nameLast', {
                  rules: [
                    { required: true, message: 'Please enter your last name' }
                  ]
                })(<Input placeholder="Last name" />)}
              </FormItem>
            </Fragment>
          )}

          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please enter your username' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter your Password' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              {isLoginForm ? 'Log in' : 'Register'}
            </Button>
          </FormItem>
          <Button type="secondary" onClick={this.toggleForm}>
            Or {isLoginForm ? 'register now' : 'login'}
          </Button>
        </Form>
      </FormWrapper>
    )
  }
}

const SignIn = Form.create()(SignInForm)

export default withAuth(SignIn)
