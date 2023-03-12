var color = document.querySelector('#color')
var eraser = document.querySelector('#eraser')
var decrease = document.querySelector('#decrease')
var increase = document.querySelector('#increase')
var sizeElm = document.querySelector('#size')
var save = document.querySelector('#save')
var clear = document.querySelector('#clear')
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var cl = document.querySelector('#cl')

// tham so khoi tao

// vi tri ban dau khi dat but vex
var pos1 = {
    x: 0,
    y: 0
}

// vi tri thu 2 khi dat but ve
var pos2 = {
    x: 0,
    y: 0
}

// bien check khi nao bat dau ve
var isDrawing = false
// mau mac dinh 
var colorPaint = '#000000'
// kich thuoc net but
var size = 3
// hien thi ra man hinh
sizeElm.innerHTML = size


// khi đọc được sự kiện click chuột nhấn xuống thì bắt đầu 
// set luôn đấy là vị trí ban đầu vẽ và cờ check nhảy lên true
document.addEventListener('mousedown', function (e) {
    pos1 = {
        x: e.offsetX,
        y: e.offsetY
    }
    isDrawing = true
})

// khi dữ chuột di chuyển vẽ thì điểm thứ 2 được cập nhật là vị
// trí mới và điểm vị trí cũ cập nhật lại cho điểm 1
document.addEventListener('mousemove', function (e) {
    if (isDrawing) {
        pos2 = {
            x: e.offsetX,
            y: e.offsetY
        }

        // ve net hinh tron do mau cho net ve
        ctx.beginPath()
        // kích thước hình tròn khi vẽ tại vẽ
        ctx.arc(pos1.x, pos1.y, size, 0, 2 * Math.PI)
        // thực hiện đổ màu cho nét vẽ
        ctx.fillStyle = colorPaint
        ctx.fill()

        // bat dau ve cac hinh theo net lien
        ctx.beginPath()
        ctx.moveTo(pos1.x, pos1.y)
        ctx.lineTo(pos2.x, pos2.y)
        // đổ màu cho viền của nét vẽ
        ctx.strokeStyle = colorPaint
        ctx.lineWidth = size * 2
        ctx.stroke();

        // cap nhat vi tri co net ve
        pos1.x = pos2.x;
        pos1.y = pos2.y;

    }
})

// khi nghe sự kiện chuột ko nhấp thì cờ là false
document.addEventListener('mouseup', function (e) {
    isDrawing = false
})

// thay doi mau va hien thi mau cua but
color.addEventListener('change', function (e) {
    colorPaint = e.target.value;
    cl.style.color = colorPaint
})

/// chuc nang tay xoa
// khi xóa ta sẽ đổ màu giống của màu nền để xóa
eraser.addEventListener('click', function (e) {
    colorPaint = '#ffffff'
})


// giam kich thuoc net
decrease.addEventListener('click', function () {
    size -= 3
    size = size > 3 ? size : 3
    sizeElm.innerHTML = size
})

// tang kich thuoc nét
increase.addEventListener('click', function () {
    size += 3
    size = size < 18 ? size : 18
    sizeElm.innerHTML = size
})


// ham xoa toan bo
clear.addEventListener('click', function (e) {
    var canvasStarts = canvas.getClientRects()[0]
    ctx.clearRect(0, 0, canvasStarts.width, canvasStarts.height)
})

// save hinh anh
save.addEventListener('click', function (e) {
    var output = canvas.toDataURL('image/png')
    save.setAttribute('href', output)
})