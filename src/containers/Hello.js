const React = require('react')
const connect = require('react-redux').connect
const fetchPosts = require('../actions/helloAct');
//const Transmit = require('react-transmit');

class Hello extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.log(`component will mount`)
    this.props.fetchPost();
  }
  
  componentWillUnmount() {
    console.log(`component will unmount`)
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps`)
    console.log(`${JSON.stringify(nextProps)}`)
  }
  render() {
    if (this.props.posts) {
      console.log(this.props.posts)
      return (
        <div>
          {this.props.posts.data.map((post) => {
            return (
              <div key={post.slug}>{post.title}</div>
            )
          })}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchPost: () => dispatch(fetchPosts())
  }
}

module.exports = exports = connect(mapStateToProps,mapDispatchToProps)(Hello)
/*
exports = module.exports = Transmit.createContainer(Hello, {
  // These must be set or else it would fail to render
  initialVariables: {},
  // Each fragment will be resolved into a prop
  fragments: {
    posts() {
      return butter.post.list().then((resp) => resp.data);
    }
  }
});
*/