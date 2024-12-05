import React, { useState, useEffect } from 'react'

import Dashboard from '../../Components/Dashboard/Dashboard'
import Tile from '../../Components/Tile/Tile'
import UserInfo from '../../Components/UserInfo/UserInfo'
import { RobotOutlined, HistoryOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Flex, Divider, Button } from 'antd';
import { Link } from 'react-router-dom'
import { UserProfile } from "../../Models/User"
import { getUserInformation } from '../../Services/AuthService';

interface Props { }

const { Header, Content, Footer, Sider } = Layout;

const SystemPage = (props: Props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        { label: <Link to="Dispatch">Dispatch</Link>, icon: RobotOutlined },
        { label: <Link to="History">History</Link>, icon: HistoryOutlined },
    ].map(
        (item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: item.label,
        }),
    );

    const [userInformation, setUserInformation] = useState<UserProfile | null>(null);
    const [serverError, setServerError] = useState<string>("")

    const handleUserChange = async () => {
        // if (userInformation === null) {
        //     setServerError('Please login')
        //     return
        // }

        try {
            const result = await getUserInformation()

            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result)) {
                setUserInformation(result)
                setServerError('')
            }
        } catch (error) {
            setServerError('Failed to fetch data. Please try again later')
        }
    }

    useEffect(() => {
        handleUserChange();
    })

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} style={{ fontSize: 20 }} />

            </Sider>
            <Layout style={{ display: 'flex', height: '100vh' }}>
                <Header style={{ paddingRight: '2%', background: colorBgContainer }}>
                    <Flex justify='end' align='center'>
                        <Button type="text" htmlType="submit" icon={<HomeOutlined style={{ color: '#08C', fontSize: '20' }} />}>
                            <Link to={'/'} >Home</Link>
                        </Button>
                        <UserInfo userInfo={userInformation ?? { Uid: 'A0001', Name: 'Conan', Auth: 99 }} onChange={handleUserChange} />
                    </Flex>
                </Header>
                <Content style={{ flex: '1', margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 10,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Dashboard>
                            <Tile title="Title" />
                            <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
                        </Dashboard>

                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright ©{new Date().getFullYear()} Conan All rights reserved
                </Footer>
            </Layout>
        </Layout>
    )
}

export default SystemPage