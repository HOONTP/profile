var vwMob = 961;		//0 ~ 960 mobile view

jQuery(function(){
	nav.init();
	$(window).on("resize", function () {
		nav.resize();
	});

	$(window).on("scroll", function () {
		nav.resize();
	});

	$('.overlay .btn-close').click(function (e) {
		e.preventDefault();
		var target = $(this).closest('.overlay');
		modalClose(target);
	});
});

//nav
var nav = {
	gnbScrollTop: 0,
	delta: 80,
	//init
	init: function () {
		nav.checkViewport();

		$(document).on('click', '#btnMenu', function () {
			if ($('body').hasClass('opened-mo-nav')) {
				nav.closeNav();
			} else {
				nav.openNav();
			}
		});

		$('.select.family').on('change', function(e) {
			var getValue = $(this).val();
			window.open(getValue, '_blank');
		});

		$(document).on('click', '#header .btn.back', function () {
			history.back();
		});
	},

	//checkViewport
	checkViewport: function () {
		var wWidth = window.innerWidth;

		if(wWidth > vwMob) {
			$('body').removeClass('is-mobile');
		} else {
			$('body').addClass('is-mobile');
		}

		//for ios vh
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	},

	//current
	current: function (dep1, dep2) {
		var gnb = $('#nav ul > li'),
			current1 = dep1 - 1,
			gnbDep = $(gnb).eq(current1).find('li'),
			current2 = dep2 - 1;

		//dep1
		if (!dep1 == "") {
			$(gnb).eq(current1).addClass('current');
			$(gnb).eq(current1).siblings().removeClass('current');
		}

		//dep2
		if (!dep2 == "") {
			$(gnbDep).eq(current2).addClass('current');
			$(gnbDep).eq(current2).siblings().removeClass('current');
		}
	},

	//openNav
	openNav: function () {
		$('body').addClass("opened-mo-nav");

		$('body').on('click','#nav > ul > li > a', function(e) {
			var moTarget = $(this).closest('li'),
				realTarget=$(this).attr('href'),
				brTarget=$(this).attr('target');

			if ($('body').hasClass('opened-mo-nav')){
				e.preventDefault();
				$(moTarget).addClass('active');
				$(moTarget).siblings('li').removeClass('active');
			}
		});
	},

	//closeNav
	closeNav: function () {
		$('body').removeClass("opened-mo-nav");
	},

	//resize
	resize: function () {
		nav.checkViewport();

		$(window).on("scroll", function (e) {
			var st = $(this).scrollTop();

			//scroll Check
			if (st == 0) {
				$('body').removeClass('scroll-has');
			} else {
				$('body').addClass('scroll-has');

				if(st == $(document).height() - $(window).height()){
					$('body').addClass('scroll-end');
				} else {
					$('body').removeClass('scroll-end');
				}
			}

			if (Math.abs(nav.gnbScrollTop - st) <= nav.delta) return;

			//scroll up/down
			if ((st > nav.gnbScrollTop) && (nav.gnbScrollTop > 0)) {
				$('body').addClass('scroll-down').removeClass('scroll-up');
			} else {
				$('body').addClass('scroll-up').removeClass('scroll-down');
			}
			nav.gnbScrollTop = st;
		});
	}
}

// modalOpen
function modalOpen(popId){
	$(popId).addClass("active");
	$('body').addClass("modal-opened");
}

// modalClose
function modalClose(popId){
	$(popId).removeClass("active");
	$('body').removeClass("modal-opened");
}

//selectPlaceholder
function selectPlaceholder(elem) {
	if ($(elem).val() !== ""){
		$(elem).removeClass('is-empty');
	} else {
		$(elem).addClass('is-empty');
	}
}

//fileAdd
function fileAdd() {
	$('.file-input > .input-text').on('change',function(event){
		var files = event.target.files,
			input = $(this),
			myCon = input.closest('.field').find('.file-list');

		var maxFileCnt = input.data('max'),				// 첨부파일 최대 개수
			attFileCnt = $(myCon).find('.upload-file').length,	// 기존 첨부파일 개수
			remainFileCnt = maxFileCnt - attFileCnt,	// 추가로 첨부가능한 개수
			curFileCnt = files.length;					// 현재 선택된 첨부파일 개수

		for (var i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {
			const file = files[i];

			var reader = new FileReader();
			reader.onload = function(e) {

				var html = "<div class='upload-file'><span class='file-name'>" + file.name + "</span><button type='button' class='btn file-remove' onclick='fileRemove(this);' data-id='" + file.name + "' ><i class='ico remove'><span>삭제</span></i></button></div>";

				if (curFileCnt > 0) {
					$(input).addClass('-chosen');
				} else{
					$(input).removeClass('-chosen');
				}

				$(html).prependTo(myCon);
			}
			reader.readAsDataURL(file);
		}

	});
}

//File remove
function fileRemove(t) {
	var me = $(t).parent('.upload-file'),
		myform = $(me).closest('.file-add'),
		input = $(myform).find('.input-text');
	$(me).remove();

	// filelist check
	var curFileCnt = myform.find('.upload-file').length;
	if (curFileCnt > 0) {
		$(input).addClass('-chosen');
	} else{
		$(input).removeClass('-chosen');
	}
}


//tabLink
function tabLink() {
	$('.tabs > li a').each(function(){
		var tabTarget = $(this).attr('href'),
			linkTarget = $(this).attr('title');

		$(this).click(function(e){
			if (linkTarget != '페이지이동'){
				e.preventDefault();
			}

			$(this).parent('li').addClass('current');
			$(this).parent('li').siblings('li').removeClass('current');
			$(tabTarget).addClass('active').siblings('.tab-content').removeClass('active');
		});
	});
}
