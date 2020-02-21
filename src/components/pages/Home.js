import React from 'react';
import Layout from './Layout';

function Home() {
    return (
        <Layout>
            <br/>
            <div className="jumbotron">
                <h1>Online Quiz</h1>  
                <hr/>
                <h4>Creating and playing with questions becomes more easy with our online quiz software!</h4> 
                <hr/>              
                <p>Always wanted to make a quiz, but couldn't find an easy quiz creator to help you out?</p>
                <p> With our online quiz tool it’s easy to make a quiz in less than five minutes.</p>
            </div>
            <div className="row">
                <div className="col-4">
                    <p className="text-center">
                        <i class="fa fa-trophy fa-2x"></i>
                        <h3>Easy to use</h3>
                    </p>                    
                    <p>Our quiz creator is simple and easy to use. For student as well as for the administrators. With our online quiz creator it's easy to start, which makes it more fun.</p>
                </div>
                <div className="col-4">
                    <p className="text-center">
                        <i class="fa fa-2x fa-certificate"></i>
                        <h3>Looks great on all devices</h3>
                    </p>
                    <p>It doesn't matter if you are on a phone, tablet or pc: your online quiz will look beautiful. Our quiz creator is fully responsive, so you can engage your audience on any platform.</p>                    
                </div>
                <div className="col-4">
                    <p className="text-center">
                        <i class="fa fa-2x fa-life-ring"></i>
                        <h3>Awesome support</h3>
                    </p>                    
                    <p>Do you have any questions about our online quiz software? Our support owls are always by your side and provide you with the best possible support!</p>                    
                </div>
            </div>            
        </Layout>
    );
}

export default Home;