# **Title**

  This is the documentation for the backend server .
  The server is made by express-generator 

* **URL**

    It runs at **port : 9320**
  ```  
  http://localhost:9320 
  ```

* **Method:**
  
  <The Methods used in the server are >

  `GET` | `POST` | `DELETE` | `PUT`
  
# The Routes

* **`/users/`**
    * **METHOD**<br />
        * **GET**
    
    * **Success Response:**
        * **Code:** 200 <br />
        **Content:** `{ id : 12 }`
    
    * **Error Response:**
        

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "Log in" }`

    * **Sample Call:**
        ```
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
        ```
        
* **`/users/register`**
    
    * **Success Response:**
        * **Code:** 200 <br />
        **Content:** `{ id : 12 }`
    
    * **Error Response:**
        

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "Log in" }`

    * **Sample Call:**
        ```
        const data = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password,
            imgUrl:imgUrl,
            age:age,
            gender:gender
        };

        async function registerUser(){
            await axiosInstance.post('/users/register',data)
            .then((resp) => { 
                if(resp.status < 400){
                console.log(resp);
                history.replace('/cards');}
                else{
                    alert('Something Went Wrong');
                }
            })
            .catch((err) => {
                alert('Something Went Wrong');
            })
        }
        ```
* **`/users/signin`**
    
    * **Success Response:**
        * **Code:** 200 <br />
        **Content:** `{ id : 12 }`
    
    * **Error Response:**
        

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "Log in" }`

    * **Sample Call:**
        ```
        async function signinUser(){
            await axiosInstance.post(`/users/signin`,{
                email:email,
                password:password
            })
            .then((resp) => { 
                if(resp.status < 400){

                    history.replace('/cards');}
                    else{
                        alert('Something Went Wrong');
                    }})
            .catch((err) => {
               alert('Something Went Wrong');
            })
        }
        ```
* **`/users/logout`**
    
    * **Success Response:**
        * **Code:** 200 <br />
        **Content:** `{ id : 12 }`
    
    * **Error Response:**
        

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "Log in" }`

    * **Sample Call:**
        ```
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
        ```
* **`/matchlist/match`**
    
    * **Success Response:**
        * **Code:** 200 <br />
        **Content:** `{ id : 12 }`
    
    * **Error Response:**
        

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "Log in" }`

    * **Sample Call:**
        ```
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
        ```