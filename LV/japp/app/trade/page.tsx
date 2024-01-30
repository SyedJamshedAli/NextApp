import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/trades/table';
import TradeForm from '@/app/ui/trades/create-form';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTradePages } from '@/app/lib/data/tradeData';


 
export default async function Page(
    {searchParams,}:
    {searchParams?:{query?:string;page?:string;};
}) {

  
const query=searchParams?.query || '';
const totalPages=await fetchTradePages(query);
const currentPage=Number(searchParams?.page) || 1;
console.log(query);
    return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Trades</h1>
      </div>
      <div className=" w-full items-center justify-between">
       
        <TradeForm customers={[]} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Trade..." />
        
      </div>
      {  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
      <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        
        { <Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}