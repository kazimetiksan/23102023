import {
    Button as RBButton
} from 'react-bootstrap'

const Button = ({
    title,
    onClick,
    variant="secondary" // default value
}) => {

    // Javascript ES6
    // Destructuring

    return (
        <RBButton variant={variant} onClick={onClick}>{title}</RBButton>
    )
}

export default Button