// Chave para acessar o API da WeatherMapss
const apikey = "fbca043f399a0cb334a74e2763bea534";

const weatherDataEl = document.getElementById("dados-clima");

const cidade = document.getElementById("cidade");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{
  event.preventDefault();
  const cidadeValue = cidade.value;
  getWeatherData(cidadeValue);
})

async function getWeatherData(cidadeValue){
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidadeValue}&appid=${apikey}&units=metric&lang=pt_br`)
      if (!response.ok){
        throw new Error("Resposta da rede não ok!");
      }
      const data = await response.json();
      const temperatura = Math.round(data.main.temp);
      const descricao = data.weather[0].description;
      const icon = data.weather[0].icon;
      const detalhes = [
        `Sensação Térmica: ${Math.round(data.main.feels_like)} °C`,
        `Umidade Relativa: ${data.main.humidity} %`,
        `Velocidade do Vento: ${data.wind.speed} m/s`
      ]; 
      const detalhes2 = [
        `Pressão: ${data.main.pressure} `,
        `Temp. máx.: ${Math.round(data.main.temp_max)} °C`,
        `Temp. mín.: ${Math.round(data.main.temp_min)} °C`
      ]
      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
      weatherDataEl.querySelector(".temperatura").textContent = `${temperatura} °C`;
      var traducao = "Indefinido";
      console.log(data);
      weatherDataEl.querySelector(".descricao").textContent = `${descricao}`
      weatherDataEl.querySelector(".detalhes").innerHTML = detalhes.map((detalhes)=>`<div>${detalhes}</div>`).join("");
      weatherDataEl.querySelector(".detalhes2").innerHTML = detalhes2.map((detalhes2)=>`<div>${detalhes2}</div>`).join("");

    } catch (error) {

    }
}
