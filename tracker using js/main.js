const countries = document.querySelector('datalist')
const search = document.querySelector('#srch')
const date = document.querySelector('#date')
const nameCountry = document.querySelector('#name-country')
const confirmed = document.querySelector('.confirmed')
const deaths = document.querySelector('.deaths')
const recovered = document.querySelector('.recovered')
const chart = document.querySelector('.chart')

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary"

async function covid(country){
    countries.innerHTML = `<option value="World">World</option>`
    const res = await fetch(API_URL)
    //console.log(res);
    const data = await res.json();
    console.log(country)

    if(res.status === 4 || res.status === 200){
        date.textContent = data.Date;

        if(country === '' || country === 'World'){
            const {TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered} = data.Global;
            //Total confirmation
            confirmed.children[1].textContent = TotalConfirmed
            confirmed.children[2].textContent = NewConfirmed
            //Total mortality rate
            deaths.children[1].textContent = TotalDeaths;
            deaths.children[2].textContent = NewDeaths;
            //Total recovery rate
            recovered.children[1].textContent = TotalRecovered;
            recovered.children[2].textContent = NewRecovered;
            nameCountry.textContent = 'The World';
            dataChart = [TotalConfirmed, TotalDeaths, TotalRecovered];
        };     


        data.Countries.forEach(item =>{
            const option = document.createElement('option');
            option.value = item.Country;
            option.textContent = item.Country;
            countries.appendChild(option);

            if(country === item.Country){
                total(item.TotalConfirmed,item.TotalDeaths,item.TotalRecovered);
                newUpdate(item.NewConfirmed,item.NewDeaths,item.NewRecovered)
            /*//Total confirmation
            confirmed.children[1].textContent = item.TotalConfirmed
            confirmed.children[2].textContent = item.NewConfirmed
            //Total mortality rate
            deaths.children[1].textContent = item.TotalDeaths;
            deaths.children[2].textContent =item.NewDeaths;
            //Total recovery rate
            recovered.children[1].textContent = item.TotalRecovered;
            recovered.children[2].textContent = item.NewRecovered;*/
            nameCountry.textContent = item.Country;
            dataChart = [item.TotalConfirmed, item.TotalDeaths, item.TotalRecovered];
            }
        });
        drawChart(dataChart);
    }else{
        chart.innerHTML=`<h2>Loading....</h2>`;
    }
}

function total(Confirmed, Deaths, Recovered){
    //Total confirmation
    confirmed.children[1].textContent = Confirmed
    //Total mortality rate
    deaths.children[1].textContent = Deaths;
    //Total recovery rate
    recovered.children[1].textContent = Recovered;
}
function newUpdate(Confirmed, Deaths, Recovered){
            confirmed.children[2].textContent = Confirmed
            deaths.children[2].textContent = Deaths
            recovered.children[2].textContent = Recovered
}

function drawChart(data){
    chart.innerHTML = '';
    const ctx = document.createElement('canvas');
    chart.appendChild(ctx)
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total confirmation', 'Total mortality rate', 'Total recovery rate'],
            datasets: [{
                label: nameCountry.textContent,
                data: data,
                backgroundColor: [
                    'yellow',
                    'red',
                    'green'
                ],                
            }]
        },
        options: {}
    });
}
covid(search.value);

const btnSearch = document.querySelector('button')
btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();
    covid(search.value)
    search.value=''
})








