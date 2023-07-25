import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import '../../styles/Nav.css';

function BackToTopButton() {
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: 'easeInOutQuart',
        });
    };

    return (
        <div className="back-to-top">
            <button onClick={scrollToTop}>
                <span className="arrow-up"></span> Back to Top
            </button>
        </div>
    );
}

export default BackToTopButton;