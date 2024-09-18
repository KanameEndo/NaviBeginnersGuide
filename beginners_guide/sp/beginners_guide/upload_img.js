var UploadImg = function(targetWrapper) {
    this.targetWrapper = targetWrapper;
    this.$wrapper = $(targetWrapper);
    this.$uploadFile = this.$wrapper.find('input[type=file]');
    this.url = '/photos/add';
};

UploadImg.prototype.init = function() {
    var self = this;
    var delete_img = '/images/noimage.png';
    self.$uploadFile.change(function() {
        var current_url_path = location.pathname;
        $('.loading_wrap').show();
        var $input = $(this);
        $(this).upload(self.url, function(res) {
            res = res.replace(/\<(|\/)pre.*?>/gi, '');
            res = eval("("+res+")");
            if (res.status === 'error') {
                if(res.validation_errors){
                    window.alert(res.validation_errors);
                }
                $('.loading_wrap').hide();
                return false;
            }
            if ($(this).hasClass('new_photo')) {
                var currentNumber = Number($(this).attr('id'));
                var photoNumber = currentNumber + 1;
                var addId = 'photo_' + photoNumber;
                $(this).removeClass('new_photo');
                $(this).parents('tr').clone(true).attr('id', addId).appendTo('#table_edit_area').fadeIn();
                var editTarget = '#' + addId;
                $(editTarget).children('.photo_number').text('子犬の写真 ' + photoNumber + '枚目');
                $(editTarget).children().find('.photo-main-label').attr('for', 'photo-main-flg' + currentNumber);
                $(editTarget).children().find('.photo-main-flg').attr('id', 'photo-main-flg' + currentNumber);
                $(editTarget).children().find('.photo_input').addClass('new_photo');
                $(editTarget).children().find('.photo_input').attr('id', photoNumber);
            }
            $wrapper = $input.parents(self.targetWrapper);
            var registered_photo_id = $wrapper.find('.photo-id').val();
            $wrapper.find('img').attr('src', res.Photo.medium_url);
            $wrapper.find('.photo-id').val(res.Photo.id);
            $wrapper.find('.delete_img').attr('disabled', false);
            $wrapper.find('.checkbox-inline').attr('disabled', false);
            $wrapper.find('.photo-main-label').removeClass('text-muted');
            $wrapper.find('.photo-main-flg').attr('name', 'data[PhotoData][main_flg][' + res.Photo.id + ']');
            $wrapper.find('.photo-comment').attr('name', 'data[PhotoData][description][' + res.Photo.id + ']');
            $wrapper.find('.photo-comment').fadeIn();
            $('.loading_wrap').hide();
            // watch_trackingsテーブルに画像処理終了を保存
            watch_tracking('dog_add_image_end', res.Photo.id);
            var next = $wrapper.next();
            if (current_url_path.match("/*\/breeder\/mypage\/dog\/*/")) {
                if (registered_photo_id !== res.Photo.id) {
                    $("#puppy-image_select-" + registered_photo_id).attr("name", "data[Photo][main_flag]["+ res.Photo.id + "]")
                    $("#puppy-image_select-" + registered_photo_id).attr("id", "puppy-image_select-" + res.Photo.id);
                }
            }
            next.show();
        });
    });
    
    $(document).on("click", ".delete_img", function () {
        if ( window.confirm('本当に画像を削除しますか？') ) {
            $('.loading_wrap').show();
            $wrapper = $(this).parents(self.targetWrapper);
            var photoId = $wrapper.find('.photo-id').val();
            var photoData = {'photo_id': photoId};
            if ( !isFinite(photoId) ) {
                window.alert('情報が正しくありません。画像を削除できませんでした。');
                $('.loading_wrap').hide();
            }
            $.ajax({
                type: 'POST',
                url:  '/photos/delete',
                data: photoData
            }).done(function (data, dataType) {
                if ( data === 'failData' ) {
                    window.alert('データがありません');
                }
                if ( data === 'true' ) {
                    $wrapper.find('img').attr('src', delete_img);
                    $wrapper.find('.photo-id').val('');
                    $wrapper.find('input[type=file]').val('');
                    $wrapper.find('input[type=text]').val('');
                    $wrapper.find('.delete_img').val('');
                    $wrapper.find('.photo-comment').val('');
                    $wrapper.find('.delete_img').attr('disabled', true);
                    $wrapper.find('.photo-main-flg').attr('disabled', true);
                    $wrapper.find('.photo-comment').fadeOut('slow');
                    $wrapper.find('.photo-main-label').addClass('text-muted');
                    $wrapper.find('.photo-main-flg').attr('name', null);
                    $wrapper.find('.photo-main-flg').attr('checked', false);
                }
                $('.loading_wrap').hide();
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                $('.loading_wrap').hide();
                window.alert('画像の削除に失敗しました。');
            });
        }
    });
    
    $(document).on("click", ".delete_img_anonymous", function () {
        if (window.confirm('本当に画像を削除しますか？')) {
            $wrapper = $(this).parents(self.targetWrapper);
            $wrapper.find('img').attr('src', delete_img);
            $wrapper.find('.photo-id').val('');
            $wrapper.find('input[type=file]').val('');
            $wrapper.find('input[type=text]').val('');
        }
    });
};
