import React, { useState, useEffect } from 'react'

const OptionCard = (props) => 
{
    function onRemoveOptionClick()
    {
        props.onRemoveOptionClick(props.text)
    }
    return (
        <div className="optionCard">
           {props.text}
           {props.disableRemove?'':
           <input type="button" className="optionRemoveBtn" value="x" onClick={onRemoveOptionClick}/>
           }
           </div>
    )
}


const QuestionCard = (props) => 
{
    const [options, setOptions] = useState(props.question.options)
  
    function onQuestionRemoveClick()
    {
        props.onQuestionRemoveClick(props.question.question)
    }

    return (
        <div className="questionCard">

            <input type="button" className="questionRemoveBtn" value="x" onClick={onQuestionRemoveClick}/>

            <div className="questionWrapper">
                {props.question.question}
            </div>
            
            {options.map((opt)=>  <OptionCard text={opt} disableRemove={true}/>)}
        </div>
    )
}

export {OptionCard, QuestionCard}
