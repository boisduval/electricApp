export default function calculationTimeDifference(time) {
  //当前时间
  var nowTime = new Date().valueOf();

  console.log(nowTime);

  //差值
  var date3 = nowTime - time;

  console.log(date3);

  //天
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  //时
  var leave1 = date3 % (24 * 3600 * 1000);
  var hours = Math.floor(leave1 / (3600 * 1000));
  //分
  var leave2 = leave1 % (3600 * 1000);
  var minutes = Math.floor(leave2 / (60 * 1000));

  //秒
  var leave3 = leave2 % (60 * 1000);
  var seconds = Math.round(leave3 / 1000);

  if (days > 0) {
    return days + '天前';
  }

  if (days === 0 && hours > 0) {
    return hours + '小时前';
  }

  if (days === 0 && hours === 0 && minutes > 0) {
    return minutes + '分钟前';
  }

  if (days === 0 && hours === 0 && minutes === 0 && seconds > 0) {
    return '刚刚';
  }
}
