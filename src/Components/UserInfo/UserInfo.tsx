import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useAuth } from '../../Context/useAuth';
import { Link } from 'react-router-dom';
import { UserProfile } from "../../Models/User"

interface Props {
    userInfo: UserProfile;
    onChange: () => void;
}

const { useToken } = theme;
const { Text } = Typography;

const UserInfo: React.FC<Props> = ({ userInfo }: Props) => {
    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };

    const { isLoggedIn, logout } = useAuth();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: `ID:${userInfo.Uid}`
        },
        {
            key: '2',
            label: `Auth:${userInfo.Auth}`
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
                <div style={contentStyle}>
                    {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                    <Divider style={{ margin: 0 }} />
                    {isLoggedIn() ? (
                        <Space style={{ padding: 8 }}>
                            <Button color="primary" variant='outlined' onClick={logout}>Sign out</Button>
                        </Space>
                    ) : (
                        <Space style={{ padding: 8 }}>
                            <Link to="/login">
                                Login
                            </Link>
                            <Link to="">
                                Homepage
                            </Link>
                        </Space>
                    )}

                </div>
            )}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <UserOutlined style={{ fontSize: 20, color: '#08c' }} />
                    <Text strong style={{ fontSize: 20, color: '#08c' }}>{userInfo.Name}</Text>
                    <DownOutlined style={{ fontSize: 20, color: '#08c' }} />
                </Space>
            </a>
        </Dropdown>
    )
}

export default UserInfo