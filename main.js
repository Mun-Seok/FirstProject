let computerNumber = 0; //랜덤 숫자 저장할 변수 선언
let playButton = document.getElementById('play_button');
let userInput = document.querySelector('#user_input');
let resultArea = document.getElementById('result_area');
let resetButton = document.querySelector('#reset_button');
let chanceArea = document.getElementById('chance-area');
let chances = 7;
let gameOver = false;
let userValueList = [];
/*
document는 DOM트리의 최상위 객체이다.
DOM(Document Object Model)이라 하면 자바스크립트 입장에서 그저 일종의 문자열일 뿐인 HTML울 자바 스크립트 입장에서 그저 일종의 문자열일 뿐인 HTML을 자바 스크립트가 이해할 수 있게 객체의 형태로 바꿔둔 것이다.
(Document를 HTML이라고 이해하면 편하다.) 이 DOM을 이제 자바 스크립트가 마음대로 컨트롤할 수 있어야되는데 이때 필요한 기본 함수들과 속성값을 제공해주는게 document라는 객체이다.
*/
/*
document.getElementByID : id로 선택
document.getElementByClassName : class로 선택, 같은 class가 여러개 있을 경우엔 모두 다 선택이 되어서 배열에 저장된다.
*/
/*
document.querySelector : id, class 둘 다 선택이 가능하고 좀더 디테일한 선택이 가능하다. 참고로 선택 가능한 값이 여러개가 있을 경우 그 중에 첫번째 태그 하나만 반환한다.

let userInput = document.querySelector('#user-input'); 
>> id=user-input을 선택
let resultAreaImg = document.querySelector(".main-img"); 
>> class=main-img를 선택
let menus = document.querySelector("nav a"); 
>> nav태그 밑에 있는 a태그를 선택

document.querySelectorAll : 위에 document.querySelector와 같다 하지만 All에서 알 수 있듯이 선택된 값 모두를 NodeList에 담아 반환한다.
*/
playButton.addEventListener('click', play);
/* addEventListener('이벤트의 이름',이벤트 발생시 실행시킬 함수의 이름) */
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
    userInput.value = '';
}); //함수가 복잡하지 않고 다른 곳에서 사용되지 않을 때 익명의 함수 선언으로 메모리 차지하지 않아 좋음
function pickRandomNumber() {
    //랜덤 숫자뽑기할 함수
    computerNumber = Math.floor(Math.random() * 100) + 1;
    /* 
    Math : 자바 스크립트에서 유용한 객체 중 하나인 Math. 수학적으로 어지간한 함수들이 다 들어가있다.

    Math.random() : 0~1사이의 값을 반환(1에 근접한 값까지만 1은 미포함이다.)
    Math.floor() : 소수점 버림이다.
    Math.ceil() : 소수점 올림이다.
    Math.round() : 소수점 반올림이다.
    Math.max() : 여러개의 값 중 제일 큰 값 반환
    Math.min() : 여러개의 값 중 제일 작은 값 반환
    등등 여러가지 유용한 함수들이 많으니 참고하자
    */
    console.log(computerNumber);
}
function play() {
    const USER_VALUE = userInput.value; //userInput의 value를 저장
    if (USER_VALUE < 1 || USER_VALUE > 100) {
        resultArea.textContent = '1에서 100사이의 숫자를 입력해주세요.';
        return; //반환값 설정 이외에도 종료시키는 기능을 함
    }
    if (userValueList.includes(USER_VALUE)) {
        resultArea.textContent = '중복된 숫자';
        return;
    }
    userValueList.push(USER_VALUE);
    if (USER_VALUE < computerNumber) {
        resultArea.textContent = 'UP'; //textContent 내용 저장
    } else if (USER_VALUE > computerNumber) {
        resultArea.textContent = 'DOWN';
    } else {
        resultArea.textContent = '정답!!';
        gameOver = true;
    }
    /*
    다양한 노드의 속성값

    textContent : 노드의 text값을 변환
    innerText : 노드의 text값을 변환, textContent랑 비슷하지만 textContent는 모든 요소를 반환하는 반면에, innerText는 사람이 읽을 수 있는 요소만 가져온다.(글자사이에 여백이 많다면 textContent는 있는 그대로, 가져오는 반면에 innerText는 여백을 한칸 정도만 남기고 가져온다.)
    innerHTML : html요소를 반환

    셋의 차이를 잘 보여주는 예제 코드
    다음 코드를 실행시켜보면 차이가 확연하게 들어난다.

    HTML 상의 마크업
    <h1 id="test">
        <div>Hello      world</div>
    </h1>

    script 상의 코드
    let test=document.getElementById("test")
    console.log(test.innerText)
    console.log(test.textContent)
    console.log(test.innerHTML)

    이외에도 다양한 노드 속성과 함수는 다음 사이트에서 확인 가능하다.
    https://developer.mozilla.org/ko/docs/web/API/Node
    */
    chances--;
    chanceArea.innerHTML = `남은 기회 : ${chances}`; // ` 백틱 사용하면 띄워쓰기 생각하기 쉬움
    console.log(chances);
    if (chances == 0) {
        gameOver = true;
    }
    if (gameOver) {
        playButton.disabled = true;
    }
}
/*
function focusInput() {
    userInput.value = '';
}
*/
function reset() {
    pickRandomNumber();
    userInput.value = '';
    resultArea.textContent = '숫자를 맞춰보세요';
    gameOver = false;
    playButton.disabled = false;
    chances = 7;
    chanceArea.innerHTML = `남은 기회: ${chances}`;
    userValueList = [];
}
pickRandomNumber();
/* 
1. 남은 기회를 7번이 아니라 5번으로 바꾸고싶다면?
>> chances를 바꾸고 html의 남은 찬스 횟수 바꿔줌
2. 숫자를 맞춘후로 게임을 더이상 플레이 못하게 하기위해 버튼을 disable 하는 방법
>> 정답 뒤에 gameOver=true로 바꿔준다
3. if(gameOver==true)를 (46번째줄 근처) if(gameOver)로 해도 동작?
>> true면 실행 위에 조건문에서 true가 되서 실행됨
4. computerNum를 1~10 사이의 랜덤번호를 받고싶다면?
>> random*10으로 바꿔준다.
5. input창에 포커스를 두면 내가 그전에 입력한 값이 자동으로 지워지게 한다면 어떻게 해야할까?
>>  userInput.value=''을 넣어준다.
*/
