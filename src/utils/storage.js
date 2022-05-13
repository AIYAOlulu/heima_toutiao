// 封装对本地存储的存取
// 存
export const setItem = (name, value) => {
  // 复合数据
  if (typeof value === 'object') {
    window.localStorage.setItem(name, JSON.stringify(value))
  } else {
    // 基本数据类型
    window.localStorage.setItem(name, value)
  }
}
// 取
export const getItem = name => {
  const value = window.localStorage.getItem(name)
  // 先假设取出来的是对象或者数组
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
// 删除 根据名字
export const clearItem = name => {
  localStorage.removeItem(name)
}
// 清空
export const clearAllItems = () => {
  localStorage.clear()
}
