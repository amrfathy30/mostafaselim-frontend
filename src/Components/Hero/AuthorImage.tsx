import * as React from "react";

export function AuthorImage({data}) {
  return (
    <aside className="relative max-w-[483px] w-[38%] max-md:ml-0 max-md:w-full bg-cover bg-no-repeat rounded-t-full h-full"
    style={{
      backgroundImage:'url(/images/author-bg.png)'
    }}>
      <img
       src="/images/author.png"
        alt={data?.user_full_name}
        className="w-[95%] absolute bottom-0 left-0"
      />
    </aside>
  );
}
