import {
    Link
} from 'react-router-dom'

import { signOut } from './redux/dispatch'

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
            <Link to="#" onClick={(e) => {
                
                e.preventDefault()

                signOut({
                    callback: () => {
                        
                    }
                })
                
                console.log('signout')
            }}>Sign Out</Link>
        </div>
    )
}

export default Header