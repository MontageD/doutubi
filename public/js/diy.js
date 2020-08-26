// (function ($, window, document) {
//   // $('#container .section-left .sec-item .sec-item-list .sec-list-li').hover(function () {
//   //   $(this).find('.sec-list-l').fadeIn(100)
//   // }, function () {
//   //   $(this).find('.sec-list-l').fadeOut(100)
//   // })

//   // 搜索监听
//   $('#searchBtn').on('click', function () {
//     var input = $('#searchInput').val()
//     if (!isSearch(input)) {
//       return false
//     } else {
//       window.location.href = '/search/search/keyword/' + input
//     }
//   })

//   function isSearch (input) {
//     if ((input) === '') {
//       $('#alert_warning').text('请填写搜索的内容').fadeIn()
//       setTimeout(function () {
//         $('#alert_warning').fadeOut()
//       }, 2000)
//       return false
//     }
//     var re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i
//     if (re.test(input)) {
//       console.log('请莫输入非法字符')
//       $('#alert_warning').text('请不要输入非法字符').fadeIn()
//       setTimeout(function () {
//         $('#alert_warning').fadeOut()
//       }, 2000)
//       return false
//     }
//     return true
//   }
// })(window, document)
