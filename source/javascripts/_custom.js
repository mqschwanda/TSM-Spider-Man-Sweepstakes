function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie(){
  var clearedGate = getCookie('clearedGate');
  if(clearedGate === "false"){
    $('#age-gate').remove();
    $('.col-xs-12.col-sm-8.col-sm-offset-2.pad-top').html('<h2 class="not-eligible">You are <span>not</span> eligible.</h2>')
    $('.col-xs-12.col-sm-8.col-sm-offset-2.pad-top').addClass('text-center');
  }
}

$(function(){
  checkCookie();
});

// word gate
$(function(){

  var x ='y',
  z = 'l',
  u = 'p',
  r = 'a';

  $('#word-gate button').on('click', function(e){
    e.preventDefault();
    var codeWord = $('#code-word').val();
    if(codeWord === ""){
      $.growl.error({ message: "Please enter the code word." });
    } else {
      codeWord = codeWord.toString().toLowerCase().trim();
      if(codeWord != (u+z+r+x)){
        $.growl.error({ message: "Sorry, that code word is incorrect!" });
      } else {
        $.growl.notice({ message: "Success! Please enter your birthday." });
        $('#word-gate').hide();
        $('#age-gate').parent().removeClass('hidden');
      }
    }
  });
});


// Datepicker
$(document).ready(function(){
  $("#dtBox").DateTimePicker({
    dateFormat: "mm-dd-yyyy"
  });
});

// iterate through errors and growl them
function growlz(){
  setTimeout(function(){
    $('label.error').each(function(){
      if($(this).html() != ""){
        var errorText = $(this).text();
        $.growl.error({ message: errorText });
      }
    });
  }, 100);
}


// successMsg Constructor
var successMsg = "<div id=\"thankyou\" class=\"col-xs-12 text-center\"><h2 class=\"thanks\">Thank you for entering!</h2><p>Would you like to enter again?</p><button class=\"again-button\">Enter Again</div></div>"

// dateparse for safari compatibility
function parseDate(input, format) {
  format = format || 'yyyy-mm-dd'; // default format
  var parts = input.match(/(\d+)/g),
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}

// Add age validation method
$.validator.addMethod("minAge", function(value, element, min) {
    var today = new Date();
    var birthDate = new Date(parseDate(value, 'mm-dd-yyyy'));
    var age = today.getFullYear() - birthDate.getFullYear();
    if (age > min+1) {
        return true;
    }
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= min;
}, "You are not old enough!");


$("#contest").validate({
  focusInvalid: false,
  rules: {
    // first name
    'entry.1862104037': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      lettersonly: true,
      minlength: 2
    },
    // last name
    'entry.2059930985': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      lettersonly: true,
      minlength: 2
    },
    // email
    'entry.322932457': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      email: true
    },
    'entry.328909515': {
        required: true,
        minAge: 13
    },
    'entry.1685083969': {
        number: true,
        minlength: 10,
        maxlength: 11
    },
    // 'entry.566148897': {
    //   required: true
    // }
  },
  messages: {
    // first name
    'entry.1862104037': {
      required: "Please give your first name.",
      lettersonly: "Letters only in the name fields please.",
      minlength: jQuery.validator.format("At least {0} characters required!"),
    },
    // last name
    'entry.2059930985': {
      required: "Please give your last name.",
      lettersonly: "Letters only in the name fields please.",
      minlength: jQuery.validator.format("At least {0} characters required!"),
    },
    // email
    'entry.322932457': {
      required: "Please give your e-mail address.",
      email: "Please give a valid e-mail address."
    },
    // birthday
    'entry.328909515': {
      required: "You must enter your date of birth",
      minAge: "Sorry, you are not eligible."
    },
    'entry.1685083969': {
      number: "Phone number must be numbers only.",
      minlength: "Phone numbers must be at least 10 digits.",
      maxlength: "Phone numbers can be no longer than 11 digits."
    },
    // 'entry.566148897': {
    //   required: "You must agree to the terms and rules."
    // }
  },
  invalidHandler: function(form, validator) {
    growlz();
  },
  errorPlacement: function(error, element) {
    if (element.attr("name") == "entry.566148897") {
      error.insertAfter(".rd-check");
    } else {
      error.insertAfter(element);
    }
  },
  success: "valid",
  submitHandler: function(form) {
    form.submit();
    $.growl.notice({ message: "Thanks! We've received your entry." });
    setTimeout(function(){
      $('#contest').parent().html(successMsg);
      $('.entries, #details, #terms').remove();
    }, 500);
    setTimeout(function(){
      $.scrollTo('#thankyou', 1000, { offset: 0, 'axis': 'y' });
    }, 600);
  }
});

$("#age-gate").validate({
  focusInvalid: false,
  rules: {
    birthday: {
      required: true,
      minAge: 13
    }
  },
  messages: {
    birthday: {
      required: "You must enter your date of birth",
      minAge: "You are not eligible."
    }
  },
  invalidHandler: function(form, validator) {
    growlz();
    setTimeout(function(){
      if($('.growl-message:contains("You are not eligible")').length > 0){
        setCookie('clearedGate', false, 7);
        checkCookie();
      }
    }, 100);
  },
  success: "valid",
  submitHandler: function() {
    $('#entry_328909515').val($('input[name=birthday]').val());
    $('#entry_328909515').hide();
    $('#entry_328909515').prev('label').hide();
    // $('#entry_328909515').prop('disabled', true);
    $('#gate').fadeOut( 500 );
    setTimeout(function(){
      $('.content').fadeIn();
      $('#footer').fadeIn();
    }, 500);
  }
});

// reload the page

$(document).on('click','.again-button', function(e){
  e.preventDefault();
  location.reload();
});

// form fixer
$('.datepicker').on('focus', function(){
  if($('#dtBox').is(':visible')){
    $('.datepicker').blur();
    // enable touch events on datepicker
    // $(".increment, .decrement").hammer({domEvents: true}).on("tap", function(event){
    //     this.click();
    //     event.stopPropagation();
    //     event.preventDefault();
    //     event.gesture.preventDefault();
    //     event.gesture.stopDetect();
    // });
    $("#contest :input").prop("disabled", true);
  } else {
    $("#contest :input").prop("disabled", false);
  }
});

$('.datepicker').on('blur', function(){
  $("#contest :input").prop("disabled", false);
});

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deleteGateCookie(){
  delete_cookie("clearedGate")
}
