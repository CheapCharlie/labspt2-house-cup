 import React from 'react';
import SideMenu from './SideMenu';
import axios from 'axios';
import auth from '../utils/Auth.js';

class ModifySchoolPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            school: [],
            name: '',
            city: '',
            newName: '',
            newCity: '',
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        // console.log(id);
        axios.get(`http://localhost:5000/schools/${id}`)
            .then(response => {
                this.setState({school: response.data.data.school})
                // this.setState({name: response.data.data.school.name })
                // this.setState({city: response.data.data.school.city})
            })
            .catch(err => {
                console.log('error line 22', err)
            })
    }

    deleteSchool = e => {
        // e.preventDefault();
        const {getAccessToken} = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        const id = this.props.match.params.id;
        console.log(id);
        console.log(headers);
        axios.delete(`http://localhost:5000/schools/${id}`, {headers})
            .then(response => {
                console.log('success', response)
                this.props.history.goBack();
            })
            .catch(err => {
                console.log(`error`, err)
            })
    }

    handleSchoolInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };
    updateSchool = e => {
        const {getAccessToken} = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}`};
        const id = this.props.match.params.id;
        console.log(headers, 'updateSchool headers');
        console.log(id, 'updateSchool id');
        const updatedSchool = {
            name: this.state.newName,
            city: this.state.newCity,
            user_id: id
        }
        axios.put(`http://localhost:5000/schools/${id}`, updatedSchool, { headers })
            .then(response => {
                console.log('success! front end request: updateSchool', response)
                this.props.history.goBack();
            })
            .catch(err => {
                console.log(`error! front end request: updateSchool`, err)
            })
    };

    render() {
        return (
            <div className='modify-school-page'>
                <SideMenu/>
                <div className='school-card'>
                    <h2>{this.state.school.name}</h2>
                    <h4>{this.state.school.city}</h4>
                </div>
                <div className='modify-functions'>
                    <div className='update-section'>
                        <input className='new-name-input' name='newName' placeholder='new name here' onChange={this.handleSchoolInput}></input>
                        <input className='new-city-input' name='newCity' placeholder='new city here' onChange={this.handleSchoolInput}></input>
                        <button className='update-button' onClick={this.updateSchool}>Update</button>
                    </div>
                    <button className='delete-button' onClick={this.deleteSchool}>Delete</button>
                </div>
            </div>
        )
    }
}

export default ModifySchoolPage;