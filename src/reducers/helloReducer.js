module.exports = exports = function (state= {posts: {data: []}}, action) {
    switch (action.type) {
        case 'DATA_DID_LOAD':
            return Object.assign({},state, action.payload);
        default:
            return state;
    }
}