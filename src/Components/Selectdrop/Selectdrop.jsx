import React, { useState } from "react";
import './Selectdrop.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Select = ({ data, placeholder = "All Categories" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(placeholder);
    const [listData, setListData] = useState(data);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (index, name) => {
        setSelectedIndex(index);
        setSelectedItem(name);
        setIsOpen(false);
    };

    const filterList = (event) => {
        const keyword = event.target.value.toLowerCase();
        const filteredList = data.filter(item => 
            item.toLowerCase().includes(keyword)
        );
        setListData(filteredList);
    };

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className={`selectDrop ${isOpen ? 'open' : ''}`}>
                <span className="openSelect" onClick={toggleSelect}>
                    {selectedItem}
                    <KeyboardArrowDownIcon className="downArrow" />
                </span>

                {isOpen && (
                    <div className="dropMenu">
                        <div className="searchField">
                            <input 
                                type="text" 
                                placeholder="Search here..." 
                                onChange={filterList}
                                autoFocus
                            />
                            <ul className="searchResult">
                                {listData.length > 0 ? (
                                    listData.map((item, index) => (
                                        <li 
                                            key={index}
                                            onClick={() => handleSelect(index, item)}
                                            className={selectedIndex === index ? 'active' : ''}
                                        >
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="no-result">No results found</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default Select;
