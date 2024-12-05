import React from 'react'
import { Outlet } from 'react-router'

type Props = {
    children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
    return (
        <div>
            <div>{children}</div>
            <div>{<Outlet />}</div>
        </div>
    )
}

export default Dashboard