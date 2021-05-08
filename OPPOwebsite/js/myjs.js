// 解决banner高度为0
function setBannerHeight(){
    const banner = document.querySelector('#banner');
    const banner1 = document.querySelector('#banner1');
    banner.style.height = banner1.getBoundingClientRect().height + 'px';
}
window.addEventListener('resize', setBannerHeight);

// 轮播
function setBanner() {
    const btn1 = document.querySelector('#banBtn1');
    const btn2 = document.querySelector('#banBtn2');
    const btn3 = document.querySelector('#banBtn3');
    const btn4 = document.querySelector('#banBtn4');

    const image1 = document.querySelector('#banner1');
    const image2 = document.querySelector('#banner2');
    const image3 = document.querySelector('#banner3');
    const image4 = document.querySelector('#banner4');

    function allDisappear(){
        image1.style.opacity = '0';
        image2.style.opacity = '0';
        image3.style.opacity = '0';
        image4.style.opacity = '0';
    }
    function picAppear(img) {
        allDisappear();
        img.style.opacity = '1';
        // this.classList.add('active');
    }

    btn1.addEventListener('click', function(){picAppear(image1)});
    btn2.addEventListener('click', function(){picAppear(image2)});
    btn3.addEventListener('click', function(){picAppear(image3)});
    btn4.addEventListener('click', function(){picAppear(image4)});

    // setTimeout(function(){picAppear(image2)},3000);
    // setTimeout(function(){picAppear(image3)},3000);

}





window.onload = function(){
    setBannerHeight();
    setBanner();
}
