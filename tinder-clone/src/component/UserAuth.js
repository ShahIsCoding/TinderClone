import React,{ useState} from 'react'
import { useHistory } from 'react-router';
import {Form,FormGroup,Label,Input,Button,} from 'reactstrap';
import  {axiosInstance} from '../axios'; 

function UserAuth(props) {

    const [firstname, setfirstName] = useState('')
    const [lastname, setlastName] = useState('')
    const [email, setEmail] = useState('');
    const [imgUrl, setimgUrl] = useState('');
    const [age,setAge]= useState(16);
    const [gender,setGender]= useState('Male');

    const [page,setPage]=useState(true);
    const history = useHistory();


    const handleSubmit = (e) =>{
        e.preventDefault();

        const data = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            imgUrl:imgUrl,
            age:age,
            gender:gender
        };
        var id ='61121b45cc35153b1cce9fc8';
        (page)?
            axiosInstance.post('/users',data)
            .then((resp) => { 
                id = resp.data._id;
                history.replace('/cards');
            })
            .catch((err) => {
                alert(err.response.data);
            })
        :
            axiosInstance.get(`/users/${email}`)
            .then((resp) => {
                id = resp.data._id;          
                history.replace('/cards');
            })
            .catch((err) => {
               console.log(err);
            });
            props.handleUser(id);           
    }
    return (
        <div className='userAuth' >
            <div className='userAuth__choicepage'>
                <div className='userAuth__choicepage--left'>
                    <img 
                        className='header__logo'
                        src='https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png'
                        alt='tinder__logo'
                    />
                    <h3>Tinder Clone</h3>
                </div>
                <div className='userAuth__choicepage--right'>
                    {page?
                        <h2>Log In to Tinder</h2>
                    :
                    <h2>SignIn In to Tinder</h2>
                    }
                    <div className='right__btns'>
                        <Button className={page? 'pnk btn__login' : 'wht btn__login' }  onClick={() => setPage(true)} >LogIn</Button>
                        <Button className={(page)? 'wht btn__signup' : 'pnk btn__signup'} onClick={() => setPage(false)}  >Signup</Button>
                    </div>
                    <hr/>
                    <Form onSubmit={handleSubmit}>
                        {page?
                            <div className='signupPage'>
                                <div className='Namediv'>
                                    <FormGroup className='right__input name firstname'>
                                        <Label>First Name</Label>
                                        <Input type='text' name='firstname' value={firstname} onChange={(e)=>setfirstName(e.target.value)} placeholder='Enter First Name' />
                                    </FormGroup>
                                    <FormGroup className='right__input name'>
                                        <Label>Last Name</Label>
                                        <Input type='text ' name='lastname' value={lastname} onChange={(e)=>setlastName(e.target.value)} placeholder='Enter Last Name' />
                                    </FormGroup>
                                </div>
                                <div className='Numberdiv'>
                                    <FormGroup className='gender'>
                                        <Label>Gender</Label>
                                        <Input type="select" name="gender"  value={gender} onChange={(e)=>setGender(e.target.value)}  >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Age</Label>
                                        <Input type='number' name='age' value={age} onChange={(e)=>setAge(e.target.value)} placeholder='16+' />
                                    </FormGroup>
                                </div>
                            </div>                 
                        :null
                        }<FormGroup className='right__input'>
                            <Label>Email</Label>
                            <Input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter the Email' />
                        </FormGroup>
                        <FormGroup  className='right__input'>
                            <Label>password</Label>
                            <Input  type='text' name='imgUrl' value={imgUrl} onChange={(e)=>setimgUrl(e.target.value)} placeholder='Enter the imgUrl' />
                        </FormGroup>
                        <Button type='submit' className='wht'>Let's Go</Button>
                    </Form>
                </div>
                </div>
        </div>
    )
}

export default UserAuth
