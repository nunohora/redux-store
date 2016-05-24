const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ]

function postcode(value) {
    if (!isEmpty(value) && !/[0-9]{4}-[0-9]{3}/.test(value)) {
        return 'Codigo postal invalido'
    }
}

function email(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address'
    }
}

function required(value) {
    if (isEmpty(value)) {
        return 'Campo Obrigatório'
    }
}

function minLength(min) {
    return value => {
        if (!isEmpty(value) && value.length < min) {
            return `Must be at least ${min} characters`
        }
    }
}

function maxLength(max) {
    return value => {
        if (!isEmpty(value) && value.length > max) {
            return `Must be no more than ${max} characters`
        }
    }
}

function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return 'Must be an integer';
    }
}

function oneOf(enumeration) {
    return value => {
        if (!~enumeration.indexOf(value)) {
            return `Must be one of: ${enumeration.join(', ')}`
        }
    }
}

function match(field) {
    return (value, data) => {
        if (data) {
            if (value !== data[field]) {
                return 'Do not match'
            }
        }
    }
}

function createValidator(rules) {
    return (data = {}) => {
        const errors = {}

        Object.keys(rules).forEach((key) => {
            const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
            const error = rule(data[key], data)

            if (error) {
                errors[key] = error
            }
        });
        return errors
    }
}

export default () => ({
    createValidator,
    match,
    oneOf,
    integer,
    maxLength,
    minLength,
    required,
    email,
    postcode
})