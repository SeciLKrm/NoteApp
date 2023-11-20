import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./Layout";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

type Props = {
  deleteNote : (id:string) => void
}

const NoteDetail = ({deleteNote}:Props) => {
  // kapsayı route'dan gelen verilere erişme
  const note = useNote()

  


  return (
    <>
    <Row className="mt-3">
      <Col>
      <h1 className="text-info-emphasis text-capitalize">{note.title}</h1>
      {note.tags.length > 0 && (
        <Stack direction="horizontal"gap={2} >
          {note.tags.map((tag)=>(<Badge className="bg-warning p-2 text-capitalize">{tag.label} </Badge>))}
        </Stack>
      )}
      </Col>

      <Col xs={"auto"}>
      <Stack direction="horizontal" gap={2}>
        <Link to={`/${note.id}/edit`}>
          <Button variant="outline-primary">Düzenle</Button>
        </Link>
        <Button onClick={()=>deleteNote(note.id)} variant="outline-danger">Sil</Button>
        <Link to={'/'}>
        <Button variant="outline-secondary">Geri</Button>
        </Link>
      </Stack>
      </Col>

    </Row>
    <ReactMarkdown className="mt-3 text-capitalize">{note.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteDetail;
