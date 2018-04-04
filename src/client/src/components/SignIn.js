import React, { Fragment } from 'react'
import { connect } from '@cerebral/react'
import { signal } from 'cerebral/tags'

import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class SignInForm extends React.Component {
  state = {
    isLogin: true
  }
  handleSubmit = e => {
    const { form, _login, _register } = this.props
    e.preventDefault()
    form.validateFields((err, formData) => {
      if (!err) {
        this.state.isLogin
          ? _login({ loginForm: formData })
          : _register({ registerForm: formData })
      }
    })
  }

  toggleForm = () =>
    this.setState(prevState => ({
      isLogin: prevState.isLogin ? false : true
    }))

  render() {
    const { getFieldDecorator } = this.props.form
    const { isLogin } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        {!isLogin && (
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
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter your Password' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
        <Button type="secondary" onClick={this.toggleForm}>
          Or {isLogin ? 'register now' : 'login'}
        </Button>
      </Form>
    )
  }
}

const SignIn = Form.create()(SignInForm)

export default connect(
  {
    _login: signal`login`,
    _register: signal`register`
  },
  SignIn
)
