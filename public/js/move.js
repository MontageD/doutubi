// var box = document.querySelector('.move') // 待拖拽元素
// var boxDom = $('.move')
// var upbox = $('.diy-coimg')
// var dragging = false
// var boxX, boxY, mouseX, mouseY, offsetX, offsetY

// box.onmousedown = down
// document.onmousemove = move
// document.onmouseup = up

// function down (e) {
//   dragging = true
//   boxX = box.offsetLeft
//   boxY = box.offsetTop
//   mouseX = parseInt(getMouseXY(e).x)
//   mouseY = parseInt(getMouseXY(e).y)
//   offsetX = mouseX - boxX
//   offsetY = mouseY - boxY
// }

// function move (e) {
//   if (dragging) {
//     var x = getMouseXY(e).x - offsetX
//     var y = getMouseXY(e).y - offsetY
//     var width = document.documentElement.clientWidth - box.offsetWidth
//     var height = document.documentElement.clientHeight - box.offsetHeight

//     x = Math.min(Math.max(0, x), width)
//     y = Math.min(Math.max(0, y), height)
//     if (x < parseInt(upbox.width() - parseInt(boxDom.width())) && y < parseInt(upbox.height() - parseInt(boxDom.height()))) {
//       box.style.left = x + 'px'
//       box.style.top = y + 'px'
//       box.style.transform = 'none'
//     }
//   }
// }
// function up (e) {
//   dragging = false
// }

// function getMouseXY (e) {
//   var x = 0; var y = 0
//   e = e || window.event
//   if (e.pageX) {
//     x = e.pageX
//     y = e.pageY
//   } else {
//     x = e.clientX + document.body.scrollLeft - document.body.clientLeft
//     y = e.clientY + document.body.scrollTop - document.body.clientTop
//   }
//   return {
//     x: x,
//     y: y
//   }
// }

// //  设置可选项
// $(function () {
//   // 颜色库
//   var colorList = [
//     'rgb(0, 0, 0)',
//     '#ffffff',
//     '#838383',
//     '#db3204',
//     '#f26202',
//     '#4070db',
//     '#24af79',
//     '#68479e'
//   ]

//   var familyList = [
//     'font-blank',
//     'font-xihei',
//     'font-song',
//     'font-Arial',
//     'font-Tahoma',
//     'font-Helvetica',
//     'font-Georgia'
//   ]
//   var htmoDom = ''
//   for (var i = 0; i < colorList.length; i++) {
//     htmoDom = htmoDom + '<div data-color="' + colorList[i] + '" class="updateColor-li col-xs-2">' +
//     ' <a style="background-color: ' + colorList[i] + '"></a>' +
//    '</div>'
//   }
//   $('.updateColor-ul').append(htmoDom)

//   var fontHtmlDom = ''
//   for (var i = 0; i < familyList.length; i++) {
//     fontHtmlDom = fontHtmlDom + '<div data-font="' + familyList[i] + '" class="updateFont-li col-xs-2">' +
//     ' <a style="" class="' + familyList[i] + '">字</a>' +
//    '</div>'
//   }
//   $('.updateFont-ul').append(fontHtmlDom)
//   $('.updateColor-li').eq(0).append('<div class="cheap"></div>')
//   $('.updateFont-li').eq(0).append('<div class="cheap"></div>')
//   $('.updateColor-li').on('click', function () {
//     $('.updateColor-li .cheap').remove()
//     $(this).append('<div class="cheap"></div>')
//     $('#moveText').css({
//       'color': $(this).attr('data-color')
//     })
//   })

//   $('.updateFont-li').on('click', function () {
//     $('.updateFont-li .cheap').remove()
//     $(this).append('<div class="cheap"></div>')
//     $('#moveText').attr('class', $(this).attr('data-font'))
//   })

//   //  初始化canvas 大小
//   $('#canvas').height($('.diy-coimg').height())
//   $('#canvas').width($('.diy-coimg').width())

//   // 最后上传图片
//   $('#submitImg').on('click', function () {
//     var canvas = document.getElementById('canvas')
//     var ctx = canvas.getContext('2d')
//     var divImg = document.getElementById('divImg')
//     canvas.width = parseInt($('.diy-coimg').css('height'))
//     canvas.height = parseInt($('.diy-coimg').css('width'))
//     var heightImg = parseInt($('.diy-coimg').css('height'))
//     var widthImg = parseInt($('.diy-coimg').css('width'))
//     // var image = new Image(heightImg, widthImg)
//     // image.src = $('.diy-coimg').attr('data-img')

//     // console.log($('.diy-coimg').attr('data-img'), heightImg, widthImg)
//     // image.onload = function () {
//     //   context.drawImage(this, 0, 0)
//     // }
//     ctx.drawImage(divImg, 0, 0, heightImg, widthImg)
//     var fontSize = ($('#moveText').css('font-size'))
//     var fontFamliy = $('#moveText').css('fontFamily')
//     ctx.font = 'bold' + ' ' + fontSize + ' ' + fontFamliy
//     ctx.textBaseline = 'middle'
//     ctx.textAlign = 'center'
//     console.log('输出的大小:', heightImg, widthImg)
//     console.log('输出的字体:', 'bold' + fontSize + '' + fontFamliy)
//     console.log('输出颜色:', $('.updateColor-ul .cheap').parent().attr('data-color'))
//     // console.log('输出参数', $('#moveText').val(), parseInt($('.move').css('left')), parseInt($('.move').css('top')))
//     ctx.fillStyle = $('.updateColor-ul .cheap').parent().attr('data-color')
//     var fontLeft = parseInt($('.move').css('left')) + (parseInt($('.move').css('width')) / 2) - ($('#moveText').val().length / 2 * (fontSize.replace('px', '')))
//     var fontTop = parseInt($('.move').css('top')) + 50
//     console.log('fontLeft:', fontLeft)
//     console.log('fontTop:', fontTop)
//     ctx.fillText($('#moveText').val(), fontLeft, fontTop)
//     // window.location = canvas.toDataURL('image/png')
//     exportCanvasAsPNG('canvas', 'fileName.jpg')
//   })

//   function exportCanvasAsPNG (id, fileName) {
//     console.log('下载图片')
//     var canvasElement = document.getElementById(id)

//     var MIME_TYPE = 'image/png'

//     var imgURL = canvasElement.toDataURL(MIME_TYPE)

//     // console.log('imgURL', imgURL)
//     var dlLink = document.createElement('a')
//     dlLink.download = fileName
//     dlLink.href = imgURL
//     dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

//     document.body.appendChild(dlLink)
//     dlLink.click()
//     document.body.removeChild(dlLink)
//   }
// })
