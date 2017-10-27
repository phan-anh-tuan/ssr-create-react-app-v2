const Butter = require('buttercms')

module.exports = exports = function fetchPosts() {
    return function(dispatch,getState){
        const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');
        return butter.post.list().then((resp) => resp.data)
        .then( (json) => dispatch({ type: 'DATA_DID_LOAD', payload: { posts: { data: json.data}}}))
        .catch( (error) => console.log(`error`, error))
    }
}