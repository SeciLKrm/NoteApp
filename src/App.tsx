import { BrowserRouter, Routes,Route} from "react-router-dom"
import MainPage from "./pages/MainPage"
import NewNote from "./pages/Form/NewNote"
import EditNote from "./pages/Form/EditNote"
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { NoteData, RawNote, Tag } from "./types"
import { useLocalStorage } from "./useLocalStorage"
import {v4} from "uuid"
import { useMemo } from "react"
import NoteDetail from "./pages/NoteDetail/NoteDetail"
import Layout from "./pages/NoteDetail/Layout"
function App() {
  const [notes,setNotes]=useLocalStorage<RawNote[]>("notes", [])
  const [tags,setTags]=useLocalStorage<RawNote[]>("tags", [])



const createNote =({tags,...data }: NoteData)=>{
  // console.log(data)   
   
  // setTags ile setNotes içerisindeki uygulanan durum aynı. 
  //  lokal'e yeni not ekler
  setNotes((prev)=>[
     // daha önceden eklenen elemanları muhafaza eder
    ...prev,
     // eklenecek yeni elemanın bilgileri
    {...data, id: v4(), tagId : tags.map((tag)=>tag.id)}

  ])
}
// lokal'e yeni etiket ekler
const createTag =(tag : Tag)=>{
  setTags((prev: any) => [...prev, tag])      //setTags([...tags, tag]) ile aynı ama diğeri işlevsel güncellemeler, asenkron işlemlerle daha iyi çalışır
}

// etiketlerin id'lerinden yola çıkarak
  //  etiketin tüm bilgilerine note'lara ekler
const noteWithTags = useMemo(()=>{
  console.log(notes)
  // nottaki etiket idleri yerine etiket isimlerini aktarma
return notes.map((note)=>({
...note,
tags : tags.filter((tag)=>note.tagId.includes(tag.id))
}))
},[notes, tags])
console.log(noteWithTags)

// elemanı siler
const deleteNote=(id:string)=>{
const filtered = notes.filter((note)=>note.id !== id)
setNotes(filtered)
}

// elemanı günceller
const handleEditNote=(id:string,{tags, ...data}:NoteData)=>{
  // console.log(id +"li eleman güncellendi")
  // güncelleme
  const update = notes.map((note)=>note.id === id ?
  {
    ...note, // güncellenecek elemanın eski değerleri
    ...data,  // yeni değerleri üzerineekle
    tagId :tags.map((tag)=>tag.id)  // yeni etiket id'lerini üzerine ekleme 
  }: note
  )
  setNotes(update)
}

  return (
      <BrowserRouter>
    <Container className="pt-4">

      <Routes>
        <Route path="/" element={<MainPage notes={noteWithTags} availableTags={tags}/>}  />
        <Route path="/new" element={<NewNote
          onSubmit={createNote} 
          createTag ={createTag} 
          availableTags={tags} />}  />

        <Route path="/:id" element={<Layout notes={noteWithTags} />}  >
        <Route index element={<NoteDetail deleteNote={deleteNote} />} />
        <Route path="edit" element={<EditNote  
        onSubmit={handleEditNote} 
        createTag={createTag}
        availableTags={tags} />} />

        </Route>
      </Routes>
      </Container>

      </BrowserRouter>
  )
}

export default App
