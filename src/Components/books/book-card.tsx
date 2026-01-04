import {Button} from "../Button";
interface Props{
    book:{
        book_id?: number;
        book_name: string;
        book_date: string;
        publishing_house: string;
        image: string;
    }
    variant?: 'simple' | 'detailed'
}

export default function BookCard({book, variant = 'simple' }: Props){
    const fallbackImage = "/default-book-image.png";
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallbackImage;
    };
    return(
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col text-center border border-gray-50 font-expo ">
       <img
                src={book.image || fallbackImage}
                alt={book.book_name}
                onError={handleImageError}
                className="w-full h-80 rounded-lg mb-4"
            />

        <h3 className="text-[20px] font-expo font-bold text-[#43617E] mb-1">
            {book.book_name}
        </h3>
       
        <p className="text-xl text-[#43617E] mb-1">
            {`${book.book_date} - الطبعة الثانية`}
        </p>

         <p className="text-xl text-[#43617E] mb-2">
            {book.publishing_house} 
        </p>

        <div className="mt-auto flex justify-center">
                <Button 
                    type="primary" 
                    className={`!h-[38px] !px-10 !text-[14px] font-expo rounded-lg ${variant === 'simple' ? 'w-auto' : 'flex-1'}`}
                    onClick={() => console.log("قراءة")}
                >
                    قراءة الكتاب
                </Button>
                {variant === 'detailed' && (
                    <Button 
                        type="secondary" 
                        className="flex-1 !h-[40px] !text-[14px] !bg-transparent !text-blue-500 border border-blue-500"
                        onClick={() => console.log("تفاصيل")}
                    >
                        معلومات
                    </Button>
                )}
            </div>
        </div>
    )
}