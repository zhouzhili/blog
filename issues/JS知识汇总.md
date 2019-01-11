# JS 知识汇总-持续更新

### 1. JS 中的 this 是由函数调用者调用的时候决定的。

this 是在函数被调用的时候决定的，如果没有显示的调用者，this 指向的是全局对象，在浏览器中指向的是 window，在 node 指向的是 global。但是在严格模式下指向的是 undefined。

### 2.如果你使用了 ES6 的 class 语法，所有在 class 中声明的方法都会自动地使用严格模式

### 3.箭头函数中的 this 永远绑定了定义箭头函数所在的那个对象

### 4.React 为什么需要手动绑定 this？

以 1-3 条知识为基础，react 的 render 函数中事件绑定原写法为

```js
<button onClick={this.onDismiss}>删除</button>
```

相当于：

```js
class App {
  onDismiss() {
    console.log(this)
  }

  render() {
    const onDismiss = this.onDismiss
    onDismiss()
  }
}

const app = new App()
app.render() // 输出结果为：undefined
```

实例 app 的 render 方法里面，将 App 对象的方法 onDismiss 方法赋值给 onDismiss，然后调用 onDismiss(),onDismiss 在调用时并没有显示的调用者，因此调用者会为全局对象，根据上面第 2 条，class 中使用的为严格模式，所有 this 指向的为 undefined.

以上，react 中事件调用需要手动绑定 this，在构造函数中手动 bind 或者使用箭头函数都可以
