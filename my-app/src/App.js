import React from 'react'
import { useState } from 'react'
import {  Configuration, OpenAIApi } from 'openai'
export default function App() {
  const configuration=new Configuration({
    apiKey:"your api key"
   
    
  });
  const openai=new OpenAIApi(configuration)
  const [prompt,setPrompt]=useState("")
  const [result,setresult]=useState("")
  const [loading,setloading]=useState("")
  const handleClik=async()=>{
    setloading(true);
    try{
      const response=await openai.createCompletion({
        model:'text-davinci-003',
        prompt:prompt,
        temperature:0.5,
        max_tokens:4092,
        stop:"none"

      });
      setresult(response.data.choices[0].text);
      setPrompt("")
    }
    catch(error){
      console.log(error);
    }
    setloading(false);
  }
  return(
    <div className='parent-div'>
    <div className='main-div'>
      <textarea
      type="text"
      value={prompt}
      onChange={(e)=>setPrompt(e.target.value)}
      placeholder="Write your question here
      "
      className='textarea'
      >

      </textarea>
      <button onClick={handleClik} disabled={loading || prompt.length===0} className="btn">

{loading?"Generating":"Generate"}
      </button>
      <p className='result'>{result}</p>

    </div>
    </div>
  )

}
