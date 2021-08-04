import React,{useEffect, useState} from 'react'

function UserAuth(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.handleUser(email,password);
    }
    
    return (
        <div className='userAuth' style={{backgroundImage:'https://images.unsplash.com/photo-1532932371123-928bc0091ec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80'}}>
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
                    <h2>Log In to Tinder</h2>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <div className='right__input'>
                            <label>Email</label>
                            <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter the Email'/>
                        </div>
                        <div className='right__input'>
                            <label >password</label>
                            <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the password'/>
                        </div>
                        <button className='userAuth__choicepage--btn' type='submit'>Let's GO</button>
                    </form>
                </div>
                </div>
            {
            /*
            create an account
                email,
                name,
                age,
                imgUrl,
                age,
                gender,
                place

            alreay have n acc
                email,
                password
            */}
        </div>
    )
}

export default UserAuth
