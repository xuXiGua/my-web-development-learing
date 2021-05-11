// 解决banner高度为0
function setBannerHeight(){
    const banner = document.querySelector('#banner');
    const banner1 = document.querySelector('#banner1');
    banner.style.height = banner1.getBoundingClientRect().height + 'px';
}
window.addEventListener('resize', setBannerHeight);
window.addEventListener('load', setBannerHeight);

// 轮播
function setBanner() {
    const btn1 = document.querySelector('#banBtn1');
    const btn2 = document.querySelector('#banBtn2');
    const btn3 = document.querySelector('#banBtn3');
    const btn4 = document.querySelector('#banBtn4');
    const btnle = document.querySelector('#banl');
    const btnr = document.querySelector('#banr');

    const image1 = document.querySelector('#banner1');
    const image2 = document.querySelector('#banner2');
    const image3 = document.querySelector('#banner3');
    const image4 = document.querySelector('#banner4');

    let index = 1;

    function allDisappear(){
        image1.style.opacity = '0';
        image2.style.opacity = '0';
        image3.style.opacity = '0';
        image4.style.opacity = '0';
        if(btn1.classList.contains('active')){
            btn1.classList.remove('active');
        }
        if(btn2.classList.contains('active')){
            btn2.classList.remove('active');
        }
        if(btn3.classList.contains('active')){
            btn3.classList.remove('active');
        }
        if(btn4.classList.contains('active')){
            btn4.classList.remove('active');
        }
    }

    function showPic(i) {
        allDisappear();
        switch (i) {
            case 1:
                image1.style.opacity = '1';
                btn1.classList.add('active');
                index = 1;
                break;
            case 2:
                image2.style.opacity = '1';
                btn2.classList.add('active');
                index = 2;
                break;
            case 3:
                image3.style.opacity = '1';
                btn3.classList.add('active');
                index = 3;
                break;
            case 4:
                image4.style.opacity = '1';
                btn4.classList.add('active');
                index = 4;
        }
    }

    function dealIndex(i){
        if(i < 1 ){
            i = 4;
        } else if (i > 4){
            i = 1;
        }
        return i;
    }

    btn1.addEventListener('click', function(){showPic(1)});
    btn2.addEventListener('click', function(){showPic(2)});
    btn3.addEventListener('click', function(){showPic(3)});
    btn4.addEventListener('click', function(){showPic(4)});
    
    btnle.addEventListener('click', function(){
        index--;
        index = dealIndex(index);
        showPic(index);
    });
    btnr.addEventListener('click', function(){
        index++;
        index = dealIndex(index);
        showPic(index);
    });

    setInterval(function(){
        index++;
        index = dealIndex(index);
        showPic(index);
    }, 5000);
}
window.addEventListener('load', setBanner);

function setWorldButton(){
    const btns = document.querySelectorAll('#worldNewsWeibo button');
    const btn1 = btns[0];
    const btn2 = btns[1];
    const newsPancel = document.querySelector('#newsList');
    const weiboPancel = document.querySelector('#weiboList');

    btn1.addEventListener('click', function(){
        if(btn2.classList.contains('active')){
            btn2.classList.remove('active');
        }
        btn1.classList.add('active');
        weiboPancel.style.zIndex = '1';
        newsPancel.style.zIndex = '2';
    });
    btn2.addEventListener('click', function(){
        if(btn1.classList.contains('active')){
            btn1.classList.remove('active');
        }
        btn2.classList.add('active');
        weiboPancel.style.zIndex = '2';
        newsPancel.style.zIndex = '1';
    });
}
window.addEventListener('load', setWorldButton);
