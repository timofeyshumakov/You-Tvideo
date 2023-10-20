document.addEventListener("DOMContentLoaded", () => {
const API_KEY = 'AIzaSyDvjem-BvTXKc_1e0IsSx9kyviCswp_7JA';
const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VideoListItems = document.querySelector('video-list__items');
const fetchTrendingVideos = async () => {
  try{
    const url = new URL(VIDEOS_URL);
    url.searchParams.append('part','contentDetails,id,snippet')
    url.searchParams.append('chart','mostPopular')
    url.searchParams.append('regionCode','RU')
    url.searchParams.append('maxResults','12')
    url.searchParams.append('key',API_KEY)
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json()

  } catch (error){
    console.error('error: ',error);
  }
}

const displayVideo = (videos) => {
  console.log(videos);
  const listVideos = videos.items.map((video) => {
  const li = document.createElement('li');
  li.classList.add('video-list__item');
  let duration = video.contentDetails.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '');
  li.innerHTML =`
  <article class="video-card">
  <a class="video-card__link" href="${video.id}">
    <img class="video-card__thumbnail" src="${video.snippet.thumbnails.standard?.url}"
      alt="Превью видео ${video.snippet.title}">
    <h3 class="video-card__title">${video.snippet.title}</h3>
    <p class="video-card__channel">${video.snippet.channelTitle}</p>
    <p class="video-card__duration">${duration}</p>
  </a>
  <button class="video-card__favourite" type="button"
  aria-label="Добавить в избранное, ${video.snippet.title}">
  <img class="video-card__icon" src="">
  </button>
</article>
`;
document.getElementById('list').appendChild(li);
  return li;

});
var p = document.createElement("p");

//VideoListItems.appendChild(listVideos);
};

fetchTrendingVideos().then(displayVideo);
//${video.snippet.thumnails.standart}"
//${video.id}">

});
//