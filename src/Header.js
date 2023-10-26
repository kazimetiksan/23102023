import {
    Link
} from 'react-router-dom'

const Header = () => {

    return (
        <div style={{
            marginLeft: 50,
            marginTop: 10,
            width: 250,
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Link to="/">Home</Link>
            <Link to="/only">Only</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Out</Link>
        </div>
    )
}

export default Header