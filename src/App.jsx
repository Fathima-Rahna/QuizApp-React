import React, { useRef, useState } from 'react'
import './App.css'
import { data } from './assets/data';


function App() {
  let[index,setIndex]=useState(0);
  let[question,setQuestion]=useState(data[index]);
  let[lock,setLock]=useState(false);
  let[score,setScore]=useState(0);
  let[result,setResult]=useState(false)

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1,option2,option3,option4];

  const checkAns= (e,ans) =>{ 
 
if (lock === false){
  if(question.ans==ans){
    e.target.classList.add("correct");
    setLock(true);
    setScore(prevScore => prevScore + 1);
  }else{
    e.target.classList.add("wrong");
    setLock(true);
    option_array[question.ans-1].current.classList.add("correct");
  }

}
   
  }

//for next button
const next = () =>{
 if(lock===true) {
  if(index === data.length -1){
    setResult(true);
    return 0;
  }
  setIndex(++index);
  setQuestion(data[index]);
  setLock(false);
  option_array.map((option)=>{
    option.current.classList.remove("wrong");
    option.current.classList.remove("correct");
    return null;
  })
 }
}

const reset = () =>{
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setLock(false);
  setResult(false);
}

  

  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex flex-column justify-content-center align-items-center  bg-custom  '>
      <h1 className='bg-white p-3 rounded shadow' >Quiz APP</h1>
      {result?<></>:<>
     <div style={{width:'700px'}} className='d-flex flex-column mt-3 bg-white p-5 shadow '>
       <h2>{index+1}/{data.length}</h2>
     <div className=''><h3>{index+1}.{question.question}</h3>
     <div  className='d-flex flex-column '>
       <input style={{height:'50px',fontSize:'20px'}}  className='mt-3 rounded p-2 shadow' type='text' ref={option1} onClick={(e)=>{checkAns(e,1)}} value={`1.${question.option1}`} />
       <input style={{height:'50px',fontSize:'20px'}} className='mt-3 rounded p-2 shadow' type='text' ref={option2} onClick={(e)=>{checkAns(e,2)}} value={`2.${question.option2}`} />
       <input style={{height:'50px',fontSize:'20px'}} className='mt-3 rounded p-2 shadow' type='text' ref={option3} onClick={(e)=>{checkAns(e,3)}} value={`3.${question.option3}`} />
       <input style={{height:'50px',fontSize:'20px'}} className='mt-3 rounded p-2 shadow' type='text' ref={option4} onClick={(e)=>{checkAns(e,4)}} value={`4.${question.option4}`} />
     </div>
     <div className='d-flex justify-content-end mt-5'>
      <button onClick={next} style={{height:'40px',width:'80px',border:'none'}} className='bg-info rounded'>Next</button>
     
     </div>
     </div>

     </div>
     </>}
     {result?<>
      <div style={{width:'700px'}} className='d-flex flex-column justify-content-center align-items-center mt-3 bg-white p-5 shadow '>
        <h2>Total Questions:{data.length}</h2>
        <h1>Score</h1>
     <h2 style={{fontSize:'150px',textAlign:'center',color:'violet'}}>  {score}/{data.length}</h2>
     <h4>Correct Answers:{score}   </h4>
     

     <button style={{height:'40px',width:'100px',border:'none',alignItems:'center'}} className='bg-info rounded mt-2' onClick={reset}>REPLAY</button>
     </div>
     </>:<></>}
    </div>
  )
}

export default App
