const domMarkers = [];

var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(35.142613, 126.800292),
        level: 3,
        maxLevel: 9
    };
var map = new kakao.maps.Map(mapContainer, mapOption);



let activeTextarea = null;
let activeCloseBtn = null;
let activeWindow = null;

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    const container = document.createElement("div");
    container.className = "markerContainer";
    container.style.position = "absolute";

    const img = document.createElement("img");
    img.src = "위치마커.png";
    img.className = "locationMarker";

    const textarea = document.createElement("textarea");
    textarea.className = "markerText";
    textarea.placeholder = "이름\n영업시간\n위치\n기타 등등...";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.className = "X";

    const window = document.createElement("div");
    window.className = "window";
    const realPhoto = document.createElement("img");
    realPhoto.src = "임시사진.jpg";
    realPhoto.className = "restaurant";
    const editPhotoBtn = document.createElement("button");
    editPhotoBtn.className = "edit";
    const inputimg = document.createElement("input");
    inputimg.type = "file";
    inputimg.accept = "image/*";
    inputimg.className = "Input";
    inputimg.style.display = "none";
    const editIcon = document.createElement("img");
    editIcon.src = "edit.png";
    editIcon.className = "edicon";

    img.addEventListener("mouseenter", function () {
        if (activeTextarea && activeTextarea !== textarea) {
            activeTextarea.style.display = "none";
            activeCloseBtn.style.display = "none";
        }
        textarea.style.display = "block";
        closeBtn.style.display = "flex";
        activeTextarea = textarea;
        activeCloseBtn = closeBtn;
    });
    img.addEventListener("click", function () {
            if (activeWindow && activeWindow !== window) {
                activeWindow.style.width = "0";
            }
            window.style.width = "400px";
            activeWindow = window;
        });

    closeBtn.addEventListener("click", () => {
        container.remove();
        if (activeTextarea === textarea) activeTextarea = null;
        if (activeCloseBtn) {
            activeCloseBtn.style.display = "none";
            activeCloseBtn = null;
        }
    });

    window.addEventListener("mouseenter", function () {
        isPointerInsideWindow = true;
    });
    window.addEventListener("mouseleave", function () {
        isPointerInsideWindow = false;
    });
    
    editPhotoBtn.addEventListener("click", function () {
    inputimg.click(); // inputimg는 이 창 고유의 input
    });

    inputimg.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        realPhoto.src = URL.createObjectURL(file);
    });

    container.appendChild(closeBtn);
    container.appendChild(img);
    container.appendChild(textarea);
    document.body.appendChild(container);
    document.body.appendChild(window);
    window.appendChild(realPhoto);
    window.appendChild(editPhotoBtn);
    window.appendChild(inputimg);
    editPhotoBtn.appendChild(editIcon);

    const latlng = map.getProjection().coordsFromContainerPoint(new kakao.maps.Point(e.clientX, e.clientY));
    domMarkers.push({ element: container, latlng });
    const point = map.getProjection().containerPointFromCoords(latlng);
    container.style.left = `${point.x - 25}px`;
    container.style.top = `${point.y - 50}px`;
});

let isPointerInsideWindow = false;
document.addEventListener("DOMContentLoaded", function () {

    kakao.maps.event.addListener(map, 'dragstart', function () {
        if (activeTextarea) {
                activeTextarea.style.display = "none";
                activeTextarea = null;
        }
        if (activeCloseBtn) {
                activeCloseBtn.style.display = "none";
                activeCloseBtn = null;
        }
        if (!isPointerInsideWindow && activeWindow) {
                activeWindow.style.width = "0px";
                activeWindow = null;
        }
    });
});

kakao.maps.event.addListener(map, 'bounds_changed', function () {
    domMarkers.forEach(marker => {
        const point = map.getProjection().containerPointFromCoords(marker.latlng);
        marker.element.style.left = `${point.x - 25}px`;
        marker.element.style.top = `${point.y - 50}px`;
    });
});
