/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: footer for the website which contains a link to About Us, FAQ, Contact Us and Comment and Concerns Form"
 *
 */

import React from 'react';
import '../../tailwind.output.css';


const Footer = () => {
    return (
        <div>
            <footer>
                <a href="#">About Us </a>
                <a href="#">FAQ </a>
                <a href="#">Contact Us </a>
                <a href="#">Comment & Concerns Form </a>
            </footer>
            <div>
                <p> Home Together Canada 2020 - All Rights Received</p>
            </div>
        </div>
    )
}

export default Footer;