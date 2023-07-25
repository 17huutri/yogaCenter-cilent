import React from "react";
import Header from "./homepage/Header";
import Content from "./gradeBookingcontent/content.js";
import Footer from "./homepage/Footer";
export default function GradeBooking() {
    return (
        <div className='overflow-hidden'>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}