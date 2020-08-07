import React from 'react';

const About = props => {
    return (
        <div className="menu-container">
            <div>
                <img className="gabinas-food-image" alt="" src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/102812508_3104065819632627_1979206727264146210_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=wIZ4SFGq9pwAX9j8vkA&_nc_ht=scontent-lax3-1.xx&oh=814b9d314714bc066227193233f16d58&oe=5F52F102" />
            </div>
            <div className="gabinas-schedule">
                <h1> Farmer's Market Schedules </h1>
                <h2>Tuesday:</h2>
                <ul>Chula Vista – Otay Ranch Certified Farmers’ Market</ul>
                <li> Winter 3:00PM – 7:00PM </li>
                <li> Summer 4:00PM - 8:00PM </li>
                <br></br>
                <h3>Wednesday:</h3>
                <ul>Ocean Beach Certified Farmers’ Market and Wednesday Night Out</ul>
                <li> Summer 4:00PM - 8:00PM </li>
                <br></br>
                <h3>Thursday:</h3>
                <ul>San Diego – Linda Vista Certified Farmers' Market</ul>
                <li> 3:00PM – 7:00PM </li>
                <br></br>
                <h3>Friday:</h3>
                <ul>Imperial Beach Certified Farmers’ Market</ul>
                <li> 2:00PM - 7:00PM </li>
            </div>
        </div>
    )
}

export default About;