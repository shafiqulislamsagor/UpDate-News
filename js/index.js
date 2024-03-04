const categoryDiv = document.getElementById('category');
const readContainer = document.getElementById('readContainer');
const sumValue = document.getElementById('valueAdd');
const letestContainer = document.getElementById('letestContainer');
const loader = document.getElementsByClassName('loader');
let loading = undefined;
let text = undefined;

const AllPost = async (search = 'posts') => {
    const fecths = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${search}`);
    const res = await fecths.json();
    const data = res.posts;
    CardAdd(data)
}
const CardAdd = (data) => {
    categoryDiv.innerHTML = '';
    if(data.length === 0){
        const notFound = document.createElement('h2')
        notFound.classList = 'text-4xl my-4 lg:my-5 text-center font-bold';
        notFound.innerText = 'No Result';
        categoryDiv.appendChild(notFound)
    }
    data.forEach((singleCard) => {
        // console.log(singleCard.title,singleCard.view_count)
        const createdDiv = document.createElement('div');
        createdDiv.classList = 'p-4 lg:p-10 hover:bg-[#797DFC1A] hover:border-[#797DFC] transition duration-500 ease-in-out border rounded-3xl flex flex-col lg:flex-row items-start gap-6';
        const status = singleCard.isActive;

        const active = status ? 'bg-[#10B981]' : 'bg-[#FF3434]';
        createdDiv.innerHTML = `
                        <div class="h-12 w-12 border rounded-2xl relative">
                        <div class="w-3 h-3 rounded-full right-0 absolute ${active} "></div>
                        <img src="${singleCard.image}" alt="" class="rounded-2xl">
                    </div>
                    <div class="flex-1">
                        <div class="flex gap-5 inter text-sm font-medium mb-3">
                            <p># <span>${singleCard.category}</span></p>
                            <p>Author : <span>${singleCard.author.name}</span></p>
                        </div>
                        <h3 class="mulish text-xl font-bold mb-4">${singleCard.title}</h3>
                        <p class="inter text-base leading-[26px]">${singleCard.description}</p>
                        <hr class="border-dashed my-5">
                        <div class="flex justify-between">
                            <div class="flex gap-4 lg:gap-8 text-[#12132D99]">
                                <div class="flex gap-1 lg:gap-4 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>${singleCard.comment_count}</p>
                                </div>
                                <div class="flex gap-1 lg:gap-4 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    <p>${singleCard.view_count}</p>
                                </div>
                                <div class="flex gap-1 lg:gap-4 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <p>${singleCard.posted_time}<span> min</span></p>
                                </div>
                            </div>
                            <div>
                                <button onclick="clickId('${escape(singleCard.title)}','${singleCard.view_count}')" class="btn defult hover:bg-[#797DFC1A]"><img src="images/Group 40106.png" alt=""></button>
                            </div>
                        </div>
                    </div>
        `;


        categoryDiv.appendChild(createdDiv);

    });
}
let value = 0;
function sum() {
    value = value + 1;
    sumValue.innerText = value
}
const clickId = (text, view) => {
    // console.log(text,view);
    const clickDiv = document.createElement('div');
    clickDiv.classList = 'py-[14px] px-4 rounded-2xl flex justify-between bg-white';
    clickDiv.innerHTML = `
                <h2 class="text-[#12132D] mulish font-semibold">${unescape(text)}</h2>
                <div class="flex gap-2 items-center  text-[#12132D99]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p>${view}</p>
                </div>
    `;

    readContainer.appendChild(clickDiv);

    sum()
}
const letestPost = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const fecths = await fetch(url);
    const res = await fecths.json();
    res.forEach((data) => {
        const div = document.createElement('div');
        div.classList = 'border grid-cols-1 rounded-3xl p-6';
        div.innerHTML = `
                            <div class="w-full h-[200px] mb-6 rounded-[20px]">
                            <img class='rounded-[20px] max-h-full' src="${data.cover_image}" alt="">
                        </div>
                        <div class="flex gap-3 mt-6 mb-3 items-center mulish text-[#12132D99]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            <p >${data.author.posted_date ? data.author.posted_date : 'No publish date'}</p>
                        </div>
                        <h5 class="mb-3 text-[#12132D] mulish text-lg font-extrabold">${data.title}</h5>
                        <p class="mb-4 mulish text-[#12132D99]">${data.description}</p>
                        <div class="flex items-center gap-4">
                            <div class="w-11 h-11 rounded-full border">
                                <img class="rounded-full" src="${data.profile_image}" alt="">
                            </div>
                            <div>
                                <h5 class="text-[#12132D] mulish font-bold">${data.author?.name}</h5>
                                <h6 class="text-[#12132D99] mulish text-sm ">${data.author.designation ? data.author.designation : 'Unknown'}</h6>
                            </div>
                        </div>
        `;
        letestContainer.appendChild(div)
    })
}

const times = (time, value) => {
    setTimeout(() => {
        time();
        loading = false;
        active(loading)
    }, value);
};

const loaderTimer = () => {
    loading = true;
    active(loading)
    times(AllPost, 2000);
    loading = true;
    active(loading)
    times(letestPost, 2000);

}
const active = (statusTime) => {
    if (statusTime) {
        loader[0].classList.remove('hidden');
        loader[1].classList.remove('hidden');

    } else {
        loader[0].classList.add('hidden');
        loader[1].classList.add('hidden');
    }
}
const searchContain = () => {
    const input = document.getElementById('input');
    const btn = document.getElementById('btnSearch');
    btn.addEventListener('click', () => {
        const value = input.value;
        text = `posts?category=${value}`;
        categoryDiv.innerHTML = `
                        <div class="loader text-center">
                        <span class="loading loading-bars loading-lg"></span>
                        </div>
        ` ;
        setTimeout(() => {
            AllPost(text)
        }, 2000);
    })
}
searchContain();
loaderTimer();


