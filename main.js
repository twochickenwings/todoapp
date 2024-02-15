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

let date = new Date();

const renderCalendar = () => {
const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

const prevLast = new Date(viewYear, viewMonth, 0);
const thisLast = new Date(viewYear, viewMonth + 1, 0);

const PLDate = prevLast.getDate();
const PLDay = prevLast.getDay();

const TLDate = thisLast.getDate();
const TLDay = thisLast.getDay();

const prevDates = [];
const thisDates = [...Array(TLDate + 1).keys()].slice(1);
const nextDates = [];

if(PLDay !== 6) {
for (let i = 0; i < PLDay + 1; i++) {
    prevDates.unshift(PLDate - i);
}
}

for (let i = 1; i < 7 - TLDay; i++) {
nextDates.push(i);
}

const dates = prevDates.concat(thisDates, nextDates);
const firstDateIndex = dates.indexOf(1);
const lastDateIndex = dates.lastIndexOf(TLDate);


dates.forEach((date, i)=> {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
dates[i] =`<div class="date"><span class=${condition}>${date}</span></div>`;
});

document.querySelector('.dates').innerHTML = dates.join('');


const today = new Date();
if (viewMonth === today.getMonth() && viewYear === today.getFullYear()){
    for (let date of document.querySelectorAll('.this')){
        if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
            }
         }
     }
};
renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode ='all';
let filterList = [];
let underLine = document.getElementById("underline");
let horizontalMenus = document.querySelectorAll("task-tabs");

tabs.forEach(menu => menu.addEventListener("click", (e) => horizontalIndicator(e)));

function horizontalIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function enterKey(event) {
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
        addTask(); // addTask 함수를 호출하여 아이템을 추가합니다.
    }
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}



addButton.addEventListener("click",addTask)

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function (event) {
        filter(event);
    })

}
console.log(tabs);

function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent !== '') {
        let task = {
            id: randomIDGenerate(),
            taskContent: taskContent,
            isComplete: false
        };
        taskList.push(task);
        taskInput.value = '';
        render();
        const todayDate = new Date();
        const currentDate = todayDate.getDate();
        const datesElements = document.querySelectorAll('.date');
        datesElements.forEach(Element => {if (element.querySelector('span').innerText == currentDate) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            element.appendChild(dot);
        }
    });
    } else {
        alert("할일을 입력해 주세요."); // 입력이 없는 경우 alert 창 띄우기
    }
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
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i, 1);
            break;
        }
    }
    // 삭제된 아이템을 filterList에서도 제거
    filterList = filterList.filter(item => item.id !== id);
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

