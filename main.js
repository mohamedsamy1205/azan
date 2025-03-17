let cities = [
    {
        arabicname:"القاهره",
        name:"C"
    },
    {
        arabicname:"القليوبيه",
        name:"KB"
    },
    {
        arabicname:"البحيره",
        name:"BH"
    },
    {
        arabicname:"الدقهليه",
        name:"DK"
    }
]

for( let city of cities){
    let content = `
        <option>${city.arabicname}</option>
    `
        
    document.getElementById("cities").innerHTML += content
}
document.getElementById("cities").addEventListener("change", function(){
    document.getElementById('name').innerHTML=this.value
    let cityname = ""
    for(let city of cities){
        if(city.arabicname == this.value){
            cityname = city.name
        }
    }
    getprayertime(cityname)
})

function getprayertime(isocode){
    let params = {
        country : 'EG',
        city : isocode //'EG-C'
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    let restime = response.data.data.timings
    times('fajr', restime.Fajr)
    times('shorok', restime.Sunrise)
    times('duhr', restime.Dhuhr)
    times('asr', restime.Asr)
    times('maghreb', restime.Sunset)
    times('esha', restime.Isha)
    let readabele = response.data.data.date.readable
    let weekday = response.data.data.date.hijri.weekday.ar
    let date = weekday + "           -           " + readabele 
    document.getElementById('readable').innerHTML= date
    
  })
  .catch(function (error) {
    console.log(error);
  })
}
getprayertime("C")



function times(id , time){
  document.getElementById(id).innerHTML = time
}