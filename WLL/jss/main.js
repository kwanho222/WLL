function popup_best(obj) {
  openPopup()
}

function openPopup() {
  var modal = document.getElementById('popup');
  modal.style.display = 'block';
}

// 팝업 닫기
function closePopup() {
  var modal = document.getElementById('popup');
  modal.style.display = 'none';
}

function search(title) {
  localStorage.setItem("title", title)
  open("../htmls/noresult.html", self)
}

function load(){
  document.getElementById('title').textContent
    = localStorage.getItem("title")
}


function purchase(s1, s2, s3){
  if(s1.checked){
    open("../htmls/machinelearninganddeeplearning.html",self)
  }
  if(s2.checked){
    open("../htmls/modernjavascript.html",self)
  }
  if(s3.checked){
    open("../htmls/androidprogramming.html",self)
  }
}

function mypage(){
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    alert("해당 서비스는 아직 준비중입니다.");
    // 로그인 상태면 이동하지 않음
  } else {
    alert("로그인 후 이용 가능합니다.");
    window.location.href = "login.html";
  }
}

function alert_noimplement() {
  alert("해당 서비스는 준비중입니다.")
}

function login(id, pwd) {
  var savedId = localStorage.getItem("user_id");
  var savedPwd = localStorage.getItem("user_pwd");
  if (id == "") {
    alert("아이디를 입력해 주십시오");
    return;
  }
  if (pwd == "") {
    alert("비밀번호를 입력해 주십시오");
    return;
  }
  if (id === savedId && pwd === savedPwd) {
    localStorage.setItem("isLoggedIn", "true");
    alert("로그인 성공!");
    window.location.href = "index.html";
  } else {
    alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
  }
}

function register(id, pwd, name, birth, email) {
  if (id == "") {
    alert("아이디를 입력해 주십시오")
    return
  }
  if (pwd == "") {
    alert("비밀번호를 입력해 주십시오")
    return
  }
  if (name == "") {
    alert("이름 입력해 주십시오")
    return
  }
  if (birth == "") {
    alert("생년월일을 입력해 주십시오")
    return
  }
  if (email == "") {
    alert("이메일을 입력해 주십시오")
    return
  }
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_pwd", pwd);
  localStorage.setItem("username", name);
  localStorage.setItem("isLoggedIn", "true");
  alert("회원가입이 완료되었습니다.");
  window.location.href = "index.html";
}

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  showUserName();
}

function showUserName() {
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  var username = localStorage.getItem("username");
  var loginNav = document.querySelector("nav.login");
  if (loginNav) {
    if (isLoggedIn && username) {
      loginNav.innerHTML = `<span style='font-weight:bold;'>${username}님 환영합니다!</span> <a href='#' onclick='logout()' style='color:#225CFF;text-decoration:underline;margin-left:10px;cursor:pointer;'>로그아웃</a>`;
    } else {
      loginNav.innerHTML = `<a href='./login.html'>로그인</a> <a href='./register.html'>회원가입</a>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", showUserName);

function agreeall(all, item1, item2, item3) {
  if (all.checked) {
    item1.checked = true
    item2.checked = true
    item3.checked = true
  } else {
    item1.checked = false
    item2.checked = false
    item3.checked = false
  }
}

function allagreed(all, item1, item2, item3) {
  if (item1.checked && item2.checked && item3.checked) {
    all.checked = true
  } else {
    all.checked = false
  }
}
