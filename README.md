# virtual-dom
仮想DOM実装

view.ts  

これを
```
<div id="app">
  <h1 class="title">タイトル</h1>
</div>
```

こうしたい
```
{
  nodeName: "div",
  attributes: { id: "app" },
  children: [
    {
      nodeName: "h1",
      attributes: { class: "title" },
      children: ["タイトル"]
    }
  ]
}
```