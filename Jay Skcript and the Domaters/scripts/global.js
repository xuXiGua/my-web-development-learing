function insertAfter(newElememt, targetElement){
//将newElement插入到targetElement后面
    const parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
      parent.appendChild(newElememt);
    } else{
      parent.insertBefore(newElememt, targetElement.nextSibling);
    }
  }

// 可使用element.classList.add(value)代替
function addClass(element, value) {
// 给element元素添加值为value的class属性
    if (!element.className) {
        element.className = value;
    } else {
        element.className += ' ' + value
    }
}

function highlightPage(){
// 根据页面的url自动高亮导航链接，并给body设置一个id
    if (!document.getElementById || !document.getElementsByTagName) return false;
    const headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    const navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    
    const links = navs[0].getElementsByTagName('a');
    for(let i = 0; i < links.length; i++){
        const linkurl = links[i].getAttribute('href');
        if(window.location.href.indexOf(linkurl) != -1){
            addClass(links[i], 'here');
            const linktext = links[i].textContent.toLowerCase();
            document.body.setAttribute('id', linktext);
            break;
        }
    }
}

function moveElement(elementID, final_x, final_y, interval) {
// 移动元素动画
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    const elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = '0px';
    }
    if(!elem.style.top){
        elem.style.top = '0px';
    }
    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        const dist = Math.ceil((final_x-xpos)/10);
        xpos += dist;
    }
    if(xpos > final_x){
        const dist = Math.ceil((xpos-final_x)/10);
        xpos -= dist;
    }
    if(ypos < final_y){
        const dist = Math.ceil((final_y-ypos)/10);
        ypos += dist;
    }
    if(ypos > final_y){
        const dist = Math.ceil((ypos-final_y)/10);
        ypos -= dist;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    //const repeat = 'moveElement("'+elementID+'",'+final_x+','+final_y+','+interval+')';
    //elem.movement = setTimeout(repeat, interval);
    elem.movement = setTimeout(moveElement, interval, elementID, final_x, final_y, interval);
}

function perpareSlideshow(){
// 预览图片滑动
    if(!document.getElementsByTagName || !document.getElementById) return false;
    if(!document.getElementById('intro')) return false;
    const intro = document.getElementById('intro');
    // 预览图片块
    const slideshow = document.createElement('div');
    slideshow.setAttribute('id', 'slideshow');
    // 预览图片
    const preview = document.createElement('img');
    preview.setAttribute('src', '../images/slideshow.gif');
    preview.setAttribute('alt', 'a glimps of what awaits you');
    preview.setAttribute('id', 'preview');
    slideshow.appendChild(preview);
    // 圆角边框,可利用css实现
    // const frame = document.createElement('img');
    // frame.setAttribute('src', '../images/frame.gif');
    // frame.setAttribute('alt', '');
    // frame.setAttribute('id', 'frame');
    // slideshow.appendChild(frame);
    insertAfter(slideshow, intro);

    // 为连接定义鼠标悬浮事件使得预览图片移动
    const links = document.getElementsByTagName('a');
    let destination;
    for(let i = 0; i < links.length; i++){
        links[i].addEventListener('mouseover', function(){
            destination = this.getAttribute('href');
            if(destination.indexOf('index.html') != -1){
                moveElement('preview', 0, 0, 5);
            }
            if(destination.indexOf('about.html') != -1){
                moveElement('preview', -150, 0, 5);
            }
            if(destination.indexOf('photos.html') != -1){
                moveElement('preview', -300, 0, 5);
            }
            if(destination.indexOf('live.html') != -1){
                moveElement('preview', -450, 0, 5);
            }
            if(destination.indexOf('contact.html') != -1){
                moveElement('preview', -600, 0, 5);
            }
        })
    }
}

function showSection(id){
    const sections = document.getElementsByTagName('section');
    for(let i=0; i<sections.length; i++){
        // if(sections[i].getAttribute('id') != id){
        //     sections[i].style.display = 'none';
        // } else {
        //     sections[i].style.display = 'block';
        // }
        sections[i].style.display = (sections[i].getAttribute('id') == id)?'block':'none';
    }
}

function prepareIntervalnav(){
// about页面文章链接处理
    if(!document.getElementsByTagName || !document.getElementById) return false;
    const articles = document.getElementsByTagName('article');
    if(articles.length == 0) return false;
    const navs = articles[0].getElementsByTagName('nav');
    if(navs.length == 0) return false;
    const links = navs[0].getElementsByTagName('a');
    for(let i=0; i<links.length; i++){
        const sectionId = links[i].getAttribute('href').split('#')[1];
        if(!document.getElementById(sectionId)) continue;
        links[i].destination = sectionId;
        document.getElementById(sectionId).style.display = 'none';
        links[i].addEventListener('click', function(){
            showSection(this.destination);
            return false;
        })
    }
}

function preparePlaceholder(){
// 将图片和描述插入到DOM树中
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
  
    const placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder"); 
    placeholder.setAttribute("src","../images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    const description = document.createElement("p");
    description.setAttribute("id","description");
    const desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    
    /* appendChild将新节点加在父节点的最后
    //document.body.appendChild(placeholder);
    //document.body.appendChild(description);*/
  
    const gallery = document.getElementById("imagegallery");
    /* insertBefore的使用
    gallery.parentNode.insertBefore(placeholder, gallery);
    gallery.parentNode.insertBefore(description, gallery);*/
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
    
  }
  
function prepareGallery(){
// 为每个图片链接添加点击事件，实现HTML与JS的分离
    // 检验浏览器是否支持js函数
    if(!document.getElementById || !document.getElementsByTagName) return false;
    // 检验网页结构中是否存在该id
    if(!document.getElementById("imagegallery")) return false;
    const gallery = document.getElementById("imagegallery");
    const links = gallery.getElementsByTagName("a");
    for(let i=0;i<links.length;i++){
      // onclick事件也支持键盘操作
      links[i].onclick = function(){  // 匿名函数
        return !showPic(this);
      }
    }
}
  
function showPic(whichpic){
// 在placeholder图片位置显示图片
// 将img的src换成链接的href值
// whichpic代表一个元素节点：指向某个图片的a元素
    if(!document.getElementById("placeholder"))
        return false;
    let source = whichpic.getAttribute("href");
    let placeholder = document.getElementById("placeholder");
    if(placeholder.nodeName!="IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        let text = whichpic.getAttribute("title")? whichpic.getAttribute("title"):"";
        let description = document.getElementById("description");
        description.firstChild.nodeValue = text;
    }
    return true;
}

function highlightRows(){
// 鼠标悬浮在表格的行上时，对应的行显示高亮
    if(!document.getElementsByTagName) return false;
    const rows = document.getElementsByTagName('tr');
    for(let i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].addEventListener('mouseover', function(){
            addClass(this, 'highlight');
        })
        rows[i].addEventListener('mouseout', function(){
            this.className = this.oldClassName;
        })
    }
}
  
function displayAbbreviations(){
// 将网页的abbr显示成列表，并显示在页面中
    if(!document.getElementsByTagName || !document.createElement || getComputedStyle.createTextNode) return false;
    // 取得所有缩略词
    const abbreviations = document.getElementsByTagName("abbr");
    if(abbreviations.length < 1) return false;
    // 遍历缩略词，把信息存储在关联数组中
    let defs = new Array(); 
    for(let i = 0; i < abbreviations.length; i++){
      let current_abbr = abbreviations[i];
      if(current_abbr.childNodes.length < 1) continue;
      let definition = current_abbr.getAttribute("title");
      let key = current_abbr.lastChild.nodeValue;
      defs[key] = definition;
    }
    // 创建定义列表
    const dlist = document.createElement("dl");
    for(key in defs){
      let definition = defs[key];
      // 创建定义标题
      let dtitle = document.createElement("dt");
      let dtitle_text = document.createTextNode(key);
      dtitle.appendChild(dtitle_text);
      // 创建定义描述
      let ddesc = document.createElement("dd");
      let ddesc_text = document.createTextNode(definition);
      ddesc.appendChild(ddesc_text);
      // 把标题和描述添加到定义列表
      dlist.appendChild(dtitle);
      dlist.appendChild(ddesc);
    }
    if(dlist.childNodes < 1) return false;
    // 创建标题
    const header = document.createElement("h2");
    const header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    // 把标题和列表添加到页面中
    const articles = document.getElementsByTagName('article');
    if(articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);  
}

// 检验表单
function isFilled(field){
    if(field.value.replace(' ','').length == 0) return false;
    return (field.value != field.getAttribute('placeholder'));
}
function isEmail(field){
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1)
}
function validateForm(whichform){
    for(let i=0; i<whichform.elements.length; i++){
        const element = whichform.elements[i];
        if(element.required == 'required'){
            if(!isFilled(element)){
                alert('Please fill in the '+element.name+' field.');
                return false;
            }  
        }
        if(element.type == 'email'){
            if(!isEmail(element)){
                alert('The '+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}
function prepareForms(){
    for(let i=0; i<document.forms.length; i++){
        const thisForm = document.forms[i];
        thisForm.onsubmit = function(){
            return validateForm(thisForm);
        }   
    }
}

// 页面加载完成后要执行的函数
window.onload = function(){
    perpareSlideshow();
    highlightPage();
    prepareIntervalnav();
    preparePlaceholder();
    prepareGallery();
    displayAbbreviations();
    prepareForms();
}
