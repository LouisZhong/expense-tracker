module.exports = {
  formatDate: function (date) {
    // 根据你的日期对象的实际格式和库来格式化日期
    // 这里假设 date 是一个 JavaScript Date 对象
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  eq: function (a, b, options) {
    if (a === b) {
      return options.fn ? options.fn(this) : '';
    } else {
      return options.inverse ? options.inverse(this) : '';
    }
  }
};