$(document).ready(function() {

    var positionOneTime = 0;

	$("#user_city").change(function() {
	  if ($(this).data('options') === undefined) {
		$(this).data('options', $('#hiddenselect option').clone());
	}
	let id = $(this).val();
	let options = $(this).data('options').filter('[value=' + id + ']');
	$('#enquiry_for').html(options);
	});
	$("#pop_user_city").change(function() {
  if ($(this).data('options') === undefined) {
    $(this).data('options', $('#hiddenselect option').clone());
  }
  let id = $(this).val();
  let options = $(this).data('options').filter('[value=' + id + ']');
  $('#pop_enquiry_for').html(options);
});
	

	$('.marquee').marquee({
        duration: 25000,
        speed: 80,
        pauseOnHover: false,
        direction: 'left',
        duplicated: true,
        startVisible: true

    });
	

    $(window).scroll(function() {
        let scrollTop = $(this).scrollTop();

        if ($(window).width() < 991) {
            if (scrollTop > 200) {
                $(".main_header").addClass("main_header_fixed");
            } else {
                $(".main_header").removeClass("main_header_fixed");
            }
        } else {
            if (scrollTop > 300) {
                $(".main_header").addClass("main_header_fixed")
            } else {
                $(".main_header").removeClass("main_header_fixed")
            }
        }



    });
	$('.umbrella_btn').click(function(){
		$('html, body').animate({
            scrollTop: $('#harsha-store-place').offset().top + 10
        }, 800);
	});



    
    //Parse the URL
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    let source, medium, campaign, source2, medium2, campaign2;
    source = getParameterByName('utm_source');
    medium = getParameterByName('utm_medium');
    campaign = getParameterByName('utm_campaign');
    $('#utmsource').val(source);
    $('#utmmedium').val(medium);
    $('#utmcampaign').val(campaign);

	$(document).on("keydown", ".number_validate", function(e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) ||
            (/65|67|86|88/.test(e.keyCode) &&
                (!0 === e.ctrlKey || !0 === e.metaKey) &&
                (!0 === e.ctrlKey || !0 === e.metaKey)) ||
            (35 <= e.keyCode && 40 >= e.keyCode) ||
            ((e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) &&
                (96 > e.keyCode || 105 < e.keyCode) &&
                e.preventDefault());
    });

    function n(e) {
        return !!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
    }

    function phone(number) {
        return /^[2-9]\d{9}$/.test(number);
    }


    //Enquiry Form
    function enquiry_form_validation() {

        let user_name, user_mail, user_phone, user_city, enquiry_for, j, utm_source, utm_medium, utm_campaign;
        user_name = $("#user_name").val();
        user_mail = $("#user_mail").val();
        user_phone = $("#user_phone").val();
		user_city = $("#user_city :selected").text();
        enquiry_for = $("#enquiry_for :selected").text();
        utm_source = $("#utmsource").val();
        utm_medium = $("#utmmedium").val();
        utm_campaign = $("#utmcampaign").val();

        if ("" == user_name) {
            $(".user_nameerror").show();
            return;
        } else {
            $(".user_nameerror").hide();
        }
        if ("" == user_mail) {
            $(".user_mailerror").show();
            return;
        } else {
            $(".user_mailerror").hide();
        }

        if (user_mail != "" && 0 == n(user_mail)) {
            $(".user_mailvaliderror").show();
            return;
        } else {
            $(".user_mailvaliderror").hide();
        }
		if (user_mail.includes("test@") || user_mail.includes("@test") || user_mail.includes("@abc") || user_mail.includes("abc@") || user_mail.includes("@xy") || user_mail.includes("@xyz"))
		{
			$(".user_mailvaliderror").show();
            return;
		}
		else {
            $(".user_mailvaliderror").hide();
        }
		
        if ("" == user_phone) {
            $(".user_phoneerror").show();
            return;
        } else {
            $(".user_phoneerror").hide();
        }

        if (user_phone != "" && 0 == phone(user_phone)) {
            $(".user_phonevaliderror").show();
            return;
        } else {
            $(".user_phonevaliderror").hide();
        }
		if ("" == user_city || user_city == "Select City") {
            $(".user_cityerror").show();
            return;
        } else {
            $(".user_cityerror").hide();
        }

        if ("" == enquiry_for) {
            $(".user_storeerror").show();
            return;
        } else {
            $(".user_storeerror").hide();
        }
		
        let data = "";

        (data =
            "user_name=" +
            encodeURIComponent(user_name) +
            "&user_mail=" +
            encodeURIComponent(user_mail) +
            "&user_phone=" +
            encodeURIComponent(user_phone) +
            "&user_city=" +
            encodeURIComponent(user_city) +
            "&enquiry_for=" +
            encodeURIComponent(enquiry_for) +
            "&utm_source=" +
            encodeURIComponent(utm_source) +
            "&utm_medium=" +
            encodeURIComponent(utm_medium) +
            "&utm_campaign=" +
            encodeURIComponent(utm_campaign)),
        $.ajax({
            type: "POST",
            url: "enquiry.php",
            data: data,
            dataType: 'JSON',
            success: function(r) {
				r.success == "success" &&
                    ($("#ie_register_form")
                        .find("input[type=text], input[type=email], select, textarea").val(""),
                        (window.location.href = "https://harshaindia.com/monsoon-magic/thankyou.html"));

            },
            error: function(e) {
				debugger;
				if(e.errors.error){
					$('.response_message_mc').html("<div class='response_message'>" + data.errors.error + "</div>").fadeOut(5000);
						//$('.response_message_mc').html('<div class="response_message">Something went wrong on mail server.</div>').fadeOut(5000)
				}
				
                $('.response_message_mc').html('<div class="response_message">Something went wrong</div>').fadeOut(5000)
            }
        });
    }

    $("#ie_register_form").on("click", "#ie_submit_btn", function() {

        enquiry_form_validation();
    });

    $("#pop_ie_register_form").on("click", "#pop_ie_submit_btn", function() {
                pop_enquiry_form_validation();
    });

   

    function phone_popup_form_validation() {

        let user_phone, j, utm_source, utm_medium, utm_campaign;
        user_phone = $("#pop_user_phone_form").val();
        utm_source = $("#utmsource").val();
        utm_medium = $("#utmmedium").val();
        utm_campaign = $("#utmcampaign").val();

        if ("" == user_phone) {
            $(".pop_phone_user_phoneerror").show();
            return;
        } else {
            $(".pop_phone_user_phoneerror").hide();
        }

        if (user_phone != "" && 0 == phone(user_phone)) {
            $(".popuser_phone_phonevaliderror").show();
            return;
        } else {
            $(".popuser_phone_phonevaliderror").hide();
        }

       let data = "";

        (data =
            "user_phone=" +
            encodeURIComponent(user_phone) +
            "&utm_source=" +
            encodeURIComponent(utm_source) +
            "&utm_medium=" +
            encodeURIComponent(utm_medium) +
            "&utm_campaign=" +
            encodeURIComponent(utm_campaign)),
        $.ajax({
            type: "POST",
            url: "phone_eqnuiry.php",
            data: data,
            dataType: 'JSON',
            success: function(r) {

                                r.message == "success" &&
                    ($("#phone_ie_register_form")
                        .find("input[type=text]").next().val(""),
                        $(".phone-success-msg").removeClass('phone-hide-msg').addClass('message-success').html('Thank you. We will contact you shortly.'),
                        $('.popup_form_phone').fadeOut(), setTimeout(function() { $('.phone-success-msg').addClass('phone-hide-msg') }, 5000));

            },
            error: function(e) {
                $('.response_message_phone_mc').html('<div class="response_message">Something went wrong</div>').fadeOut(5000)
            }
        });
    }

    $("#phone_ie_register_form").on("click", "#popup_phone_submit_btn", function() {
        phone_popup_form_validation();
    });


    function pop_enquiry_form_validation() {

        let pop_user_name, pop_user_mail, pop_user_phone, pop_user_city, pop_enquiry_for, k, utm_source, utm_medium, utm_campaign;
        pop_user_name = $("#pop_user_name").val();
        pop_user_mail = $("#pop_user_mail").val();
        pop_user_phone = $("#pop_user_phone").val();
		pop_user_city = $("#pop_user_city :selected").text();
        pop_enquiry_for = $("#pop_enquiry_for :selected").text();
        utm_source = $("#utmsource").val();
        utm_medium = $("#utmmedium").val();
        utm_campaign = $("#utmcampaign").val();

        if ("" == pop_user_name) {
            $(".pop_user_nameerror").show();
            return;
        } else {
            $(".pop_user_nameerror").hide();
        }
        if ("" == pop_user_mail) {
            $(".pop_user_mailerror").show();
            return;
        } else {
            $(".pop_user_mailerror").hide();
        }
        if (pop_user_mail != "" && 0 == n(pop_user_mail)) {
            $(".popuser_mailvaliderror").show();
            return;
        } else {
            $(".popuser_mailvaliderror").hide();
        }

		if (pop_user_mail.includes("test@") || pop_user_mail.includes("@test") || pop_user_mail.includes("@abc") || pop_user_mail.includes("@abc") || pop_user_mail.includes("@xy") || pop_user_mail.includes("@xyz"))
		{
			$(".popuser_mailvaliderror").show();
            return;
		}
		else {
            $(".popuser_mailvaliderror").hide();
        }


        if ("" == pop_user_phone) {
            $(".pop_user_phoneerror").show();
            return;
        } else {
            $(".pop_user_phoneerror").hide();
        }

        if (pop_user_phone != "" && 0 == phone(pop_user_phone)) {
            $(".popuser_phonevaliderror").show();
            return;
        } else {
            $(".popuser_phonevaliderror").hide();
        }
		if ("" == pop_user_city || pop_user_city == "Select City") {
            $(".popuser_cityerror").show();
            return;
        } else {
            $(".popuser_cityerror").hide();
        }

        if ("" == pop_enquiry_for) {
            $(".popuser_storeerror").show();
            return;
        } else {
            $(".popuser_storeerror").hide();
        }

       let popdata = "";

        (popdata =
            "user_name=" +
            encodeURIComponent(pop_user_name) +
            "&user_mail=" +
            encodeURIComponent(pop_user_mail) +
            "&user_phone=" +
            encodeURIComponent(pop_user_phone) +
            "&user_city=" +
            encodeURIComponent(pop_user_city) +
            "&enquiry_for=" +
            encodeURIComponent(pop_enquiry_for) +
            "&utm_source=" +
            encodeURIComponent(utm_source) +
            "&utm_medium=" +
            encodeURIComponent(utm_medium) +
            "&utm_campaign=" +
            encodeURIComponent(utm_campaign)),
        $.ajax({
            type: "POST",
            url: "enquiry.php",
            data: popdata,
            dataType: 'JSON',
            success: function(r) {
				r.message == "success" &&
                    ($("#pop_ie_register_form")
                        .find("input[type=text], input[type=email], select, textarea").val(""),
                        (window.location.href = "https://harshaindia.com/monsoon-magic/thankyou.html"));

            },
            error: function(e) {
				if(e.message == "fail"){
						$('.response_message_mc').html('<div class="response_message">Something went wrong on mail server.</div>').fadeOut(5000)
				}
                $('.response_message_mc').html('<div class="response_message">Something went wrong</div>').fadeOut(5000)
            }
        });
    }


    $('.menu_icon').click(function() {

        if ($(".main_navigation").hasClass("visible")) {
            $(".menu_icon i").toggleClass("fa-times").toggleClass("fa-bars");
            $(".main_navigation").removeClass("visible");
            $(".main_navigation").toggle();
        } else {
            $(".menu_icon i").toggleClass("fa-bars")
            $(".menu_icon i").toggleClass("fa-times")
            $(".main_navigation").toggle();
        }

    });

    $(".main_navigation, .homebase_menubtn").on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();
        var scrtop = $(window).scrollTop();

        if ($(window).width() < 991) {
            $(".main_navigation").hide().addClass("visible");
            $(".menu_icon i").removeClass("fa-times").addClass("fa-bars");
            if (scrtop > 200) {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 80
                }, 800);
            } else {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 210
                }, 800);
            }

        } else {
            if (scrtop > 300) {
                //console.log("if scroll");
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 95
                }, 800);
            } else {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 245
                }, 800);
            }
        }

    });

    $(".main_menu  a").click(function() {
        $(".main_menu  a").css("color", "#1967b3");
        $(this).css("color", "#f89922")
    })

    $(".banner_navigation_link").click(function() {
        count_click = 1;
        $('.popup_form_mc').fadeIn()
    });
    $(".popup_close").click(function() {
        $('.popup_form_mc').fadeOut()
    });
    $(".enquire_cta_btn").click(function() {
        count_click = 1;
        $('.popup_form_mc').fadeIn()
    });
    $(".booknow_cta_btn").click(function() {
        //count_click = 1;
        $('.bookatourpopup_form_mc').fadeIn()
    });
    

    $(".phone_popup_close").click(function() {
        $('.popup_form_phone').fadeOut()
    });

    $(".gig_slider_mc").slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
			pauseOnHover: false
    });
    $(".gig_logo").click(function() {
        $('html, body').animate({
            scrollTop: "0px"
        }, 500);
    });

	$('.product_slider').slick({
        dots: false,
        infinite: true,
		autoplay: true,
        autoplaySpeed: 2500,
        speed: 1200,
        slidesToShow: 2,
        slidesToScroll: 1,
			pauseOnHover:false,
        rtl: false,
			dots:false,
			arrows:true,
        responsive: [

            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2200,
                    arrows: true,
                    dots: false,
                }
            },

        ]
    });

  


});