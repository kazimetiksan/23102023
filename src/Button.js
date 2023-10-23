import {
    Button as RBButton
} from 'react-bootstrap'

const Button = ({
    title,
    onClick
}) => {

    // Javascript ES6
    // Destructuring

    return (
        <RBButton onClick={onClick}>{title}</RBButton>
    )
}

export default Button