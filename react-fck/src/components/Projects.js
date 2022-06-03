import axios from "axios";
import React from "react";

const ORIGIN_URL = 'http://localhost:8000/api/';
const PROJECTS_ENDPOINT = 'projects/';

// const Projects = () => {
//     axios.get(`${ORIGIN_URL}${PROJECTS_ENDPOINT}`)
//         .then((response) => {
//             const projects = response.data.results;
//             const projectsList = projects.map(
//                 (project) => <li key={project.id.toString()}>project.name</li>);

//             return (
//                 <ul>
//                     {projectsList}
//                 </ul>
//             )
//         })
//         .catch((error) => console.log(error))
// }
const Projects = ({ projects }) => {
    // const projects = projectsData.results;
    console.log("from projects: ", projects);
    // console.log("projects: ", projects)
    const projectsList = projects.map((project) => <li key={project.id}>{project.name}</li>)
    return (
        <ul>
            {projectsList}

        </ul>
    );
}

export default Projects;