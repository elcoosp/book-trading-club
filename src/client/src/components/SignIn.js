import React, { Fragment } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class SignInForm extends React.Component {
  state = {
    isLogin: true
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Signin form values: ', values)
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
          {getFieldDecorator('userName', {
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

export default SignIn
