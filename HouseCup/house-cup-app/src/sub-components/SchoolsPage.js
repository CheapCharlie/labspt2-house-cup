import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
//components
import SideMenu from './SideMenu';
import auth from '../utils/Auth.js';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            authProfile: [],
            authPassword: '',
            houseList: [],
            newSchool: false,
            newSchoolName: '',
            newSchoolCity: '',
            newSchoolDescription: '',
        }
    }
    componentDidMount() {
        axios.get('https://labspt2-housecup.herokuapp.com/schools')
            .then(response => {
                if (response) {
                    // console.log(response.data.data.schools)
                    this.setState({ schoolsList: response.data.data.schools })
                    // console.log(`Line 30`,this.state.schoolsList);
                } else {
                    console.log(`There is no response from the server`);
                }
            })
            .catch(err => console.log(err))

    }
    // addUser = e => {
    //     axios.post('https://labspt2-housecup.herokuapp.com/users/register', {
    //         email: this.state.authProfile.email,
    //         password: this.state.authPassword,
    //     })
    //         .then(response => {
    //             console.log(response);
    //             // this.setState({
    //             //     schoolsList: response.data.data
    //             // })
    //         })
    // }



 addSchool = (e) => {
            e.preventDefault();
            const { getAccessToken } = auth;
            const newSchool = {
                name:this.state.newSchoolName,
                city:this.state.newSchoolCity
            }
           
            if(newSchool) {
            const headers = { Authorization: `Bearer ${getAccessToken()}` };    
            axios.post('https://labspt2-housecup.herokuapp.com/schools', newSchool, {headers} )
                 .then( school => {
                        let newSchool = school.data.data.newSchool;
                        this.setState({
                            schoolsList: [...this.state.schoolsList, newSchool]
                        })
                     }).catch(err => {
                        console.log(err);
                    });
          } else {
              console.log(`Please add newSchool`);
          }
            console.log(`school ${this.state.newSchoolName} added!`);
           
            this.setState({
                newSchoolName:'',
                newSchoolCity: ''
            });
    }

    handleSchoolInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    newSchoolToggle = e => {
        this.setState(preState => ({
            newSchool: !preState.newSchool
        }))
    }

    render() {
        return (
            <div className='schools-page'>
                <SideMenu {...this.props} />
                <div className='schools-container'>
                    <div className={ this.state.newSchool ? 'new-school new-school-expand' : 'new-school new-school-collapse'} onClick={this.newSchoolToggle.bind(this)}>
                        <h2 className='new-school-txt'>Add New School</h2>
                        <div className='add-school-inputs'>
                            <form 
                            className={this.state.newSchool ? 'new-school-form' : 'hidden'}
                            onSubmit={this.addSchool} 
                            onClick={event => event.stopPropagation()}>
                                <input
                                    className='new-school-input'
                                    placeholder='name' name='newSchoolName'
                                    value={this.state.newSchoolName}
                                    onChange={this.handleSchoolInput} />
                                <input
                                    className='new-school-input'
                                    placeholder='city'
                                    name='newSchoolCity'
                                    value={this.state.newSchoolCity}
                                    onChange={this.handleSchoolInput}></input>
                                {/* <input className='schoolDescription' placeholder='description' name='newSchoolDescription' onChange={this.handleSchoolInput}></input> */}
                                <button className='new-school-button'>+</button>
                            </form>
                        </div>
                    </div>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <div className='school-card'>
                                    <NavLink to={`/admin/schools/${school.id}`} className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                                        <h2 className='school-name'>{school.name}</h2>
                                        <h4 className='school-name'>{school.city}</h4>
                                    </NavLink>
                                    <button>
                                        <NavLink to={`/admin/schools/${school.id}/update`}>
                                            Update:
                                        </NavLink>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SchoolsPage;
