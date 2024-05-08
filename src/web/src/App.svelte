
<script>

    import WeatherRecommendation from "./components/WeatherRecommendation.svelte";
 
 </script>

  <main>

    <h1><b>Wear Cast</b></h1>
    <hr>
    <h4>don't know what to wear? <br> don't worry, we got you!</h4>
    <style>
        body {
           background-color:powderblue; 
       } 
        </style>
        
    <img alt="Great outfit inspo" src="public/outfit.jpeg" width="600" height="1100">
    <img alt="Amazing outfit inspo" src="/src/web/assets/img/outfit2.jpeg" width="600" height="1100">

    <WeatherRecommendation />
    <br>

    </main>
