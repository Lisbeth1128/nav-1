const $siteList = $(".siteList");
const $lastLi = $(".addButton");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "acfun.cn" },
  { logo: "B", url: "bilibili.com" },
];
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, '')
}


const render = function () {
  $siteList.find('li:not(.addButton)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li><div class='logo'>${node.logo[0]}</div>
      <div class='link'>${simplifyUrl(node.url)}</div>
      <div class='close'><svg class="icon"><use xlink:href="#icon-delete"></use></svg></div></li>`
    ).insertBefore($lastLi)
    $li.on('click', () => {
        window.open('https://'.concat(simplifyUrl(node.url)))
    })
    $li.on('click', '.close', (e) => {
        hashMap.splice(index, 1)
        render()
        e.stopPropagation()
    })
  });
};

render()

$(".addButton").on("click", () => {
  let url = window.prompt("请输入您要添加的网址");
  if ((url && url.indexOf("http")) === -1) {
    url = "https://" + url;
    hashMap.push({ logo: simplifyUrl(url)[0], url: url });
    render()
  }
});

$(document).on('keypress', (e) => {
    const {key} = e
    for(let i = 0; i < hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open('https://'.concat(simplifyUrl(hashMap[i].url)))
        }
    }
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
    /** 开发者工具清除localStorage的时候使用**/
    //localStorage.clear()
}


