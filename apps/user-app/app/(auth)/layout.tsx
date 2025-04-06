import React, { FC, ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            {children}
        </div>
    )
}

export default AuthLayout