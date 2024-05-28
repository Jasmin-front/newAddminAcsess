import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddAnketa from "./AddAnketa/AddAnketa.jsx";
import Home from "./Home/Home.jsx";
import Status from "./Status/Status.jsx";
import Country from "./Country/Country.jsx";
import './Pages.css'
const Pages = () => {
    return (
        <div className='pages'>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/status' element={<Status/>}/>
                <Route path='/country' element={<Country/>}/>
                <Route path='/addAnketa' element={<AddAnketa/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </div>
    );
};

export default Pages;