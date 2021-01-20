import React from 'react'
import './PageNotFound.css'
import Button from '../UI/button/Button';
import {useHistory} from 'react-router'

const PageNotFound = () => {
    const history = useHistory()
    return (
        <div className="not-found">
        <h1 className="heading">404 NOT FOUND</h1>
        <h2 className="heading">DOWN FOR MAINTANACE</h2>
        <Button onClick={() => history.push("/")}>Back to Home page</Button>
      </div>
    )
}

export default PageNotFound
