import { useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { gql, useMutation } from "@apollo/client";
const SignupForm = () => {
  const [signUpUser, response] = useMutation(REGISTER_USER);
  useEffect(() => {
    if (response.called == true && response.loading == false) {
      console.log(response.data.register);
    }
  }, [response]);
  const onFinish = (values) => {
    const { username, email, password, confirmPassword } = values;
    signUpUser({
      variables: {
        userdata: {
          username,
          email,
          password,
          confirmPassword,
        },
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <Form
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
        scrollToFirstError
        style={{
          width: "40vw",
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation SignUpUser($userdata: RegisterInput) {
    register(registerInput: $userdata) {
      id
      token
    }
  }
`;
export default SignupForm;
