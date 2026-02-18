import React from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { Loader } from './components/ui/loader'

const Layout = ({ children }) => {
    const isFetching = useIsFetching()
    return (
        <>
            {isFetching > 0 && <Loader />}
            <div>{children}</div>
        </>
    )
}

export { Layout }