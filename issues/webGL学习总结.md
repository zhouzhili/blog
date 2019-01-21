## 平移和缩放

1. 需要掌握基本的矢量知识及相关运算方法

2. 矢量运算中不满足乘法交换律，及 AxB 和 BxA 是不相等的，在设置变换矩阵时，应当设置为

```glsl
// 点位
attribute vec4 aPosition;
// 变换矩阵
uniform mat4 uTranslateMatrix;
void main() {
  // 变换矩阵×点位矩阵
  gl_Position =uTranslateMatrix * aPosition;
}
```

要注意矩阵的位置，**变换矩阵 × 点位矩阵**
