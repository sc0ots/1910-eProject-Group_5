(function ($) {
    var list = [];

    /* function to be executed when product is selected for comparision*/

    $(document).on('click', '.addToCompare', function () {
        $(".comparePanle").show();
        $(this).toggleClass("Btn");
        $(this).parents(".selectProduct").toggleClass("selected");
        var productID = $(this).parents('.selectProduct').attr('data-title');

        var inArray = $.inArray(productID, list);
        if (inArray < 0) {
            if (list.length > 2) {
                $("#WarningModal").show();
                $("#warningModalClose").click(function () {
                    $("#WarningModal").hide();
                });
                $(this).toggleClass("Btn");
                $(this).parents(".selectProduct").toggleClass("selected");
                return;
            }

            if (list.length < 3) {
                list.push(productID);

                var displayTitle = $(this).parents('.selectProduct').attr('data-id');

                var image = $(this).parents(".selectProduct").attr('data-image');

                $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom   w3-col l3 m4 s4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="' + image + '" style="height:100px;width:250px;"/><p id="' + productID + '" class="titleMargin1">' + displayTitle + '</p></div></div>');
            }
        } else {
            list.splice($.inArray(productID, list), 1);
            var prod = productID.replace(" ", "");
            $('#' + prod).remove();
            hideComparePanel();

        }
        if (list.length > 1) {

            $(".cmprBtn").addClass("active");
            $(".cmprBtn").removeAttr('disabled');
        } else {
            $(".cmprBtn").removeClass("active");
            $(".cmprBtn").attr('disabled', '');
        }

    });
    /*function to be executed when compare button is clicked*/
    $(document).on('click', '.cmprBtn', function () {
        if ($(".cmprBtn").hasClass("active")) {
            /* this is to print the  features list statically*/
            $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product">' + '<li class=" relPos compHeader"><p class="w3-display-middle">Features</p></li>' + '<li>Title</li>' + '<li>Horse Power</li>' + '<li>Min Speed</li>' + '<li>Max Speed</li>' + '<li>Area</li></ul>' + '</div>');

            for (var i = 0; i < list.length; i++) {
                /* this is to add the items to popup which are selected for comparision */
                product = $('.selectProduct[data-title="' + list[i] + '"]');
                var image = $('[data-title=' + list[i] + ']').attr('data-image');
                var title = $('[data-title=' + list[i] + ']').attr('data-id');
                /*appending to div*/
                $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product">' + '<li class="compHeader"><img " style="height:100px;width:300px;"src="' + image + '" class="compareThumb"></li>' + '<li>' + title + '</li>' + '<li>' + $(product).data('hp') + '</li>' + '<li>' + $(product).data('min') + '<li>' + $(product).data('max') + '</li>' + '<li>' + $(product).data('area') + '</ul>' + '</div>');
            }
        }
        $(".modPos").show();
    });

    /* function to close the comparision popup */
    $(document).on('click', '.closeBtn', function () {
        $(".contentPop").empty();
        $(".comparePan").empty();
        $(".comparePanle").hide();
        $(".modPos").hide();
        $(".selectProduct").removeClass("selected");
        $(".cmprBtn").attr('disabled', '');
        list.length = 0;
        $(".rotateBtn").toggleClass("Btn");
    });

    /*function to remove item from preview panel*/
    $(document).on('click', '.selectedItemCloseBtn', function () {

        var test = $(this).siblings("p").attr('id');
        $('[data-title=' + test + ']').find(".addToCompare").click();
        hideComparePanel();
    });

    function hideComparePanel() {
        if (!list.length) {
            $(".comparePan").empty();
            $(".comparePanle").hide();
        }
    }
})(jQuery);