import React from 'react';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import * as Yup from "yup"
import { useAuth } from '../../Context/useAuth';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {}

type LoginFormsInputs = {
    userName: string
    password: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
})

const LoginForm: React.FC<Props> = (_props: Props): JSX.Element => {
    /*
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    */
    const { loginUser } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password)
    }

    return (
        <Form
            name="login"
            //initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={handleSubmit(handleLogin)}
        >
            <Form.Item
                //name="username"
                //id="username"
                //rules={[{ required: true, message: 'Please input your Username!' }]}
                help={errors.userName ? errors.userName.message : ""} validateStatus={errors.userName ? "error" : ""}
            >
                <Controller
                    name="userName"
                    control={control}
                    render={
                        ({ field }) => (<Input {...field} placeholder="Username" />)
                    }
                />
            </Form.Item>
            <Form.Item
                //name="password"
                //id="password"
                //rules={[{ required: true, message: 'Please input your Password!' }]}
                help={errors.password ? errors.password.message : ""} validateStatus={errors.password ? "error" : ""}
            >
                <Controller
                    name="password"
                    control={control}
                    render={
                        ({ field }) => (<Input {...field} placeholder="password" />)
                    }
                />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit" icon={<LoginOutlined style={{ color: 'ff7a45' }} />}>
                    Sign in
                </Button>
            </Form.Item>

            <Form.Item>
                <Button block color="primary" variant="outlined" icon={<HomeOutlined style={{ color: 'ff7a45' }} />}>
                    <Link to={'/'}>Homepage</Link>
                </Button>
                or <a href="">Register now!</a>
            </Form.Item>
        </Form>
    )
}

export default LoginForm