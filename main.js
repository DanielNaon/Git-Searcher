myApiKey = '6kP4E98jmjHzHDzszMzrDVkuml8aTPxL'
FavesGifs = []

function gifRender(gif){
 $.get(`http://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${myApiKey}&limit=15`, function(gifResult){
    console.log(gifResult)

    let embed_url_container = gifResult.data.map(e=>e.embed_url)
    console.log(embed_url_container)
    for(let index in embed_url_container){
        $("#container").append(`<div class="gif" id=${index}><iframe src=${embed_url_container[index]} height="200" width="300"></iframe><button class="add">Add To Faves!</button></div>`)
        }
    })
}

function fetch(){ 
    let gif = $("#searchGif").val()
    console.log(gif)
    gifRender(gif)
}

$("#container").on("click", ".add", function(){
    let src= $(this).closest("div").find("iframe").attr("src")
    console.log(src)
    console.log(FavesGifs)
    let exists=false
    if(FavesGifs.length == 0){ // if there is non src in the array
        FavesGifs.push(src)
        console.log(FavesGifs)
        $("#faveGifs").empty()
        faves()
    }
    else {
        for(let gifSrc of FavesGifs){
            if(gifSrc == src){
                console.log(gifSrc)
                console.log(src)
                exists=true
                alert("Already Added!")
            }
        }
        if(!exists){
            FavesGifs.push(src)
            $("#faveGifs").empty()
            faves()
        }
    }

})

function faves(){
    for(let index in FavesGifs){
        $("#faveGifs").append(`<div id=${index} class="faveGif"><iframe src=${FavesGifs[index]} height="200" width="300"></iframe><button class="remove">Remove!</button></div>`)
    }  
}
$("#faveGifs").on("click", ".remove", function(){
    let gifSrc = $(this).closest("div").find("iframe").attr("src")
    console.log(gifSrc)
    for(let index in FavesGifs){
        if(FavesGifs[index] == gifSrc){
            FavesGifs.splice(index,1)
            console.log(FavesGifs)
            $(this).closest("div").remove()
        }
    }
})