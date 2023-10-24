import {
    Button as RBButton
} from 'react-bootstrap'

const Button = ({
    title,
    onClick,
    variant="secondary", // default value,
    disabled=false
}) => {

    // Javascript ES6
    // Destructuring

    return (
        <RBButton disabled={disabled} variant={variant} onClick={onClick}>{title}</RBButton>
    )
}

export default Button