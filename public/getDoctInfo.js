
let infoWindow;
let addressinp=document.querySelector("#compAdd");
const API_KEY = window.APP_CONFIG.googleMapsApiKey;
const locationButton=document.querySelector(".curLoc");
 function initMap() {
  infoWindow = new google.maps.InfoWindow();
  locationButton.addEventListener("click", async() => {
    console.log("huuh");
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
           // console.log(pos);//coordinates
            SetAddress(pos.lat, pos.lng);
        },
        () => {
       
        },
      );
    } else {
      // Browser doesn't support Geolocation
      
    }
  });



  //reverse GEocoding
    let SetAddress=async(lat,lan)=>{
 try{
     const api=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&location_type=ROOFTOP&result_type=street_address&key=${API_KEY}`;
 const resp= await fetch(api);
  let info= await resp.json();
  let address=info.results[0].formatted_address;
   addressinp.value=`${address}`;
 }       

 catch(e){
  console.log("error encountered ",e);
 }

 }
    


}


window.initMap = initMap;