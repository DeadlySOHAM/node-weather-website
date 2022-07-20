const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
   event.preventDefault();

   document.getElementById('loading_img').style.display = 'block'; // showing loading animation ;
   document.getElementById('data').style.display = 'none' // disappearing previous data

   const form_data = new FormData(event.target);
   fetch("http://192.168.42.72:3000/weather?address=" + form_data.get('search')).then((response) => response.json()).then((data) => {

      // populating data
      document.getElementById('place_detail').textContent = data.place == null ? data.error : data.place;
      document.getElementById('temperature_detail').textContent = data.place != null ? `The temperature is ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`: "" ;

      
      document.getElementById('loading_img').style.display = 'none'; // removing animation 
      document.getElementById('data').style.display = 'block'; // showing data ;
   });
})