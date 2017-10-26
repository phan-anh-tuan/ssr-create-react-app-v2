const React = require('react')
const Butter = require('buttercms')
const Transmit = require('react-transmit');
require('whatwg-fetch')

const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');
module.exports = exports = class Hello extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(`component did mount`)
    const that = this;
    fetch('/api').then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log(json)
      //that.forceUpdate();
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
    /*setTimeout(() => {
      this.props = { posts : {data: [{ 'slug': '1', 'title': 'title 1'}, 
      { 'slug': '2', 'title': 'title 2'}, 
      { 'slug': '3', 'title': 'title 3'}, 
      { 'slug': '4', 'title': 'title 4'}, 
      { 'slug': '5', 'title': 'title 5'}, 
      { 'slug': '6', 'title': 'title 6'},
      { 'slug': '7', 'title': 'title 7'}]},
      forceUpdate: true}
      this.forceUpdate(() => console.log(`finish get data`))
    }, 1000)*/
  }
  
  componentWillUnmount() {
    console.log(`component will unmount`)
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log(`${JSON.stringify(this.props)}`)
    console.log(`${JSON.stringify(nextProps)}`)
  }

  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps`)
    console.log(`${JSON.stringify(nextProps)}`)
  }
  render() {
    console.log(`Start rendering Hello`)
    return (
      <div>
        {this.props.posts.data.map((post) => {
          return (
            <div key={post.slug}>{post.title}</div>
          )
        })}
      </div>
    );
    /*
    if (this.props.posts) {
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
    }*/
  }
}

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