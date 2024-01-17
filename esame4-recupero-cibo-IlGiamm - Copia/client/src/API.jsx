

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
    // server API always return JSON, in case of error the format is the following { error: <message> } 
    return new Promise((resolve, reject) => {
      httpResponsePromise
        .then((response) => {
          if (response.ok) {
            // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
            response.json()
              .then(json => resolve(json))
              .catch(err => reject({ error: "Cannot parse server response" }))
  
          } else {
            // analyzing the cause of error
            response.json()
              .then(obj =>
                reject(obj)
              ) // error msg in the response body
              .catch(err => reject({ error: "Cannot parse server response" })) // something else
          }
        })
        .catch(err =>
          reject({ error: "Cannot communicate" })
        ) // connection error
    });
  }
  /**
   * All the API calls
   */
  
  
  
  const URL = 'http://localhost:3001/api/';
  
  
  /**
   * This function return the list of restaurant
   * GET WITHOUT AUTH
   */
  
  
  async function getRestaurant() {
    // call  /api/ristoranti
    const response = await fetch(URL + 'ristoranti');
    const restaurants = await response.json();
    if (response.ok) {
      return restaurants.map((r) => ({id:r.ID,  nome:r.Ristorante , indirizzo: r.Indirizzo ,telefono: r.Tel,categoria: r.Categoria}))
    } else {
      throw restaurants;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }
  
  /**
   * This function receive the airplane Type as parameter. If the plane exist , it return the list of seats for the selected airplane
   * GET WITH AUTH
   */
  
  
  async function getUserSeats() {
    // call  /api/userReservation
    const response = await fetch(URL + 'user/reservation', {
      method: 'GET',
      credentials: 'include'
    });
    const seats = await response.json();
    if (response.ok) {
      return seats.map((s) => ({ planetype: s.planetype, id: s.seatId, status: s.status }))
    } else {
      throw seats;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }
  
  
  
  /**
   * This function wants a seats list as parameter and a plane type. If the plane exists, it updates the status of seats in the server side.
   * PUT WITH AUTH
   */
  function bookSeats(seatsId, planeType) {
  
    return getJson(
      fetch(URL + `book/${planeType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ "seatsId": seatsId }),
      })
    )
  
  
  }
  
  
  /**
   * API FOR AUTHENTICATION
   */
  
  /**
   * This function wants username and password inside a "credentials" object.
   * It executes the log-in.
   */
  const logIn = async (credentials) => {
    return getJson(fetch(URL + 'sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // this parameter specifies that authentication cookie must be forwared
      body: JSON.stringify(credentials),
    })
    )
  };
  
  /**
   * This function is used to verify if the user is still logged-in.
   * It returns a JSON object with the user info.
   */
  const getUserInfo = async () => {
    return getJson(fetch(URL + 'sessions/current', {
      // this parameter specifies that authentication cookie must be forwared
      credentials: 'include'
    })
    )
  };
  
  /**
   * This function destroy the current user's session and execute the log-out.
   */
  const logOut = async () => {
    return getJson(fetch(URL + 'sessions/current', {
      method: 'DELETE',
      credentials: 'include'  // this parameter specifies that authentication cookie must be forwared
    })
    )
  }
  
  
  
  
  const API = {
    getRestaurant, getUserSeats, getUserInfo, logOut, logIn, bookSeats,
  };
  export default API;