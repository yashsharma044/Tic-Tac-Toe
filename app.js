let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//storing player turn on the bases of an boolean value
let turnO = true; //PlayerO turn vice verse for PlayerX

//storing the winning patterns in 2d array
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let btnCount = 0;

const resetGame = () => {
  turnO = true;
  btnCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

//Now making boxes into the action
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was Clicked");
    //set the box innertext turn wise as of player
    if (turnO) {
      //PlayerO turn
      box.innerText = "O";
      box.style.color = "green";
      //update the turn value
      turnO = false;
    } else {
      //PlayerX turn
      box.innerText = "X";
      box.style.color = "#7D0A0A";
      turnO = true;
    }
    //Now only one box change its value only for one time so after clicking on it we can disabled that button
    box.disabled = true;
    btnCount++;
    let isWinner = checkWinner();
    if (btnCount === 9 && !isWinner) gameDraw();
  });
});
const gameDraw = () => {
  msg.innerHTML = "<i><b>Its a Draw</b></i>";
  msgContainer.classList.remove("hide");
  disabeBoxes();
  // console.log(btnCount)
};

const disabeBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
//Presenting the showWinner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  //the hide class is removed because to present the winner msg
  disabeBoxes();
};

//Making a function to check the winner of the game
const checkWinner = () => {
  for (let pattern of winPatterns) {
    //for finding individual index
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
    //these are the values comes out when a value clicked at any box
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    //Now check for the wiiner and also cheeck for the empty box value
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner",pos1Val);
        showWinner(pos1Val);
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
