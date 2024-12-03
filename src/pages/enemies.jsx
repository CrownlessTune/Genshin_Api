import React, { useState } from 'react';
import LayoutPublic from '../layout/PublicLayout';
import EnemiesSearch from '../components/EnemiesSearch';


const Enemies = () => {

  return(
    <LayoutPublic>
      <h1>Enemies</h1>
      <EnemiesSearch></EnemiesSearch>

    </LayoutPublic>


  );


}


export default Enemies;
