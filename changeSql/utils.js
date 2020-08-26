
var filter = (res) => {
  if (res !== undefined && res !== null && res !== 0 && res !== NaN && res !== ''
  ) {
    return res
  } else {
    return 0
  }
}

function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  let res = []
  for (let i = 0; i < arr.length; i++) {
      if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i])
      }
  }
  return res
}


module.exports ={
  filter,
  unique
}