type NodeType = VNode | string | number
type Attributes = { [key: string]: string | Function }

/**
 * 仮想DOM
 */
export interface VNode {
  nodeName: keyof ElementTagNameMap
  attributes: Attributes
  children: NodeType[]
}

function isVNode(node: NodeType): node is VNode {
  return typeof node !== 'string' && typeof node !== 'number'
}

/**
 * 仮想DOMを生成
 */
export function h(
  nodeName: keyof ElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  return {
    nodeName,
    attributes,
    children
  }
}

export interface View<State, Actions> {
  (state: State, actions: Actions): VNode
}

/**
 * リアルDOMを生成
 */
export function createElement(node: NodeType): HTMLElement | Text {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }

  const el = document.createElement(node.nodeName)
  setAttributes(el, node.attributes)
  node.children.forEach(child => el.appendChild(createElement(child)))
  
  return el;
}

/** 
 * targetに属性をセット
 */
function setAttributes(target: HTMLElement, attrs: Attributes): void {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2)
      target.addEventListener(eventName, attrs[attr] as EventListener)
    } else {
      target.setAttribute(attr, attrs[attr] as string)
    }
  }
}

function isEventAttr(attr: string): Boolean {
  return /^on/.test(attr)
}

enum ChangedType {
  /** 差分なし */
  None,
  /** Nodeの型が違う */
  Type,
  /** テキストノードが違う */
  Text,
  /** タグ名が違う */
  Node,
  /** inputのvalueが違う */
  Value,
  /** 属性が違う */
  Attr
}

/**
 * 2つの仮想DOMの差分を検知する
 */
function hasChanged(a: NodeType, b: NodeType): ChangedType {
  // different type
  if (typeof a !== typeof b) return ChangedType.Type

  // different string
  if (!isVNode(a) && a !== b) return ChangedType.Text

  if (isVNode(a) && isVNode(b)) {
    // different node
    if (a.nodeName !== b.nodeName) return ChangedType.Node

    // different value
    if (a.attributes.value !== b.attributes.value) return ChangedType.Value

    // different attribute
    if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) return ChangedType.Attr
  }

  return ChangedType.None
}

/**
 * 差分を検知し、リアルDOMに反映する
 */
export function updateElement(parent: HTMLElement, oldNode: NodeType, newNode: NodeType, index = 0): void {
  // oldNodeがない場合はnewNodeを描画
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
    return
  }

  const target = parent.childNodes[index]

  // newNodeがない場合はそのノードを削除
  if (!newNode) {
    parent.removeChild(target)
    return
  }

  // oldNode, newNodeどちらもある場合は差分検知し、パッチ処理を行う
  const changeType = hasChanged(oldNode, newNode)
  switch (changeType) {
    case ChangedType.Type:
    case ChangedType.Text:
    case ChangedType.Node:
      parent.replaceChild(createElement(newNode), target)
      return
    case ChangedType.Value:
      updateValue(target as HTMLInputElement, (newNode as VNode).attributes.value as string);
      return
    case ChangedType.Attr:
      updateAttributes(
        target as HTMLElement,
        (oldNode as VNode).attributes,
        (newNode as VNode).attributes)
      return
  }

  // 再帰的にupdateElementを呼び出し、childrenの更新処理を行う
  if (isVNode(oldNode) && isVNode(newNode)) {
    for (let i = 0; i < newNode.children.length || oldNode.children.length; i++) {
      updateElement(target as HTMLElement, oldNode.children[i], newNode.children[i], i)
    }
  }
}

/**
 * 属性を更新する
 * NodeをReplaceする必要はない
 */
function updateAttributes(target: HTMLElement, oldAttrs: Attributes, newAttrs: Attributes): void {
  // remove attrs
  for (let attr in oldAttrs) {
    if (!isEventAttr(attr)) {
      target.removeAttribute(attr)
    }
  }
  // set attrs
  for (let attr in newAttrs) {
    if (!isEventAttr(attr)) {
      target.setAttribute(attr, newAttrs[attr] as string)
    }
  }
}

function updateValue(target: HTMLInputElement, newValue: string) {
  target.value = newValue
}