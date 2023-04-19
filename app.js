let input=document.querySelector('input')
let btn=document.querySelector(".btn")
let api_key='e6a8d384-0100-454b-a40e-c4c76a4ab11d'
let not_found=document.querySelector(".not_found")
let def=document.querySelector(".def")
let audio_div=document.querySelector(".audio")
let loading=document.querySelector(".loading")

btn.addEventListener("click",(e)=>{
   e.preventDefault()
  // audio_div.innerText='';
   not_found.innerText=''
   def.innerHTML=''
   let value=input.value;
   if(value==='')
   {
     alert('empty word');
   }

   getdata(value)
})

async function getdata(word)
{
    loading.style.display='block';
    setTimeout(()=>{loading.style.display='none'},1000)
    let response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api_key}`)
    let data=await response.json()
    if(!data.length)
    {
        loading.style.display='none';
        not_found.innerHTML="<p>no results found</p>"
        return;
    }

    if(typeof data[0]==='string')
    {
        loading.style.display='none';
        let heading=document.createElement('h3')
        heading.innerText="Did you mean?"
        not_found.append(heading)
        data.forEach(element => {
            let span=document.createElement("span");
            span.classList.add("suggested")
            span.textContent=element;
            not_found.append(span)
        });
        return;
    }

        loading.style.display='block';
        let newdiv=document.createElement("div")
        newdiv.textContent=data[0].shortdef[0];
        let audio=data[0].hwi.prs[0].sound.audio
        console.log(audio)
        if(audio)
        {
            rendersound(audio)
        }
    def.append(newdiv)
}

function rendersound(audio){
  //https://media.merriam-webster.com/soundc11

  let subfolder=audio[0];
  console.log(subfolder)
  let soundsource=`https://media.merriam-webster.com/soundc11/${subfolder}/${audio}.wav?key=${api_key}`
  let sound=document.createElement('audio')
  sound.src=soundsource;
  sound.controls=true;
  audio_div.append(sound)
}