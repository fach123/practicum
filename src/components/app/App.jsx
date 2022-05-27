import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import style from './App.module.css';
import '../../index.css';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then(response => {
                if(response.ok){
                response.json().then(data => setApiData(data))
                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <>
            <AppHeader/>
            <div className={style.inner}>
                {apiData && <BurgerIngredients apiData={apiData} />}
                {apiData && <BurgerConstructor apiData={apiData}/>}
            </div>
        </>
    );
}

export default App;
