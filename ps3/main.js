let eventList = [];
let imageTimeout = null;
let prevInd = -1;

getUMEventsWithImages((events) => {
    eventList = events;
    const thumbnailDiv = document.querySelector("#thumbnails");
    for(let i = 0; i < eventList.length; i++){
        const newElem = document.createElement('img');
        newElem.id = "thumb-" + i;
        newElem.src = eventList[i].styled_images.event_thumb;
        newElem.addEventListener("click", () => {
            setSelectedIndex(i);
        });
        thumbnailDiv.append(newElem);
    }
    setSelectedIndex(0)
});

function setSelectedIndex(i) {
    const event = document.querySelector("#thumb-" + i);
    if(imageTimeout){
        clearTimeout(imageTimeout);
        imageTimeout = null;
    }
    event.classList.add("selected")
    if(prevInd != -1){
        const prevEvent = document.querySelector("#thumb-" + prevInd);
        prevEvent.classList.remove("selected");
    }
    prevInd = i;
    imageTimeout  && clearTimeout(imageTimeout);
    imageTimeout = setTimeout(() => {
        setSelectedIndex((i+1)%eventList.length)
    }, 10000);

    const eventTitle = document.querySelector("#selected-title");
    eventTitle.innerText = eventList[i].event_title;
    eventTitle.href = eventList[i].permalink;

    const eventImg = document.querySelector("#selected-image");
    eventImg.src = eventList[i].image_url;

    const eventDate = document.querySelector("#selected-date");
    eventDate.innerText = getReadableTime(eventList[i].datetime_start);

    const eventDescription = document.querySelector("#selected-description");
    eventDescription.innerText = eventList[i].description;
}
