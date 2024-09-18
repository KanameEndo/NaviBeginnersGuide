//ログインしてない人のお気に入り処理
const saveKey = 'favoriteDogs';
$(document).ready(function(){
    $('.favorite_popup').click(function(){
        let favoriteDogId = $(this).attr("id");
        const btn = $(this).children().children().children();
        if (btn.hasClass('disabled')) {
            let deletedFavorite = deleteFavoriteDogs(favoriteDogId);
            if (deletedFavorite) {
                btn.toggleClass('disabled');
            }
        } else {
            getFavoriteDogs(favoriteDogId);
            btn.toggleClass('disabled');
        }
    });

    // 検索結果一覧のお気に入り処理    
    $('.dogcard-fav').click(function(event){
        let favoriteDogId = $(this).attr('data-dog_id');
        if($(this).hasClass('dogcard-fav-active')){
            let deletedFavorite = deleteFavoriteDogs(favoriteDogId);
            if(deletedFavorite){
                $(this).removeClass('dogcard-fav-active');
                $(this).addClass('dogcard-fav');
            }
        }else{
            getFavoriteDogs(favoriteDogId);
            $(this).addClass('dogcard-fav-active');
            $(this).removeClass('dogcard-fav');
        }
    });

    let readObj = JSON.parse(localStorage.getItem('favoriteDogs'));
    if ( !$.isEmptyObject(readObj) ) {
        Object.keys(readObj).forEach(function(key){
            if(location.pathname === '/dog' || location.pathname === '/' ){
                $(`.dogcard-fav[data-dog_id="${readObj[key]['dog_id']}"]`).addClass('dogcard-fav-active');
            }else{
                let btn = $('#button_favorite_' + readObj[key]['dog_id']).children();
                let data = btn.attr('data-dog_id');
                if (readObj[key]['dog_id'] == data)
                    btn.toggleClass('disabled');
            }
        });
    }
});

function getFavoriteDogs(favoriteDogId){
    let nowDate = new Date();
    nowDate.setHours( nowDate.getHours() + 9);
    target_url = "/favorite_dogs/get_dog/" + favoriteDogId;
    $.ajax({
        async : true,
        url : target_url,
        type : 'POST',
    })
    .done(function(res){
        result = JSON.parse(res);
        const data = {
            dog_id: favoriteDogId,
            breeder_id: result['Breeder']['id'],
            dog_breed_name: result['DogBreed']['name'],
            price: result['Dog']['price'],
            prefecture_id: result['Breeder']['prefecture_id'],
            dog_color_id: result['Dog']['dog_color_id'],
            dog_color: result['Dog']['dog_color'],
            sex: result['Dog']['sex'],
            birth: result['Dog']['birth'],
            dog_sale_status_id: result['Dog']['dog_sale_status_id'],
            photo_url: result['Photo']['url'],
            is_ad: result['Dog']['is_ad'],
            adultRibbon: result['Dog']['adultRibbon'],
            movieRibbon: result['Dog']['movieRibbon'],
            onlineRibbon: result['Dog']['onlineRibbon'],
            label_status: result['Dog']['label'],
            modified: result['Dog']['modified'],
            created: nowDate
        };
        saveFavoriteDogs(data)
    })
    .fail(function(xhr, tex, err){
    });
}

function saveFavoriteDogs(data) {
    let newObj = {};
    let readObj = JSON.parse(localStorage.getItem('favoriteDogs'));
    if ( readObj !== null ) {
        let jsonCount = Object.keys(readObj).length;
        let newCount = jsonCount + 1;
        readObj[newCount] = data;
        newObj = readObj;
    } else {
        newObj[1] = data;
    }

    // 保存処理
    localStorage.setItem(saveKey, JSON.stringify(newObj));    
}

function deleteFavoriteDogs(favoriteDogId) {
    let count = 1;
    let newObj = {};
    let readObj = JSON.parse(localStorage.getItem('favoriteDogs'));
    Object.keys(readObj).forEach(function(key){
        if ( readObj[key]['dog_id'] !== favoriteDogId ) {
            newObj[count] = readObj[key];
            count++;
        }
    });
    localStorage.setItem(saveKey, JSON.stringify(newObj));
    return true;
}
