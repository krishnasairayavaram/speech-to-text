const resultElement=document.getElementById("box2");
let recognition;
function startConverting(){
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition is not supported on this browser.");
    }    
    if('webkitSpeechRecognition' in window){
        recognition=new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    }
}
function setupRecognition(recognition){
    recognition.continuous=true;
    recognition.interimResults=true;
    recognition.lang="en-US";
    recognition.onresult=function(event){
        const {finalTranscript,interTranscript}=processResult(event.results);
        document.getElementById("transcriptText").innerHTML = finalTranscript + interTranscript;
        resultElement.scrollTop = resultElement.scrollHeight;
    }
}
function processResult(results){
    let finalTranscript='';
    let interTranscript='';
    for(let i=0;i<results.length;i++){
        let transcript=results[i][0].transcript;
        transcript = transcript.replace(/\n/g, "<br>");
        if(results[i].isFinal){
            finalTranscript+=transcript;
        }else{
            interTranscript+=transcript;
        }
    }
    return {finalTranscript,interTranscript};   
}
function stopConverting(){
    if(recognition){
        recognition.stop();
    }
}
document.getElementById("copyBtn").addEventListener("click", function () {
    const text = document.getElementById("transcriptText").innerText;
    const message = document.getElementById("copyMessage");

    navigator.clipboard.writeText(text).then(() => {
        message.textContent = "Copied!";
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.opacity = 0;
        }, 2000); 
    }).catch(err => {
        message.textContent = "Failed to copy!";
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.opacity = 0;
        }, 2000);
    });
});
