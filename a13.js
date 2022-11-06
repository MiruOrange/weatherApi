$(document).ready(()=>{
    getWeatherData()
})

function getWeatherData(){
    fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=rdec-key-123-45678-011121314`)   //回傳一個promise物件
    .then(response=>{
        return response.json()                              //回傳一個promise物件
    }).then(data=>{
        renderChart(data);
        
    })
}

function renderChart(data){
    let locations = ['基隆', '臺北', '臺中', '臺南', '高雄']
    let temperature = []
    let timeStamp = data.records.location[0].time.obsTime;
    console.log(data.records.location)
    for(let i=0; i<data.records.location.length;i++){
        for(let j=0; j<locations.length; j++){
            if(data.records.location[i].locationName == locations[j]){
                temperature.push(data.records.location[i].lat)
            };
        }
    } 
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locations,
            datasets: [{
                label: '主要城巿溫度'+timeStamp,
                data: temperature,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}