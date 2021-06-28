import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (
        <>
            <h2>We couldn't find that page</h2>
            <Link to='/'>Return to homepage</Link>
        </>
    )
}

export default NoMatch
