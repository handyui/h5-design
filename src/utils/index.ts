/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */
export const TOKEN_KEY = 'han_token'

// export const debounce=(func:any, wait:number, immediate = false)=>{
//   let timeout:any
//   return function(...args){
//     const callnow = immediate && !timeout
//     timeout && clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       timeout = null
//       if(!immediate) func.apply(this, args);
//     }, wait);
//     if(callnow) func.apply(this, args)
//   }
// }


export const setStorage = (key:string, value:any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key:string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}

export const removeStorage = (key:string) => {
  return localStorage.removeItem(key)
}


export function translateShowDataFromStore(store:any) {
  const {
    pages, editList, backGroundImage, backMusicUrl, groupList,
  } = store;
  console.log(store)
  const result:any = [];
  pages.forEach((it:any) => {
    const arr:any = [];
    it.forEach((item:any) => {
      const { nodeType } = editList[item];
      if (nodeType === 'ITEM_TYPE_GROUP') {
        const groupItems = groupList[item];
        const { rect } = editList[item];
        groupItems.forEach((key:any) => {
          const obj = editList[key];
          Object.assign(obj.rect, {
            top: rect.top + obj.rect.top,
            left: rect.left + obj.rect.left,
          });
          arr.push(obj);
        });
        return;
      }
      const obj = editList[item];
      if (obj) {
        arr.push(obj);
      }
    });
    result.push(arr as any);
  });

  return {
    backMusicUrl,
    backGroundImage,
    list: result,
  };
}


// export const cloneDeep = (obj:any) => {
//   let objCloned:any=null
//   if(Array.isArray(obj)) {
//     objCloned = [];
//     for(let i = 0; i< obj.length; i++) {
//         objCloned[i] = cloneDeep(obj[i]);
//     }
//   } else if(typeof obj === 'object' && obj !== null) {
//     objCloned = {};
//     Object.getOwnPropertyNames(obj).map(item =>
//       objCloned[item] = cloneDeep(obj[item]));
//   }
//   return obj;
// };

export  const cloneDeep = (obj:any) => {
  // 1.判断是否为null 或undefined
  // eslint-disable-next-line valid-typeof
  if (typeof obj === null ) return obj;
  // 2.判断是否为日期Date
  if (obj instanceof Date) return new Date(obj);
  // 3.判断是否为正则 typeof /\d+/ === 'object'
  if (obj instanceof RegExp) return new RegExp(obj);
  // 4.如果不是数组或对象，返回该值
  if (typeof obj !== 'object') return obj;
  // 接下来，要么是对象，要么是数组 可以用 new obj.constructor得到它类型的空值
  // eslint-disable-next-line new-parens
  let cloneObj = new obj.constructor;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归深拷贝
      cloneObj[key] = cloneDeep(obj[key]);
    }
  }
  return cloneObj;
}


//  * @description 生成reactDom类型的代码
export const renderPropsToString = (template:any, params:any) => {
  let res = template.replace(/`/g,'"');
  Object.keys(params).forEach((key) => {
    res = res.replace(`%${key}%`, params[key])
  })
  return res;
}


/**
 * @description 路径转化成数组
 * @param {*} pathStr 
 */
 export const indexToArray = (pathStr:any) => `${pathStr}`.split('-').map(n => +n);


/**
 * @description 更新item信息
 * @param {*} newIndex 原index
 * @param {*} data data
 * @param {*} dragItem 点击的item
 */
 export const itemUpdateInfo = (newIndex:any, data:any, dragItem:any) => {
  let newindexarr = indexToArray(newIndex);
  newindexarr.shift();
  let parent = data;
  if(newindexarr.length > 0) {
    // parent = parent[first];
    console.log('parent', parent)
    // newindexarr.forEach((item, index) => {
    //   if(index === newindexarr.length -1 ) {
    //     parent.children.splice(item, 1, dragItem);
    //   } else {
    //     parent = parent.children[item];
    //   }
    // })
    parent.splice(newindexarr[0], 1 ,dragItem)
  } 

  return data;
}

export const getDragItem = (oldIndex:any, data:any) => {
  const oldIndexArr = indexToArray(oldIndex);
  // console.log('oldIndexArr', oldIndexArr)
  let result:any = {};
  oldIndexArr.forEach(item => {
    result = data[item];
    // data = result.children;
  })
  return cloneDeep(result);
}




/**
 * 通过从列表中拿的元素
 * @param {*} name 元素id名
 */
 export const findItemObject = (componetList:any[], name:string) => {
  const componentItem = componetList.filter(item => {
    if (item.type === name) {
      return true;
    } else {
      return false;
    }
  });
  return componentItem[0];
}
