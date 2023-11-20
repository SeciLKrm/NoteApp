// custom hook
// react hooklarına benzer görev yapan
// ama proje gereksinimlerine göre kendi
// oluşturduğumuz hooklar'a denir

import {useState, useEffect} from "react"

// gönderilen veriyi local storage'a ekler
export function useLocalStorage<T>(key:string, initialValue : T){
    const [value,setValue] = useState(()=>{

        // local'den verileri alma 
      const jsonValue = localStorage.getItem(key)

      if(jsonValue === null){
         // lokale ekleyeceğimiz elemanın başlangıç değerini belirleriz
        return initialValue
      }else {
        // local'de bulunursa bu değeri geri döndürür
        return JSON.parse(jsonValue)
      }

    })

    // useEffect kullanarak value her değiştiğinde local'i güncelle

useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))
},[key, value])
// bileşenleri döndürülecek değerleri belirleme
return [value, setValue] as [T, typeof setValue]
}
