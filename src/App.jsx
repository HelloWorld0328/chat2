import React, { useState , useEffect} from "react";

const App = () => {
  const [comment,SetComment] = useState([])
  const server ="https://chat2-backend.onrender.com/"

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(server);
            const data = await response.json();
            SetComment(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 100);

    return () => {
        clearInterval(intervalId);
    };
}, []);

const uploadComment = async () => {
    const nameI = document.getElementById('nameInput').value;
    const contentI = document.getElementById('contentInput').value;

    if (nameI===""){
      alert("이름을 입력 해주세요.")
    }
    else if(contentI===""){
      alert("내용을 입력 해주세요.")
    }
    else{
    fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameI, content: contentI }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('서버로부터의 응답:', data);
        document.getElementById('nameInput').value = '';
        document.getElementById('contentInput').value = '';
    })
    .catch(error => {
        console.error('오류 발생:', error);
    });
}}
  return(
    <div id="app" style={{
      textAlign: "center",
      paddingTop: "15px"
    }}>
      <div id="commentView">
        {comment.map((item, idx) => (
          <h3 key={idx}>{item.name} : {item.content}</h3>
        ))}
      </div> <br /><br /><br />
      <div id="writeComment">
        <input type="text" placeholder="이름" name="name" id="nameInput" autoComplete="false"/><br /><br />
        <textarea id="contentInput" name="content" cols="22" rows="3" placeholder="내용" autoComplete="false"></textarea><br /><br />
        <button id="uploadComment" onClick={()=>uploadComment()}>등록</button>
      </div>
    </div>
  )
}

export default App;