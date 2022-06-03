import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, Link, useRoutes } from 'react-router-dom';
// import Projects from './components/Projects'
// import Project from './components/Project';
// import ToDo from './components/ToDo';
// import User from './components/User';
// import Header from './components/Header';
import NotFound from './components/NotFound';
import axios from 'axios';

const PROJECTS_ENDPOINT = 'projects/';
const USERS_ENDPOINT = 'users/';
const TODOS_ENDPOINT = 'todos/';

const client = axios.create({ baseURL: "http://localhost:8000/api" });


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: {}, users: {}, todos: {} }
  }


  componentDidMount() {
    client.get(PROJECTS_ENDPOINT).then(
      response => {
        const data = response.data
        // console.log("Projects from axios: ", data)
        this.setState({ projects: data })
        // console.log("STATE: ", this.state)
      }
    ).catch(error => console.log(error))

    client.get(USERS_ENDPOINT).then(
      response => {
        const data = response.data
        this.setState({ users: data })

      }
    ).catch(error => console.log(error))

    client.get(TODOS_ENDPOINT).then(
      response => {
        const data = response.data
        this.setState({ todos: data })

      }
    ).catch(error => console.log(error))
  }

  render() {
    const projects = this.state.projects.results
    const users = this.state.users.results

    return (
      <div className="wrapper" >
        <Menu />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects' element={<Projects data={projects} />} />
              <Route path='/projects/:id/*' element={<Project />} />
              {/* <Route path='/todos' element={<ToDo />} /> */}
              <Route path='/users' element={<Users data={users} />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div >
    )
  }
}

const Menu = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/todos">ToDo</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
}

function Home() {
  return (
    <h1>Hello, DRF! and react...</h1>
  )
}

function Projects({ data }) {
  // console.log("from projects: ", data);
  const projectsList = data.map((project) =>
    <Link to={`/projects/${project.id}`} key={project.id}>
      <li>{project.id}  {project.name}</li>
    </Link>
  )
  return (
    <ul>
      {projectsList}
    </ul>
  );
}

function Project() {
  const params = useRoutes()
  let project = null
  client.get(`${PROJECTS_ENDPOINT}${params.id}`).then(
    response => {
      project = response.data
    }
  )
  return (
    <ul>
      <li>{project.id}  {project.name}</li>
    </ul>
  )
}

function Users({ data }) {
  const usersList = data.map((user) => <li key={user.id}>{user.id}  {user.email}</li>)
  return (
    <ul>
      {usersList}
    </ul>
  )
}

export default App;
