
let arrivals= [
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/cases-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Cases"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/laptop-sleeve-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Laptop Sleves"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/charging-solution-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Charging Solutions"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/tote-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Tote bags"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/crossbody-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Crossbody bags"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/backpack-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Backpacks"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/deskmat-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Deskmat"
    },
    {
    
        img:"https://images.dailyobjects.com/marche/assets/images/other/watchbands-ups.jpg?tr=cm-pad_crop,v-2,w-942,dpr-2,q-60",
        title:"Watchbands"
    }
]
document.querySelector(".arrival").innerHTML=""


arrivals.forEach((elem)=>{
    let outerDiv = document.createElement("div")
    outerDiv.setAttribute("class", "slide2")
  
    let image = document.createElement("img")
    image.setAttribute("src",elem.img)
    image.setAttribute("class","image-slider2")

    let innerDiv = document.createElement("div")
    innerDiv.setAttribute("class", "slider-innerDiv")

    let title = document.createElement("p")
    title.innerText = elem.title

    

    innerDiv.append(title)



    
    outerDiv.append(image, innerDiv)

    document.querySelector(".arrival").append(outerDiv)


});

