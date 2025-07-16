let activeTextarea = null;
let activeCloseBtn = null;
//test
let activeWindow = null;

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    const container = document.createElement("div");
    container.className = "markerContainer";
    container.style.left = `${e.clientX-25}px`;
    container.style.top = `${e.clientY-50}px`;

    const img = document.createElement("img")
    img.src = "위치마커.png";
    img.className = "locationMarker";

    const textarea = document.createElement("textarea");
    textarea.className = "markerText";
    textarea.placeholder = "이름\n영업시간"

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.className = "X";

    //테스트!!
    const window = document.createElement("div");
    window.className = "window";
    const realPhoto = document.createElement("img");
    realPhoto.src = "임시사진.jpg";
    realPhoto.className = "restaurant";
    const editPhoto = document.createElement("button");
    editPhoto.className = "edit";

    //위치마커 마우스 접근 감지
    img.addEventListener("mouseenter", function () {
        if (activeTextarea && activeTextarea !== textarea) {
            activeTextarea.style.display = "none";
            activeCloseBtn.style.display = "none"
        }
        textarea.style.display = "block";
        closeBtn.style.display = "flex"
        activeTextarea = textarea;
        activeCloseBtn = closeBtn;
    });

    //삭제 버튼 마우스 클릭 감지
    closeBtn.addEventListener("click", () => {
        container.remove();
        if (activeTextarea === textarea) {
            activeTextarea = null;
        }
        if (activeCloseBtn) {
            activeCloseBtn.style.display = "none";
            activeCloseBtn = null;
        }
    });

    //테스트!!!!!!!!!!!!!!!!!!!!!!!
    img.addEventListener("click", function () {
        if (activeWindow && activeWindow !== window) {
            activeWindow.style.width = "0";
        }
        window.style.width = "400px";
        activeWindow = window;
    });
    window.addEventListener("mouseenter", function () {
        isPointerInsideWindow = true;
    });
    window.addEventListener("mouseleave", function () {
        isPointerInsideWindow = false;
    });

    container.appendChild(closeBtn);
    container.appendChild(img);
    container.appendChild(textarea);
    document.body.appendChild(container);
    background.appendChild(window);
    window.appendChild(realPhoto);
    window.appendChild(editPhoto);
});



let isPointerInsideWindow = false;
document.addEventListener("DOMContentLoaded", function () {
    const background = document.querySelector(".background");

    if (background) {
        background.addEventListener("click", function (e) {
            if (activeTextarea) {
                activeTextarea.style.display = "none";
                activeTextarea = null;
            }
            if (activeCloseBtn) {
                activeCloseBtn.style.display = "none";
                activeCloseBtn = null;
            }
            //테스트!!!!
            if (!isPointerInsideWindow && activeWindow) {
                activeWindow.style.width = "0px";
                activeWindow = null;
            }
        });
    }
});

