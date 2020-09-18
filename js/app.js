$('.search > input').on('keyup', function() {
    var rex = new RegExp($(this).val(), 'i');
      $('.people .person').hide();
      $('.people .person').filter(function() {
          return rex.test($(this).text());
      }).show();
  });
  
  $('.user-list-box .person').on('click', function(event) {
      if ($(this).hasClass('.active')) {
          return false;
      } else {
          var findChat = $(this).attr('data-chat');
          var personName = $(this).find('.user-name').text();
          var personImage = $(this).find('img').attr('src');
          var hideTheNonSelectedContent = $(this).parents('.chat-system').find('.chat-box .chat-not-selected').hide();
          var showChatInnerContent = $(this).parents('.chat-system').find('.chat-box .chat-box-inner').show();
  
          if (window.innerWidth <= 767) {
            $('.chat-box .current-chat-user-name .name').html(personName.split(' ')[0]);
          } else if (window.innerWidth > 767) {
            $('.chat-box .current-chat-user-name .name').html(personName);
          }
          $('.chat-box .current-chat-user-name img').attr('src', personImage);
          $('.chat').removeClass('active-chat');
          $('.user-list-box .person').removeClass('active');
          $('.chat-box .chat-box-inner').css('height', '100%');
          $(this).addClass('active');
          $('.chat[data-chat = '+findChat+']').addClass('active-chat');
      }
      if ($(this).parents('.user-list-box').hasClass('user-list-box-show')) {
        $(this).parents('.user-list-box').removeClass('user-list-box-show');
      }
      $('.chat-meta-user').addClass('chat-active');
      $('.chat-box').css('height', 'calc(100vh - 233px)');
      $('.chat-footer').addClass('chat-active');
  

    const getScrollContainer = document.querySelector('.chat-conversation-box');
    getScrollContainer.scrollTop = 0;
  });
  
  
  function callOnConnect() {
    var getCallStatusText = $('.overlay-phone-call .call-status');
    var getCallTimer = $('.overlay-phone-call .timer');
    var setCallStatusText = getCallStatusText.text('Connected');
    var setCallTimerDiv = getCallTimer.css('visibility', 'visible');
  }
  
  $('.phone-call-screen').off('click').on('click', function(event) {
    var getCallingUserName = $(this).parents('.chat-system').find('.person.active .user-name').attr('data-name');
    var getCallingUserImg = $(this).parents('.chat-system').find('.person.active .f-head img').attr('src');
    var setCallingUserName = $(this).parents('.chat-box').find('.overlay-phone-call .user-name').text(getCallingUserName);
    var setCallingUserName = $(this).parents('.chat-box').find('.overlay-phone-call .calling-user-img img').attr('src', getCallingUserImg);
    var applyOverlay = $(this).parents('.chat-box').find('.overlay-phone-call').addClass('phone-call-show');
    setTimeout(callOnConnect, 2000);
  })
  
  $('.switch-to-video-call').off('click').on('click', function(event) {
      var getCallerId = $(this).parents('.overlay-phone-call').find('.user-name').text();
      var getCallerImg = $(this).parents('.overlay-phone-call').find('.calling-user-img img').attr('src');
      $(this).parents('.overlay-phone-call').removeClass('phone-call-show');
      $('.overlay-video-call').addClass('video-call-show');
      $('.overlay-video-call').find('.user-name').text(getCallerId);
      $('.overlay-video-call').find('.calling-user-img img').attr('src', getCallerImg);
      var removeOverlay = $(this).parents('.overlay-phone-call').removeClass('phone-call-show');
      var getCallStatusText = $(this).parents('.overlay-phone-call').find('.call-status').text('Calling...');
      var getCallStatusTimer = $(this).parents('.overlay-phone-call').find('.timer').removeAttr('style');
      setTimeout(videoCallOnConnect, 2000);
  })
  $('.switch-to-microphone').off('click').on('click', function(event) {
    var toggleClass = $(this).toggleClass('micro-off');
  })
  $('.cancel-call').on('click', function(event) {
  
      if ($(this).parents('.overlay-phone-call').hasClass('phone-call-show')) {
        var removeOverlay = $(this).parents('.overlay-phone-call').removeClass('phone-call-show');
        var getCallStatusText = $(this).parents('.overlay-phone-call').find('.call-status').text('Calling...');
        var getCallStatusTimer = $(this).parents('.overlay-phone-call').find('.timer').removeAttr('style');
      } else if ($(this).parents('.overlay-video-call').hasClass('video-call-show')) {
        var removeOverlay = $(this).parents('.overlay-video-call').removeClass('video-call-show');
        var setCallStatusText =  $(this).parents('.overlay-video-call').find('.call-status').text('Calling...');
        var removeVideoConnectClass = $(this).parents('.overlay-video-call').removeClass('onConnect');
        var displayCallerImage = $(this).parents('.overlay-video-call').find('.calling-user-img').css('display', 'block');
        var hideVideoCallTimerDiv = $(this).parents('.overlay-video-call').find('.timer').removeAttr('style');
      }
  })
  $('.go-back-chat').on('click', function(event) {
  
    if ($(this).parents('.overlay-phone-call').hasClass('phone-call-show')) {
      var removeOverlay = $(this).parents('.chat-box').find('.overlay-phone-call').removeClass('phone-call-show');
    } else if ($(this).parents('.overlay-video-call').hasClass('video-call-show')) {
      var removeOverlay = $(this).parents('.chat-box').find('.overlay-video-call').removeClass('video-call-show')
    }
  
  })
  
  function videoCallOnConnect() {
    var getVideoCallingDiv = $('.overlay-video-call');
    var setVideoCallingImage = getVideoCallingDiv.addClass('onConnect');
    var getCallStatusText = $('.overlay-video-call .call-status');
    var getCallStatusImage = $('.overlay-video-call .calling-user-img');
    var getCallTimer = $('.overlay-video-call .timer');
    var setCallStatusText = getCallStatusText.text('Connected');
    var setVideoCallingImage = getCallStatusImage.css('display', 'none');
    var setVideoCallTimerDiv = getCallTimer.css('visibility', 'visible');
  }
  
  $('.video-call-screen').off('click').on('click', function(event) {
    var getCallingUserName = $(this).parents('.chat-system').find('.person.active .user-name').attr('data-name');
    var getCallingUserImg = $(this).parents('.chat-system').find('.person.active .f-head img').attr('src');
    var setCallingUserName = $(this).parents('.chat-box').find('.overlay-video-call .user-name').text(getCallingUserName);
    var setCallingUserName = $(this).parents('.chat-box').find('.overlay-video-call .calling-user-img img').attr('src', getCallingUserImg);
    var applyOverlay = $(this).parents('.chat-box').find('.overlay-video-call').addClass('video-call-show');
    setTimeout(videoCallOnConnect, 2000);
  })
  $('.switch-to-phone-call').off('click').on('click', function(event) {
      var getCallerId = $(this).parents('.overlay-video-call').find('.user-name').text();
      var getCallerImg = $(this).parents('.overlay-video-call').find('.calling-user-img img').attr('src');
  
      $(this).parents('.overlay-video-call').removeClass('video-call-show');
      $('.overlay-phone-call').addClass('phone-call-show');
      $('.overlay-phone-call').find('.user-name').text(getCallerId);
      $('.overlay-phone-call').find('.calling-user-img img').attr('src', getCallerImg);
  
      var removeOverlay = $(this).parents('.overlay-video-call').removeClass('video-call-show');
      var setCallStatusText =  $(this).parents('.overlay-video-call').find('.call-status').text('Calling...');
      var removeVideoConnectClass = $(this).parents('.overlay-video-call').removeClass('onConnect');
      var displayCallerImage = $(this).parents('.overlay-video-call').find('.calling-user-img').css('display', 'block');
      var hideVideoCallTimerDiv = $(this).parents('.overlay-video-call').find('.timer').removeAttr('style');
      setTimeout(callOnConnect, 2000);
  })
  
  $('.mail-write-box').on('keydown', function(event) {
      if(event.key === 'Enter') {
          var chatInput = $(this);
          var chatMessageValue = chatInput.val();
          if (chatMessageValue === '') { return; }
          $messageHtml = '<div class="bubble me">' + chatMessageValue + '</div>';
          var appendMessage = $(this).parents('.chat-system').find('.active-chat').append($messageHtml);
          const getScrollContainer = document.querySelector('.chat-conversation-box');
          getScrollContainer.scrollTop = getScrollContainer.scrollHeight;
          var clearChatInput = chatInput.val('');
      }
  })
  
  $('.hamburger, .chat-system .chat-box .chat-not-selected p').on('click', function(event) {
    $(this).parents('.chat-system').find('.user-list-box').toggleClass('user-list-box-show')
  })


let userName = document.querySelectorAll('.user-name-p');

userName.forEach(a =>{
    if(a.innerHTML.length >= 14){
        let x = a.innerHTML.slice(0,14)
        a.innerHTML = x
    }
})
let menuIcon = document.querySelector('.menu-icon')
let span1 = document.querySelector('.menu-icon .one_s');
let span2 = document.querySelector('.menu-icon .two_s');
let span3 = document.querySelector('.menu-icon .three_s');
let slide_bar = document.querySelector('.slide-bar')

menuIcon.addEventListener('click',() =>{
    span1.classList.toggle('open1');
    span2.classList.toggle('open2');
    span3.style.display = 'none';
    slide_bar.classList.toggle('open-n')
    if(span1.classList.contains('open1') && span2.classList.contains('open2')){
        span3.style.display = 'none'
    }else{
        span3.style.display = 'block'
    }
})
let y = document.querySelector('.y')
y.addEventListener('click',(e)=>{
    span1.classList.remove('open1');
    span2.classList.remove('open2');
    span3.style.display = 'none';
    slide_bar.classList.remove('open-n')
    if(span1.classList.contains('open1') && span2.classList.contains('open2')){
        span3.style.display = 'none'
    }else{
        span3.style.display = 'block'
    } 
})

let notify = document.getElementById('notify');
let dropdown = document.querySelector('.f');
let mess = document.getElementById('mess');
let dropdownX = document.querySelector('.x');

notify.addEventListener('mouseover',() =>{
    dropdown.style.display = 'block'
    dropdownX.style.display = 'none'
})
dropdown.addEventListener('mouseover',() =>{
    dropdown.style.display = 'block'
})
dropdown.addEventListener('mouseout',() =>{
    dropdown.style.display = 'none'
})
let f = document.querySelector('.y');
f.addEventListener('click',(e)=>{
    dropdown.style.display = 'none'
    dropdownX.style.display = 'none'
})

mess.addEventListener('mouseover',() =>{
    dropdownX.style.display = 'block'
    dropdown.style.display = 'none'
})
dropdownX.addEventListener('mouseover',() =>{
    dropdownX.style.display = 'block'
})
dropdownX.addEventListener('mouseout',() =>{
    dropdownX.style.display = 'none'
})

var ctx = document.getElementById('myChart');
Chart.defaults.global.defaultFontColor = "#fff"
Chart.defaults.global.defaultFontFamily = "'DroidArabicKufiRegular'"
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"],
        datasets: [{
            label: '',
            data: [1,2,8,9,8,3,15,7,10,5],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'منحني النمو (الاداء) في خلال سنه',
            fontSize:15,
            fontColor:"#ffb229"
        },
        legend:{
            display:false
        }
    }
});
/*! WOW wow.js - v1.3.0 - 2016-10-04
* https://wowjs.uk
* Copyright (c) 2016 Thomas Grainger; Licensed MIT */!function(a,b){if("function"==typeof define&&define.amd)define(["module","exports"],b);else if("undefined"!=typeof exports)b(module,exports);else{var c={exports:{}};b(c,c.exports),a.WOW=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){return b.indexOf(a)>=0}function e(a,b){for(var c in b)if(null==a[c]){var d=b[c];a[c]=d}return a}function f(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)}function g(a){var b=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],c=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],d=arguments.length<=3||void 0===arguments[3]?null:arguments[3],e=void 0;return null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e}function h(a,b){null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)&&a["on"+b]()}function i(a,b,c){null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c}function j(a,b,c){null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]}function k(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight}Object.defineProperty(b,"__esModule",{value:!0});var l,m,n=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),o=window.WeakMap||window.MozWeakMap||function(){function a(){c(this,a),this.keys=[],this.values=[]}return n(a,[{key:"get",value:function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b];if(c===a)return this.values[b]}}},{key:"set",value:function(a,b){for(var c=0;c<this.keys.length;c++){var d=this.keys[c];if(d===a)return this.values[c]=b,this}return this.keys.push(a),this.values.push(b),this}}]),a}(),p=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(m=l=function(){function a(){c(this,a),"undefined"!=typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return n(a,[{key:"observe",value:function(){}}]),a}(),l.notSupported=!0,m),q=window.getComputedStyle||function(a){var b=/(\-([a-z]){1})/g;return{getPropertyValue:function(c){"float"===c&&(c="styleFloat"),b.test(c)&&c.replace(b,function(a,b){return b.toUpperCase()});var d=a.currentStyle;return(null!=d?d[c]:void 0)||null}}},r=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];c(this,a),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null,resetAnimation:!0},this.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=e(b,this.defaults),null!=b.scrollContainer&&(this.config.scrollContainer=document.querySelector(b.scrollContainer)),this.animationNameCache=new o,this.wowEvent=g(this.config.boxClass)}return n(a,[{key:"init",value:function(){this.element=window.document.documentElement,d(document.readyState,["interactive","complete"])?this.start():i(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var a=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var b=0;b<this.boxes.length;b++){var c=this.boxes[b];this.applyStyle(c,!0)}if(this.disabled()||(i(this.config.scrollContainer||window,"scroll",this.scrollHandler),i(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live){var d=new p(function(b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.addedNodes.length;e++){var f=d.addedNodes[e];a.doSync(f)}});d.observe(document.body,{childList:!0,subtree:!0})}}},{key:"stop",value:function(){this.stopped=!0,j(this.config.scrollContainer||window,"scroll",this.scrollHandler),j(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){p.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(a){if("undefined"!=typeof a&&null!==a||(a=this.element),1===a.nodeType){a=a.parentNode||a;for(var b=a.querySelectorAll("."+this.config.boxClass),c=0;c<b.length;c++){var e=b[c];d(e,this.all)||(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),this.scrolled=!0)}}}},{key:"show",value:function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),h(a,this.wowEvent),this.config.resetAnimation&&(i(a,"animationend",this.resetAnimation),i(a,"oanimationend",this.resetAnimation),i(a,"webkitAnimationEnd",this.resetAnimation),i(a,"MSAnimationEnd",this.resetAnimation)),a}},{key:"applyStyle",value:function(a,b){var c=this,d=a.getAttribute("data-wow-duration"),e=a.getAttribute("data-wow-delay"),f=a.getAttribute("data-wow-iteration");return this.animate(function(){return c.customStyle(a,b,d,e,f)})}},{key:"resetStyle",value:function(){for(var a=0;a<this.boxes.length;a++){var b=this.boxes[a];b.style.visibility="visible"}}},{key:"resetAnimation",value:function(a){if(a.type.toLowerCase().indexOf("animationend")>=0){var b=a.target||a.srcElement;b.className=b.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a}},{key:"vendorSet",value:function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];a[""+c]=d;for(var e=0;e<this.vendors.length;e++){var f=this.vendors[e];a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=d}}}},{key:"vendorCSS",value:function(a,b){for(var c=q(a),d=c.getPropertyCSSValue(b),e=0;e<this.vendors.length;e++){var f=this.vendors[e];d=d||c.getPropertyCSSValue("-"+f+"-"+b)}return d}},{key:"animationName",value:function(a){var b=void 0;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=q(a).getPropertyValue("animation-name")}return"none"===b?"":b}},{key:"cacheAnimationName",value:function(a){return this.animationNameCache.set(a,this.animationName(a))}},{key:"cachedAnimationName",value:function(a){return this.animationNameCache.get(a)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var a=[],b=0;b<this.boxes.length;b++){var c=this.boxes[b];if(c){if(this.isVisible(c)){this.show(c);continue}a.push(c)}}this.boxes=a,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(a){for(;void 0===a.offsetTop;)a=a.parentNode;for(var b=a.offsetTop;a.offsetParent;)a=a.offsetParent,b+=a.offsetTop;return b}},{key:"isVisible",value:function(a){var b=a.getAttribute("data-wow-offset")||this.config.offset,c=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,d=c+Math.min(this.element.clientHeight,k())-b,e=this.offsetTop(a),f=e+a.clientHeight;return d>=e&&f>=c}},{key:"disabled",value:function(){return!this.config.mobile&&f(navigator.userAgent)}}]),a}();b["default"]=r,a.exports=b["default"]});