import {Button} from "./Button"
interface Props{
    book:{
        title:string
        type: string
        year: string
        publisher: string
        image: string
    }
}

export default function BookCard({book}: Props){
    return(
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col text-center border border-gray-50 font-expo ">
        <img
        src={book.image}
        alt={book.title}
        className="w-full h-80  rounded-lg mb-4"
        />

        <h3 className="text-[16px] font-expo font-bold text-[#43617E]">
            {book.title}
        </h3>
       
        <p className="text-xs text-[#43617E] mb-3">
            {book.year} - {book.type}
        </p>

         <p className="text-xs text-[#43617E] mb-2">
            {book.publisher}
        </p>

        <div className="mt-auto">
        <Button 
        type="primary" 
        className="w-full mt-4 !h-[45px] !text-[16px]"  
        onClick={() => console.log("فتح الكتاب")}
        >
            قراءة الكتاب</Button>
      </div>
        </div>
    )
}