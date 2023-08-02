import React from "react";
import Header from "./homepage/Header";
import Content from "./gradeBookingcontent/content.js";
import Footer from "./homepage/Footer";
export default function GradeBooking() {
    return (
        <div className='overflow-hidden'>
            <div className="px-8">
                <Header /></div>
            <Content />
            <Footer />
        </div>
    )
}