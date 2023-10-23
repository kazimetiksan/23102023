const Button = ({
    title,
    onClick
}) => {

    // Javascript ES6
    // Destructuring

    return (
        <button onClick={onClick}>{title}</button>
    )
}

export default Button