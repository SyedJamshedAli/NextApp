import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  TradesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';
import { DB } from '@/app/lib/db';
//import DB from '@/app/lib/db';
const ITEMS_PER_PAGE = 5;
export async function fetchTradePages(query: string) {
  try {
    noStore();
    const client = await DB();
    await client.connect();

   /*const count = await sql`SELECT COUNT(*)
      FROM trades
      JOIN clients ON trades.clientId = id
      WHERE
      clients.name ILIKE ${`%${query}%`} OR
      trades.pasaAmt::text ILIKE ${`%${query}%`} OR
      trades.tradeDate::text ILIKE ${`%${query}%`} OR
      trades.type ILIKE ${`%${query}%`}
    `;*/
    const countQuery = `SELECT COUNT(*)
    FROM trades
    JOIN clients ON trades.clientId = clients.id
    WHERE
    trades.active=1 and (
    clients.name ILIKE ${`'%${query}%'`} OR
    trades.pasaAmt::text ILIKE ${`'%${query}%'`} OR
    trades.type ILIKE ${`'%${query}%')`}
  `;
  const values = [''];
  const count=await client.query (countQuery);
 
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    client.end();
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredTrades(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const client = await DB();
    await client.connect();

    try {
       const tradesQuery=`
       SELECT
         trades.id,
         trades.clientid,
         clients.name,
         trades.tradeDate,
         trades.pondAmt,
         trades.TradeCutRate,
         trades.pasaamt,
         trades.pasawasul,
         trades.itemName,
         trades.subitemname,
         trades.cb,
         trades.cd,
         trades.mb,
         trades.md,trades.active,trades.stockid,trades.profitamt,trades.cutratepur,trades.type
       FROM trades
       JOIN clients ON trades.clientid = clients.id
       WHERE
       trades.active=1 and (
       clients.name ILIKE ${`'%${query}%'`} OR
       trades.pasaAmt::text ILIKE ${`'%${query}%'`} OR
       trades.type ILIKE ${`'%${query}%')`}

       ORDER BY trades.tradedate DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `; 
     
     const trades = await client.query<TradesTable> (tradesQuery)
      client.end();
      return trades.rows;
    } catch (error) {
        client.end();
      console.error('Database Error:', error);
      throw new Error('Failed to fetch trades data.');
    }
    
  }
  