import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from 'react-select/creatable';
import { NewNoteProps } from "./NewNote";
import { Tag } from "../../types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
    onSubmit, 
    createTag,
    availableTags,
    title = '',
    markdown = '',
    tags = [],
}:NewNoteProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags,setSelectedTags]=useState<Tag[]>(tags)
    const navigate = useNavigate()

    const handleSubmit =(e:FormEvent)=>{
e.preventDefault();

 // kullanmak istedğimiz değerin null
    // olabileceğinden kaynaklı uyarıları
    // görmezden gelmek istiyorsak javascriptte ?
    // ile benzer bir şekilde koşul tanımalayan !  kullanırız
onSubmit({
    title: titleRef.current!.value,
    markdown : markdownRef.current!.value,
    tags : selectedTags
    
})
// sayfanın bir geriye gitmesini sağlar navigate (..) de aynı işlevi görür
navigate(-1)
    }
  return(
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control defaultValue={title} ref={titleRef} className="shadow" required/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <Form.Label>Etiketler</Form.Label>
                    <ReactSelect isMulti className="shadow"

                    // daha önce seçilenleri belirleme
                    value={selectedTags.map((tag)=>({label : tag.label,value: tag.id })) }

          // seçilen etiketleri  state'e aktarır 
          onChange={(tags)=> setSelectedTags(tags.map((tag)=>({label: tag.label, id : tag.value})))}
          
        //   yeni etiket oluşturma
        onCreateOption={(label)=> {
            // console.log(label)
       const newTag: Tag = {id:v4(), label};
       createTag(newTag);
       setSelectedTags([...selectedTags,newTag])

        } }
         // options , yani etiketleri listeler
         options={availableTags.map((tag)=>({
            label : tag.label,
            value : tag.label
         }))}
          />
           </Form.Group>
            </Col>
            </Row>
            {/* text içeriği */}
            <Form.Group>
                    <Form.Label>İçerik</Form.Label>
                    <Form.Control 
                    defaultValue={markdown} 
                    ref={markdownRef}  
                    as="textarea" 
                    rows={10} 
                    required
                    className="shadow"/>
                </Form.Group>
                {/* butonlar */}
                <Stack direction="horizontal" gap={2}>
                    <Button type="submit">Kaydet</Button>
                    <Button onClick={()=>navigate(-1)} type="button" variant="secondary">İptal</Button>

                </Stack>

        </Stack>
    </Form>
  );
};

export default NoteForm;
