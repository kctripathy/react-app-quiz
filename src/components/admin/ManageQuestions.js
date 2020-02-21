import React, {useState} from 'react';
import Layout from '../pages/Layout';

function ManageQuestion() {

    const newQuestionForm = () =>{
        return(
            <div>
                <select name="questionType" value="1">
                    <option>Multiple Type Questions</option>
                </select>
                <input type="text" name="question" placeholder="Enter the question" />
                {/* <input type="text" name="option-2" placeholder="Enter the Option - 2" />                
                <input type="text" name="option-3" placeholder="Enter the Option - 3" />                
                <input type="text" name="option-4" placeholder="Enter the Option - 4" />   */}
                <option name="isCorrectAnswer">
                    <input type="text" name="option-1" placeholder="Enter the Option - 1" />                                
                </option>              
                <option name="isCorrectAnswer">
                    <input type="text" name="option-2" placeholder="Enter the Option - 2" />                                
                </option>              
            </div>
    );
}
    return (  
        <Layout>
            <div className="row">
                    <div className="col-12">
                        <h4>&nbsp;Manage Question</h4>   
                    </div>                    
            </div>  
            <div className="row">
                <div className="col-3">&nbsp;</div>
                <div className="col-9">{newQuestionForm()}</div>
            </div>     
        </Layout>               
    );
}

export default ManageQuestion;