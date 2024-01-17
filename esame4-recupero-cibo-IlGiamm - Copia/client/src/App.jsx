import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import API from './API'

function App() {
  const [count, setCount] = useState(0)
  const [dirty, setDirty] = useState(true)
  const [restaurants, setRestaurants] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  /* useEffect(() => {
     const init = async () => {
       try {
         setLoading(true);
         const user = await API.getUserInfo();  
         setUser(user);
         setLoggedIn(true); 
         setLoading(false);
       } catch (err) {
         handleErrors(err); 
         setUser(null);
         setLoggedIn(false);
         setLoading(false);
       }
     };
     init();
   }, []);  */

  useEffect(() => {
    API.getRestaurant()
      .then(r => {
        setRestaurants(r);
        setDirty(false);
      })
      .catch(e => {
        setErrorMsg(e);
      });
  }, [dirty]
)
  /*function handleErrors(err) {

    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }
    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000); 
  }*/

  return (
    <>
      <table className="table table-hover">
        <thead >
          <tr>
            <th scope="col">Ristorante</th>
            <th scope="col">Indirizzo</th>
            <th scope="col">Telefono</th>
            <th scope="col">Tipo Cucina</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r)=>
            <tr key={r.id}>
              <th scope="row"> {r.nome} </th>
              <td>{r.indirizzo}</td>
              <td>{r.telefono}</td>
              <td>{r.categoria}</td>
            </tr>

          )}
          
        </tbody>
      </table>
    </>
  )


}

export default App
