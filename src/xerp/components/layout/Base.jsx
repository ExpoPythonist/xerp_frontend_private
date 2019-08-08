import React from 'react';
import { Header, Footer, Sidebar } from '../common';
import Offsidebar from './Offsidebar';


const Base = props => (
    <div className="wrapper">
        <Header />

        <Sidebar />

        <Offsidebar />

        <section className="section-container">
            {props.children}
        </section>

        <Footer />
    </div>
)

export {
    Base
}
