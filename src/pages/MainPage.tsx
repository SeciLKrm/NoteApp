import { Button, Stack, Form, Col, Row, Card, Badge} from "react-bootstrap";
import {Link} from "react-router-dom"
import { Note, Tag } from "../types";
import {useMemo, useState} from "react"
import ReactSelect from "react-select"
import styles from "../mainpage.module.css"

type MainProps ={
  notes : Note [];
  availableTags : Tag[]
}
const MainPage = ({notes, availableTags}:MainProps) => {
  const [selectedTags,setSelectedTags]=useState<Tag[]>([])
  const [title,setTitle]=useState('')


const filteredNotes= useMemo(()=>{
  return notes.filter((note)=>{
    return(
       // note'un başlığı arama metnini içeriyorsa ilgili başlıkları döndür
      (title === '' || 
      note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
       // eğer hiç bir etiket seçilmediyse veya notun etiketlerinden biri
        // seçilen etiketlerinden biriyle eşleşirse döndürür
        // every seçilen her etiket için some():çalıştırır >
        // notun etiketlerinin en az biri seçili etiketlerle eşleşiyor mu kontrol eder
(selectedTags.length == 0 || 
  selectedTags.every((tag)=>note.tags.some((noteTag)=>noteTag.id == tag.id)) )
      )
    )
  })
},[title,selectedTags, notes])

  return (
    <>
    {/* header */}
    <Stack direction="horizontal"className="justify-content-between mb-3 ">
      <h1>Notlar</h1>
      <Link to={'/new'} ><Button>Oluştur</Button> </Link>
    </Stack>

    {/* filtreleme */}
    <Form>
     <Row>
      <Col>
      <Form.Group>
        <Form.Label>Başlığa Göre Ara</Form.Label>
        <Form.Control onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group>
        <Form.Label>Etikete Göre Ara</Form.Label>
        <ReactSelect isMulti className="shadow"

// daha önce seçilenleri belirleme, 
//Bu prop'a bir dizi veya nesne verilir ve bu değerler,başlangıçta seçili olan etiketleri belirler
value={selectedTags.map((tag)=>({label : tag.label,value: tag.id })) }

// etiket seçimini kontrol eder ,seçilen etiketleri  state'e aktarır 
onChange={(tags)=> setSelectedTags(tags.map((tag)=>({label: tag.label, id : tag.value})))}



// options , yani etiketleri listeler
options={availableTags.map((tag)=>({
  label: tag.label,
  value: tag.id,
}))}
/>

        <Form.Control/>
         </Form.Group>
          </Col>
          </Row>
          </Form>

{/* notlar */}
<Row xs={1} sm={2} lg={3} xl={4} className="gap-3  mt-4">
  {filteredNotes.map((note)=>(
    <NoteCard id={note.id} title={note.title} tags={note.tags} />
  ))}
</Row>
        

    </>
  );
};

export default MainPage;

type CardType ={
  id :string;
  title : string;
  tags : Tag[]
}

function NoteCard ({id, title, tags}:CardType){
return (
  <Card as={Link} to={`/${id}`} className={styles.card} >
    <Card.Body >
      <Stack gap={2} className="align-items-center justify-content-between h-100 " >
        <span>{title} </span>
        {tags.length > 0 && (
          <Stack direction="horizontal" className="justify-content-center flex-wrap gap-3 ">
            {tags.map((tag)=><Badge>{tag.label} </Badge> )}
           </Stack> 
        )}
      </Stack>

    </Card.Body>
  </Card>
)
}