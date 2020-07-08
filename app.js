class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      view: "add post",
      name: "",
      image: "",
      body: "",
      id: ""
    }
    this.prepareEdit = this.prepareEdit.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  switchView = (event) => {
    this.setState({
      view: event.target.value
    })
  }

  componentDidMount = () => {
    this.getPosts();
  }

  handleChange = (event) => {
    this.setState(
      {
       [event.target.name]: event.target.value
      }
    )
  }

  createPost = () => {
    axios.post(
      'http://127.0.0.1:8888/posts',
      {
        name: this.state.name,
        image: this.state.image,
        body: this.state.body
      }
    ).then(
      (response) => {
        console.log(response);
        this.setState(
          {
            name: "",
            image: "",
            body: ""
          },
          () => {
            this.getPosts();
          }
        )
      }
    )
  }

  getPosts = () => {
    axios.get(
      'http://127.0.0.1:8888/posts'
    ).then(
      (response) => {
        console.log(response);
        this.setState(
          {
            posts: response.data
          }
        )
      }
    )
  }

  editPost = () => {
    console.log(this.state);
    axios.put(
      'http://127.0.0.1:8888/posts/' + this.state.id,
      {
        name:this.state.name,
        age: this.state.image,
        body: this.state.body
      }
    ).then((response) => {
      console.log(response);
      this.getPosts();
    })
  }

  prepareEdit = (index) => {
    this.setState(
      {
        id: this.state.posts[index].id,
        name: this.state.posts[index].name,
        image: this.state.posts[index].image,
        body: this.state.posts[index].body,
        view: "edit"
      }
    )
  }

  deletePost = (index) => {
    event.preventDefault();
    axios.delete('http://127.0.0.1:8888/posts/' + this.state.posts[index].id).then((response) => {
      console.log(response);
      this.getPosts();
    })
    
  }

  render = () => {
    let view;

    if(this.state.view === 'add post'){
      view =
      <div>
        <h2>NAVIGATE</h2>
        <button type="submit" value="home" onClick={this.switchView}>HOME</button>
        <button type="submit"value="add post" onClick={this.switchView}>ADD POST</button>
        <form>
          <input type="text" placeholder="name" name="name" value={this.state.name} required onChange={this.handleChange} autoComplete="off"/>
          <input type="url" placeholder="image" name="image" value={this.state.image}  onChange={this.handleChange} autoComplete="off"/><br/>
          <input type="text" placeholder="body" name="body" value={this.state.body} onChange={this.handleChange} autoComplete="off"/><br/>
          <button type="submit" onClick={ this.createPost }>Share</button>
        </form>
      </div>
    } else if(this.state.view === "home"){
      view = 
      <div>
        <h2>NAVIGATE</h2>
          <ul>
            {
              this.state.posts.map(
                (data, index) => {
                  return <li key={index}>
                  <div>{ data.name }</div>
                  <img src={ data.image }/>
                  <div>{ data.body }</div>
                  <button onClick={() => {
                    this.deletePost(index);
                  }}>DELETE</button>
                  <button onClick={() => {
                    this.prepareEdit(index)
                  }
                  } value="edit">EDIT</button>
                  </li>
                }
              )
            }
          </ul>
        <button type="submit" value="home" onClick={this.switchView}>HOME</button>
        <button type="submit"value="add post" onClick={this.switchView}>ADD POST</button>
      </div>
    } else {
      view =
      <div>
        <h2>NAVIGATE</h2>
        <h2>Edit Post</h2>
        <button type="submit" value="home" onClick={this.switchView}>HOME</button>
        <button type="submit"value="add post" onClick={this.switchView}>ADD POST</button>
        <form>
          <input type="text" placeholder="name" name="name" value={this.state.name} required onChange={this.handleChange} autoComplete="off"/>
          <input type="url" placeholder="image" name="image" value={this.state.image}  onChange={this.handleChange} autoComplete="off"/><br/>
          <input type="text" placeholder="body" name="body" value={this.state.body} onChange={this.handleChange} autoComplete="off"/><br/>
          <button type="submit" onClick={ this.editPost }>Edit Post</button>
        </form>
      </div>
    }
      return <div>

          <h2>Grapevine</h2>
          { view }
      </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
);