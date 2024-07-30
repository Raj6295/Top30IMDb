let left_btn=document.getElementsByClassName('bi-chevron-left')[0];
let right_btn=document.getElementsByClassName('bi-chevron-right')[0];
let cards=document.getElementsByClassName('cards')[0];
let search=document.getElementsByClassName('search')[0];
let search_input=document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -=500;
})
right_btn.addEventListener('click', () => {
    cards.scrollLeft +=500;
})

let json_url = "movie.json";

fetch(json_url).then(Response => Response.json())
    .then((data)=> {
        data.forEach((ele, i) => {
            let{ name, imdb, date, poster, url }= ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML=`
            <img src="${poster}" alt="${name}" class="poster">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${date}</p>
                                <h3><span>IMDb</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                            </div>
                        </div>
            `
            cards.appendChild(card);
        });

        //search data log//
        data.forEach(ele=> {
            let{ name, imdb, date, poster, url }= ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML=`
            <a href="${url}" class="card">
                        <img src="${poster}" alt="">
                        <div class="cont">
                            <h3>${name}</h3>
                            <p>${date} <span>IMDb</span><i class="bi bi-star-fill"></i> ${imdb}</p>
                        </div>
                    </a>
            `
            search.appendChild(card)

        });

        // search filter//
        search_input.addEventListener('keyup', () => {
            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');

            for (let index =0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                // console.log(a.textContent)
                let TextValue = b.textContent || b.innerText;
                if (TextValue.toUpperCase().indexOf(filter) > -1) {
                    a[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                } else {
                    a[index].style.display = "none";
                }
                if (search_input.value == 0) {
                    search.style.visibility = "hidden";
                    search.style.opacity = 0;
                }
            }
        })
    });