import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../../types";

type LayoutProps={
    notes : Note[]
}
const Layout = ({notes}:LayoutProps) => {

  // url den id'yi al
  const {id} = useParams()
   // note 'u bul
   const found = notes.find((n)=>n.id == id)
//    console.log(found)
if(found){
    // Outlet; Route'lar ile tanımlanan yolların içeriğini render etmek için kullanılır.
    // çocuk route'ların bir veriye erişimini sağlar,alt rotalara özel bir bağlamı iletir
return <Outlet context={found} />
}else{
    // url'i değiştirme özelliği replace
    return <Navigate to="/" replace />
}


};
// çocuk route'ların kulanabileceği
// context olarak tanımladığımız verilere erişimi saplayan fonksiyon
export function useNote(){
    return useOutletContext<Note>()
}


export default Layout;
