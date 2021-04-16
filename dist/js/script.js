'use strict';
$().fancybox({
  selector : '.galeryOne'
});
$().fancybox({
  selector : '.galeryTwo'
});
$().fancybox({
  selector : '.galeryThree'
});
//Открытие и закрытие меню
window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu'),
          closeElem = document.querySelector('.menu__close'),
          menuLink = document.querySelectorAll('.link'),
          overlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
  menu.classList.remove('active');
});

menuLink.forEach(item => {
  item.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    menu.classList.remove('active');
  }
});

$(document).mouseup(function (e){
  var modalctr = $(".overlay");
  var modal = $("#consultation");
  if (!modal.is(e.target) && modal.has(e.target).length === 0){
  modalctr.hide();
  }
});


$('feedback__form').submit(function(e) {
  e.preventDefault();
   $('feedback__form').addClass('ld-ext-right running');
  $('.preload').show();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");

      // $('.callback, .fancybox-bg, .service-popup').fadeOut('fast');
      // $('#thanks').fadeIn('slow');
      // setTimeout(function() {
      //   $('#thanks').fadeOut('slow');
      // },2000);
      $('form').trigger('reset');
      $('feedback__form').removeClass('ld-ext-right running');
      $('.preload').hide();
  });
  return false;
});

$('[data-modal=project1]').on('click', function() {
  $('.overlay-modal, #project1').fadeIn('fast');
});

$('[data-modal=project2]').on('click', function() {
  $('.overlay-modal, #project2').fadeIn('fast');
});

$('[data-modal=project3]').on('click', function() {
  $('.overlay-modal, #project3').fadeIn('fast');
});

$('.modal__close').on('click', function(){
  $('.overlay-modal, #project1, #project2, #project3'). fadeOut('slow');
});

$('.overlay-modal').on('click', function(){
  $('.overlay-modal, #project1, #project2, #project3'). fadeOut('slow');
});

//Счётчик
$(document).ready(function () {
  var show = true;
  var countbox = ".about__counter";
  $(window).on("scroll load resize", function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 800 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
          $('.about__counter-title').css('opacity', '1');
          $('.about__counter-title').spincrement({
              thousandSeparator: "",
              duration: 1200
          });
          show = false;
      }
  });
});



//Валидация формы
$('.feedback__form').validate({
  rules:{
      name: {
          required: true,
          minlength: 2
        },
      phone: "required"
  },
  messages: {
      name:{
          required: "",
        },
      phone: ""
    }
  });

//Маска
$('input[name=phone]').mask("+7 (999) 999-99-99");

$(function(){
  $("a[href^='#']").click(function(){
          var _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
          return false;
  });
});

//Счётчик в input file
    let inputs = document.querySelectorAll('.feedback__file');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling,
        labelVal = label.querySelector('.feedback__file-text').innerText;
  
      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;
  
        if (countFiles)
          label.querySelector('.feedback__file-text').innerText = 'Выбрано файлов: ' + countFiles;
        else
          label.querySelector('.feedback__file-text').innerText = labelVal;
      });
    });
});