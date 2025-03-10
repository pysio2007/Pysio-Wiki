---
icon: icons
---

# Q版表情

**可爱的 Pysio Chibi 表情包系列，适用于 Waline、Artalk 评论系统和其他场景**

![Waline Compatible](https://img.shields.io/badge/Waline-Compatible-brightgreen) ![Artalk Compatible](https://img.shields.io/badge/Artalk-Compatible-orange)

### 表情包预览

Chibi 系列是 Pysio 的可爱小人设表情包，包含多种日常表达情绪的表情：

| 表情           | 预览                                                                      | 表情         | 预览                                                                  |
| ------------ | ----------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------- |
| **hi**       | ![hi](https://emoji.pysio.online/Chibi/pysio_chibi_hi.webp)             | **love**   | ![love](https://emoji.pysio.online/Chibi/pysio_chibi_love.webp)     |
| **laugh**    | ![laugh](https://emoji.pysio.online/Chibi/pysio_chibi_laugh.webp)       | **crying** | ![crying](https://emoji.pysio.online/Chibi/pysio_chibi_crying.webp) |
| **cool**     | ![cool](https://emoji.pysio.online/Chibi/pysio_chibi_cool.webp)         | **angry**  | ![angry](https://emoji.pysio.online/Chibi/pysio_chibi_angry.webp)   |
| **question** | ![question](https://emoji.pysio.online/Chibi/pysio_chibi_question.webp) | **wow**    | ![wow](https://emoji.pysio.online/Chibi/pysio_chibi_wow.webp)       |

更多表情包请访问 [在线预览站点](https://emoji.pysio.online)。

### CDN 访问

您可以通过以下 CDN 地址访问表情包:

#### 国际 CDN (jsDelivr)

```
https://cdn.jsdelivr.net/gh/pysio2007/emoji@v1.4/Chibi/
```

#### 国内 CDN

```
https://emoji.pysio.online/Chibi/
```

### 配置方案

#### 在 Waline 中使用

在 Waline 的配置中添加以下代码：

```typescript
emoji: [
  '//cdn.jsdelivr.net/gh/pysio2007/emoji@v1.4/Chibi',
  // 或者使用国内CDN
  // '//emoji.pysio.online/Chibi',
],
```

#### 在 Artalk 中使用

**国际版 (jsDelivr CDN)**

```typescript
Artalk.init({
  // ... 其他配置 ...
  emoticons: 'https://cdn.jsdelivr.net/gh/pysio2007/emoji@v1.4/Chibi/artalk.json',
});
```

**中国版**

```typescript
Artalk.init({
  // ... 其他配置 ...
  emoticons: 'https://emoji.pysio.online/Chibi/artalk_cn.json',
});
```

### 配置文件说明

本项目提供了多种格式的配置文件：

* **artalk.json** - 使用 jsDelivr CDN 的标准配置
* **artalk\_cn.json** - 使用中国 CDN (emoji.pysio.online) 的配置

### 许可说明

本表情包采用 [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/) 进行授权。

[![知识共享许可协议](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

***

© 2025 Pysio 表情包集合 | [GitHub 仓库](https://github.com/pysio2007/emoji)
