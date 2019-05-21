import React from 'react';
import { NavLink } from 'react-router-dom';

class PublicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    
    render() {
        return (
            <div className='public-page'>
                <NavLink to='/admin'><span className='sign-in'><u>Sign In</u></span></NavLink>
                <sideMenu />
                <div className='house-list'>
                    {this.props.houseList.map((eachHouse) => {
                        return (
                            <div className='each-house' key={eachHouse.number}>
                                <span><h5 className='house-number'>{eachHouse.number}</h5></span>
                                <h2 className='house-name'>{eachHouse.name}</h2>
                                <h3 className='point-total'>{eachHouse.pointTotal}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default PublicPage;
