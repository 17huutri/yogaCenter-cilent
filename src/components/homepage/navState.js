import { useState } from 'react';

export const useNavState = () => {
    const [activeNavItem, setActiveNavItem] = useState(null);

    const setActiveItem = (index) => {
        setActiveNavItem(index);
    };

    return {
        activeNavItem,
        setActiveItem,
    };
};
