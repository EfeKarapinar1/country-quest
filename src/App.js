import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [ dogru, setDogru ] = useState(0);
  const [ yanlis, setYanlis ] = useState(0);

  const [ soruSayisi, setSoruSayisi ] = useState(0);

  const [ activeFlag, setActiveFlag ] = useState("");
  const [ activeNumber, setActiveNumber ] = useState(0);

  const [ ulkeTahmin, setUlkeTahmin ] = useState("");
  const [ yakinTahminler, setYakinTahminler ] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=flags")
    .then((result) => {
      var randomSayi = Math.floor(Math.random() * 251);
      setActiveFlag(result.data[randomSayi].flags.svg);
      setActiveNumber(randomSayi);
    });
  }, [soruSayisi])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name")
    .then(async (result) => { 
        await result.data.forEach((element) => {
          yakinTahminler.push(element.name.common);
        });
    });
  }, [])
  

  const handlesubmit = async (e, tahmin) => {
    e.preventDefault();

    console.log(yakinTahminler[activeNumber])

    if(yakinTahminler[activeNumber].toLowerCase() === ulkeTahmin.toLowerCase())
    {
      console.log("dogru")
      setDogru((prev) => prev+1);
    }
    else{
      console.log("yanlis")
      setYanlis((prev) => prev+1);
    }

    if(soruSayisi === 10)
    {
      alert("Bitti!");
      alert("Doğru " + dogru + " / Yanlış " + yanlis);
      return;
    }
    else{
      await setSoruSayisi((prev) => prev+1);
      console.log(soruSayisi)
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center bg-gray-300">
      <h1 className="font-bold text-5xl">Ülke tahmin etme</h1>

      <img src={activeFlag} className="drop-shadow-2xl h-64"/>

      <form onSubmit={(e) => handlesubmit(e, )} className="w-screen flex flex-col items-center gap-3">
        <input type="text" onChange={(e) => {setUlkeTahmin(e.target.value); }} className="rounded-full w-1/2 h-8 outline-none text-center" placeholder="Tahminini buraya yaz"/>
        {ulkeTahmin && (
          <div className="bg-white">
            {
              yakinTahminler.filter(item => item.toLowerCase().includes(ulkeTahmin.toLowerCase())).map((i,index) => {
                return(
                  <p key={index}>{i}</p>
                )
              })
            }
          </div>
        )}
        <button type="submit" className="rounded-xl bg-blue-500 px-10 py-2 text-white text-2xl">Kontrol et!</button>
      </form>
    </div>
  );
}

export default App;
