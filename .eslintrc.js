module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0, // 组件名字不能是一个单词，加了这一行之后 可以是一个单词
    'vue/no-mutating-props': 0 // 一劳永逸 只要写一次 反复的修复 props可以在子组件中修改也不会
  }
}
