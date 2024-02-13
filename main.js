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

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

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
    let resultHtml = "";
    for (let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true) {
            resultHtml+=`<div class="task">
        <div class ="task-done">${taskList[i].taskContent}</div>
        <div>
            <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
            <button onClick="deleteTask()"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
            
    }else{
        resultHtml+=`<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
            <button onClick="deleteTask()"><i class="fa-regular fa-trash-can"></i></button>
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
function deleteTask(){
    console.log("삭제")
}
function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}