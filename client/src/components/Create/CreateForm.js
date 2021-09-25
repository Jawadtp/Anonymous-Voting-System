import React from 'react'
import { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import {OptionCard, QuestionCard} from './FormComponents';
import axios from 'axios'

const CreateForm = () => {

    function dateFormatter()
    {
        var date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
    }

    const [startTime, onStartTimeChange] = useState(new Date());
    const [expiryTime, onExpiryTimeChange] = useState(dateFormatter()); //Default expiry time is 7 days after start time.
    const [options, setOptions] = useState([])
    const [questions, setQuestions] = useState([])



    function onAddOptionClick()
    {
        const option = document.getElementById('optionInput').value.trim()
        if(option.length && !options.includes(option))
            setOptions([...options, option])
    }

    function removeOption(optionText)
    {
        setOptions(options.filter(opt => opt!=optionText))
    }

    function onQuestionRemoveClick(question)
    {
        setQuestions(questions.filter(quest => quest.question!=question))
    }

    function onAddQuestionClick()
    {
        const questionText = document.getElementById('questionInput').value.trim()

        if(!questionText.length || options.length<2)
            return alert('Not enough options added or invalid question')

        var isQuestionUnique = true

        questions.every(function(question, index) 
        {
            if(questionText==question.question) 
            {
                isQuestionUnique=false
                return false
            }
            return true
        })

        if(!isQuestionUnique) return alert('This question has already been added.')
        const question = 
        {
            'question': questionText,
            'options': options
        }

        console.log(question)
        setQuestions([...questions, question])
    }

    function onSubmitPollClick()
    {
        const token = localStorage.getItem('token')
       
        const pollData = 
        {
            'name': document.getElementById('pollname').value.trim(),
            'desc': document.getElementById('polldesc').value.trim(),
            'starttime':startTime,
            'expirytime':expiryTime,
            'questions': questions
        }

        axios.post('http://localhost:5000/create', pollData,  {headers: {Authorization: 'Bearer ' + token}},).then(
            (response) => {
                console.log(response.data)
                
            },
            (error) => {
                console.log(error);
            }
        );
    }

    
    useEffect(()=>
    {
      
    })

    return (
        <div>
            <div className="container createPollWrapper">
                <div className="createPollTitle">
                    Create a new poll
                </div>
                <div className="pollInfo">
                    <input type="text" className="createInput" id="pollname" placeholder="Poll name"/>
                    <input type="text" className="createInput" id="polldesc" placeholder="Poll description"/>
                    
                    <div className="timeInputWrapper">
                        <div className="activeFrom timeInput">
                            Active from:
                            <div className="datePickerElementWrapper">
                            <DateTimePicker className="timePicker" onChange={onStartTimeChange} value={startTime}/> 
                            </div>
                        </div>   
                        <div className="expireTime timeInput">
                            Active to:
                            <div className="datePickerElementWrapper">
                            <DateTimePicker  className="timePicker" onChange={onExpiryTimeChange} value={expiryTime}/>   
                            </div>
                        </div>           
                    </div>
                </div>

                {questions.length?
                    
                    <div className="addedQuestions">
                        <div className="createPollTitle">
                            Added questions
                        </div>
                        {questions.map((quest)=> <QuestionCard question={quest} onQuestionRemoveClick={onQuestionRemoveClick}/>)}
                    </div>
                    :
                    ''
                }
                
                <div className="questionAddWrapper">
                    <div className="createPollTitle">
                        Add a question
                    </div>
                    <input type="text" className="createInput" id="questionInput" placeholder="What's your question?"/>
                    <div className="optionsWrapper">
                        {options.length?options.map((opt)=>  <OptionCard text={opt} onRemoveOptionClick={removeOption} disableRemove={false}/>):'' }
                    </div>
                    <div className="optionAdder">
                        <input type="text" className="createInput" id="optionInput" placeholder="Enter an option"/>
                        <input type="button" className="addOptionBtn" value="+" onClick={onAddOptionClick}/>
                    </div>
                </div>
                <div className="footerBtns">
                    <input type="button" className="btn btn-warning footerBtn addQuestionBtn" value="Add question" onClick={onAddQuestionClick}/>
                    <input type="button" className="btn btn-primary footerBtn submitPollBtn" value="Submit Poll" onClick={onSubmitPollClick}/>
                </div>
            </div>
        </div>
    )
}

export default CreateForm
