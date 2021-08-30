import React,{ useState} from 'react'
import { useHistory } from 'react-router';
import {Form,FormGroup,Label,Input,Button,} from 'reactstrap';
import  {axiosInstance} from '../axios'; 

function UserAuth(props) {

    const [firstname, setfirstName] = useState('')
    const [lastname, setlastName] = useState('')
    const [email, setEmail] = useState('');
    const [password,setpassword] = useState('');
    const [imgUrl, setimgUrl] = useState('');
    const [age,setAge]= useState(16);
    const [gender,setGender]= useState('Male');

    const [page,setPage] =  useState(true);
    const history = useHistory();


    const handleSubmit = (e) =>{
        e.preventDefault();
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
        (page)? registerUser() : signinUser()
    }
    return (
        <div className='userAuth' >
            <div className='userAuth__choicepage container'>
                <div className="row">
                    <div className='userAuth__choicepage--left col-sm-4'>
                        <img 
                            className='header__logo row'
                            src='https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png'
                            alt='tinder__logo'
                        />
                        <h3 className='row'>Tinder Clone</h3>
                    </div>
                    <div className='userAuth__choicepage--right col-sm-8'>
                        {page?
                            <h2>Sign Up In to Tinder</h2>                        
                        :
                            <h2>Log In to Tinder</h2>
                        }
                        <div className='right__btns'>
                            <Button className={page? 'pnk right__btns--btn' : 'wht right__btns--btn' }  onClick={() => setPage(true)} >Signup</Button>
                            <Button className={(page)? 'wht right__btns--btn' : 'pnk right__btns--btn'} onClick={() => setPage(false)}  >LogIn</Button>
                        </div>
                        <hr/>
                        <Form onSubmit={(e)=> handleSubmit(e)}>
                            {page?
                                <div className='signupPage'>
                                    <div className='Namediv row'>
                                        <FormGroup className='right__input name firstname formgrp col-sm-7'>
                                            <Label>First Name</Label>
                                            <Input type='text' name='firstname' value={firstname} onChange={(e)=>setfirstName(e.target.value)} placeholder='Enter First Name' />
                                        </FormGroup>
                                        <FormGroup className='right__input name formgrp col-sm-5'>
                                            <Label>Last Name</Label>
                                            <Input type='text ' name='lastname' value={lastname} onChange={(e)=>setlastName(e.target.value)} placeholder='Enter Last Name' />
                                        </FormGroup>
                                    </div>
                                    <div className='Numberdiv row'>
                                        <FormGroup className='gender col-sm-4 formgrp'>
                                            <Label>Gender</Label>
                                            <Input type="select" name="gender"  value={gender} onChange={(e)=>setGender(e.target.value)}  >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup className='col-sm-3 formgrp'>
                                            <Label>Age</Label>
                                            <Input type='number' name='age' value={age} onChange={(e)=>setAge(e.target.value)} placeholder='16+' />
                                        </FormGroup>
                                        <FormGroup  className='right__input col-sm-5 formgrp'>
                                            <Label>ImgUrl</Label>
                                            <Input  type='text' name='imgUrl' value={imgUrl} onChange={(e)=>setimgUrl(e.target.value)} placeholder='Enter ImgUrl' />
                                        </FormGroup>
                                    </div>
                                </div>                 
                            :null
                            }<FormGroup className='right__input formgrp'>
                                <Label>Email</Label>
                                <Input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter the Email' />
                            </FormGroup>
                            <FormGroup  className='right__input formgrp'>
                                <Label>password</Label>
                                <Input  type='password' name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter the imgUrl' />
                            </FormGroup>
                            <Button type='submit' className='btnsubmit'>Let's Go</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAuth
