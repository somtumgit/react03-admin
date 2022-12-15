export const initSate = {
    auth: {
        token: null,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            picture: ''
        },
        message: '',
        error: '',
        authenticate: false,
        authenticating: false
    },
    user: {
        message: '',
        error: null,
        loading: false
    },
    adminApp: {
        initailData: {
            message: '',
            error: null,
            loading: false,
            type: ''
        },
        category: {
            categories: [],
            message: '',
            error: null,
            loading: false,
            type: ''
        },
        product: {
            products: [],
            message: '',
            error: null,
            loading: false,
            type: ''
        },
        page: {
            pages: [],
            message: '',
            error: null,
            loading: false,
            type: ''
        },
        order: {
            orders: [],
            message: '',
            error: null,
            loading: false,
            type: ''
        },
    },
    type: ''
}