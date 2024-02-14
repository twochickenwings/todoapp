/**
로직 정리:
유저가 값을 입력한다
+버튼을 클릭하면 할일이 추가된다.
delete버튼을 누르면 할일이 삭제 된다.
체크 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
1. check 버튼을 클릭하는 순간 true false
2. true 이면 끝난 걸로 간주하고 밑줄 보여주기
3. false 이면 안끝난걸로 간주하고 그대로
진행중, 끝남 탭을 누르면 언더라인이 이동한다.
끝남 탭은 끝난 아이템만, 진행중탭은 진행중 아이템만 나오게 된다.
전체 탭을 누르면 다시 전체아이템으로 돌아옴.
 */

function getClock(){
    const time = new Date();
    let months = String(time.getMonth() +1).padStart(2,"0");
    let dates = String(time.getDate()).padStart(2,"0");
    let nowday =""; // 모두 let으로 쓰는 것 잊지말기~
    switch(time.getDay()){
        case 0:
            nowday="일요일";
            break;
        case 1:
            nowday="월요일";
            break;            
        case 2:
            nowday="화요일";
            break;
        case 3:
            nowday="수요일";
            break;
        case 4:
            nowday="목요일";
            break;            
        case 5:
            nowday="금요일";
            break;
        case 6:
            nowday="토요일";
            break;
        default :
            nowDay = "";
            break;
    };
    day.innerText = `${months}/${dates} (${nowday})`;

}
getClock();
setInterval(getClock, 1000);

    
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode ='all';
let filterList = [];

addButton.addEventListener("click",addTask)

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function (event) {
        filter(event);
    })

}
console.log(tabs);
function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    //1.내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all"){
    list = taskList
    }else if(mode === "ongoing" || mode ==="done"){
    list = filterList    
}
    //2. 리스트를 달리 보여준다.


    let resultHtml = "";
    for (let i = 0; i < list.length; i++){
        if(list[i].isComplete == true) {
            resultHtml+=`<div class="task">
        <div class ="task-done">${list[i].taskContent}</div>
        <div>
            <button class="check1" onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
            <button class="delete1" onClick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
            
    }else{
        resultHtml+=`<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="check" onClick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
            <button class="delete" onClick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
    }
    }
    document.getElementById("task-board").innerHTML = resultHtml;
}
function toggleComplete(id){
    for(let i =0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = []
    if(mode ==="all"){
        // 전체 리스트를 보여준다.
        render()
    }else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete=false
        for(let i =0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
       render(); 
       console.log("진행중",filterList); 
    }else if(mode ==="done"){
        // 끝나는 케이스
        //task.isComplete=true
        for(let i = 0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()      
    }
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

